import { getCurrentUser } from "@/app/(auth)/current-user";
import AddListingGeneralInfoForm from "@/app/features/listings/components/add-listing/add-listing-general-info-form";

export default async function TitlePage() {
  await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: true,
  });

  return <AddListingGeneralInfoForm />;
}
