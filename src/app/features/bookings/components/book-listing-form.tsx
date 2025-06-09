"use client";

import type { DateRange } from "react-day-picker";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createBooking } from "@/app/features/bookings/actions/create-booking";
import { getListingBookings } from "@/app/features/bookings/actions/get-listing-bookings";
import { bookingSchema } from "@/app/features/bookings/schemas/book-listing-schema";
import { BookingError } from "@/app/features/bookings/types/booking-errors";
import { Button } from "@/components/ui/button/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type BookingFormProps = {
  price: number;
  guestCount: number;
  listingId: string;
};

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookListingForm({ price, guestCount, listingId }: BookingFormProps) {
  const router = useRouter();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState("1");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState<{ from: Date; to: Date }[]>([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      const bookings = await getListingBookings(listingId);
      setBookedDates(bookings.map(booking => ({
        from: new Date(booking.booking_check_in),
        to: new Date(booking.booking_check_out),
      })));
    };
    fetchBookedDates();
  }, [listingId]);

  const isDateBooked = (date: Date) => {
    return bookedDates.some((booking) => {
      const startDate = new Date(booking.from);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(booking.to);
      endDate.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  const nights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0;
  const total = price * nights;

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      booking_guest_count: Number(guests),
      booking_night_count: nights,
      booking_check_in: dateRange?.from,
      booking_check_out: dateRange?.to,
      booking_status: "Pending",
      booking_listing_fk: listingId,
    },
    mode: "onChange",
  });

  // Update form values when date range or guests change
  useEffect(() => {
    form.setValue("booking_guest_count", Number(guests));
    form.setValue("booking_night_count", nights);
    if (dateRange?.from) {
      form.setValue("booking_check_in", dateRange.from);
    }
    if (dateRange?.to) {
      form.setValue("booking_check_out", dateRange.to);
    }
  }, [dateRange, guests, nights, form]);

  // Validate form before submission
  const handleSubmit = async (data: BookingFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await createBooking(data);

      if (result.success) {
        toast.success("Booking created successfully!");
        router.push(`/bookings/success/${result.booking_pk}`);
      }
      else {
        if (result.error === BookingError.AUTHENTICATION_REQUIRED) {
          const message = encodeURIComponent("Please sign in to book this listing");
          router.push(`/login?message=${message}`);
          return;
        }
        toast.error(result.message || "Failed to create booking");
      }
    }
    catch (error: unknown) {
      console.error("Error creating booking:", error);
      toast.error("An unexpected error occurred");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full gap-2 shadow-lg p-5">
      <CardHeader className="p-0">
        <CardTitle className="text-md md:text-2xl font-semibold text-right flex justify-end items-baseline-last gap-1">
          {price.toLocaleString("en-US")}
          {" "}
          kr DKK
          {" "}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form className="space-y-4 p-0" onSubmit={form.handleSubmit(handleSubmit)} data-testid="booking-form">
            <FormField
              control={form.control}
              name="booking_check_in"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Dialog open={isDateModalOpen} onOpenChange={setIsDateModalOpen}>
                      <DialogTrigger asChild>
                        <div className="grid grid-cols-2 border rounded-lg">
                          <Button type="button" variant="ghost" className="justify-start h-auto p-3 border-r rounded-none hover:bg-muted/50">
                            <div className="text-left">
                              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Check-in</div>
                              <div className="text-sm">{dateRange?.from ? format(dateRange.from, "d.M.yyyy") : "Pick date"}</div>
                            </div>
                          </Button>
                          <Button type="button" variant="ghost" className="justify-start h-auto p-3 rounded-none hover:bg-muted/50">
                            <div className="text-left">
                              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Check-out</div>
                              <div className="text-sm">{dateRange?.to ? format(dateRange.to, "d.M.yyyy") : "Pick date"}</div>
                            </div>
                          </Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-fit gap-0 rounded-lg">
                        <DialogHeader>
                          <DialogTitle>Pick your dates</DialogTitle>
                          <DialogDescription className="sr-only">
                            Select your check-in and check-out dates for your stay
                          </DialogDescription>
                        </DialogHeader>
                        <Calendar
                          mode="range"
                          selected={dateRange}
                          onSelect={handleDateSelect}
                          numberOfMonths={1}
                          weekStartsOn={1}
                          className="rounded-md"
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today || isDateBooked(date);
                          }}
                          modifiers={{
                            booked: date => isDateBooked(date),
                          }}
                          modifiersClassNames={{
                            booked: "group bg-red-200 text-red-800 hover:bg-red-200 hover:text-red-800",
                          }}
                        />
                        <div className="flex justify-end mt-4">
                          <Button
                            onClick={() => setIsDateModalOpen(false)}
                            disabled={!dateRange?.from || !dateRange?.to}
                          >
                            Done
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="booking_guest_count"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger className="h-auto w-full border rounded-lg py-7">
                        <div className="flex items-center justify-between w-full py-3">
                          <div className="text-left">
                            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Guests</div>
                            <div className="text-sm">
                              {guests}
                              {" "}
                              {Number.parseInt(guests) === 1 ? "guest" : "guests"}
                            </div>
                          </div>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: guestCount }, (_, i) => (
                          <SelectItem key={i} value={(i + 1).toString()}>
                            {i + 1}
                            {" "}
                            {i + 1 === 1 ? "guest" : "guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-white font-semibold"
              isLoading={isSubmitting}
            >
              Book now
            </Button>
          </form>
        </Form>

        {nights > 0 && (
          <div className="space-y-3 pt-4">
            <div className="flex justify-end">
              <span className="underline">
                {price.toLocaleString("en-US")}
                {" "}
                kr DKK x
                {nights}
                {" "}
                {nights === 1 ? "night" : "nights"}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {total.toLocaleString("en-US")}
                {" "}
                kr DKK
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
