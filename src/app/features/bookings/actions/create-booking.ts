"use server";

import type { z } from "zod";

import type { bookingSchema } from "@/app/features/bookings/schemas/book-listing-schema";
import type { BookingResult } from "@/app/features/bookings/types/booking-errors";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { BookingError } from "@/app/features/bookings/types/booking-errors";
import { prisma } from "@/lib/prisma";

export async function createBooking(data: z.infer<typeof bookingSchema>): Promise<BookingResult> {
  try {
    const user = await getCurrentUser({
      withFullUser: false,
      redirectIfNotFound: false,
    });

    if (!user) {
      return {
        success: false,
        error: BookingError.AUTHENTICATION_REQUIRED,
        message: "Please log in to create a booking",
      };
    }

    // Server-side validation
    if (!data.booking_check_in || !data.booking_check_out) {
      return {
        success: false,
        error: BookingError.INVALID_DATES,
        message: "Please select check-in and check-out dates",
      };
    }

    if (!data.booking_guest_count || data.booking_guest_count < 1) {
      return {
        success: false,
        error: BookingError.INVALID_GUEST_COUNT,
        message: "Please select number of guests",
      };
    }

    // Check if check-out is after check-in
    if (data.booking_check_out <= data.booking_check_in) {
      return {
        success: false,
        error: BookingError.INVALID_DATES,
        message: "Check-out date must be after check-in date",
      };
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        booking_listing_fk: data.booking_listing_fk,
        booking_status: {
          in: ["Pending", "Confirmed"],
        },
        OR: [
          {
            AND: [
              { booking_check_in: { lte: data.booking_check_in } },
              { booking_check_out: { gt: data.booking_check_in } },
            ],
          },
          {
            AND: [
              { booking_check_in: { lt: data.booking_check_out } },
              { booking_check_out: { gte: data.booking_check_out } },
            ],
          },
          {
            AND: [
              { booking_check_in: { gte: data.booking_check_in } },
              { booking_check_out: { lte: data.booking_check_out } },
            ],
          },
        ],
      },
    });

    if (overlappingBooking) {
      return {
        success: false,
        error: BookingError.DATES_NOT_AVAILABLE,
        message: "These dates are not available. Please select different dates.",
      };
    }

    const booking = await prisma.booking.create({
      data: {
        ...data,
        booking_guest_fk: user.user_pk,
      },
    });

    return { success: true, booking_pk: booking.booking_pk };
  }
  catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error: BookingError.BOOKING_FAILED,
      message: "Failed to create booking",
    };
  }
}
