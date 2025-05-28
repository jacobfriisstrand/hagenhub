"use server";

import { getCurrentUser } from "../(auth)/current-user";
import EditAccountAccordion from "../features/users/components/edit-account/edit-account-accordion";

export default async function EditAccount() {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Personal information</h1>
      <EditAccountAccordion fullUser={fullUser} />
    </div>
  );
}
