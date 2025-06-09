export type ReviewType = {
  review_pk: string;
  review_rating: number;
  review_comment: string;
  review_created_at: Date;
  review_listing_fk: string;
  review_user_fk: string;
  review_booking_fk: string;
};
