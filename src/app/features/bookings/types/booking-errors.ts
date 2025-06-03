export enum BookingError {
  AUTHENTICATION_REQUIRED = "AUTHENTICATION_REQUIRED",
  BOOKING_FAILED = "BOOKING_FAILED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  INVALID_DATES = "INVALID_DATES",
  INVALID_GUEST_COUNT = "INVALID_GUEST_COUNT",
  DATES_NOT_AVAILABLE = "DATES_NOT_AVAILABLE",
}

export type BookingResult = {
  success: boolean;
  error?: BookingError;
  booking_pk?: string;
  message?: string;
};
