import { getAllListingTypes } from "@/app/features/listings/actions/get-all-listing-types";
import AddListingTypeForm from "@/app/features/listings/components/add-listing/add-listing-type-form";

export const dynamic = "force-dynamic";

export default async function TypePage() {
  const listingTypes = await getAllListingTypes();
  return <AddListingTypeForm listingTypes={listingTypes} />;
}
