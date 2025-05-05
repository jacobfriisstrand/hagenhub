import EditEmailForm from "@/app/features/users/components/edit-account/edit-email-form";
import FirstLastNameForm from "@/app/features/users/components/edit-account/edit-first-last-name-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { getCurrentUser } from "../(auth)/current-user";
import EditPhoneForm from "../features/users/components/edit-account/edit-phone";
import EditUserAddress from "../features/users/components/edit-account/edit-user-address";

export default async function EditAccount() {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="first-last-name">
          <AccordionTrigger>Dit fulde navn</AccordionTrigger>
          <AccordionContent>
            <FirstLastNameForm firstName={fullUser.user_first_name} lastName={fullUser.user_last_name} user_pk={fullUser.user_pk} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="email">
          <AccordionTrigger>E-mailadresse</AccordionTrigger>
          <AccordionContent>
            <EditEmailForm user_email={fullUser.user_email} user_pk={fullUser.user_pk} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="phone">
          <AccordionTrigger>Telefonnummer</AccordionTrigger>
          <AccordionContent>
            <EditPhoneForm user_phone={fullUser.user_phone_number} user_pk={fullUser.user_pk} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="address">
          <AccordionTrigger>Adresse</AccordionTrigger>
          <AccordionContent>
            <EditUserAddress user_zip_code={fullUser.user_zip_code} user_street_name={fullUser.user_street_name} user_street_number={fullUser.user_street_number} user_pk={fullUser.user_pk} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
