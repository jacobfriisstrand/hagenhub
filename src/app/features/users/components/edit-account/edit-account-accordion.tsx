import type { FullUser } from "@/app/(auth)/current-user";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import EditDescription from "./edit-description";
import EditEmailForm from "./edit-email-form";
import FirstLastNameForm from "./edit-first-last-name-form";
import EditPhoneForm from "./edit-phone";
import EditProfilePicture from "./edit-profile-picture";
import EditUserAddress from "./edit-user-address";

export default function EditAccountAccordion({ fullUser }: { fullUser: FullUser }) {
  return (

    <Accordion type="single" collapsible>
      <AccordionItem value="first-last-name">
        <AccordionTrigger>Full name</AccordionTrigger>
        <AccordionContent>
          <FirstLastNameForm firstName={fullUser.user_first_name} lastName={fullUser.user_last_name} user_pk={fullUser.user_pk} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="email">
        <AccordionTrigger>E-mail address</AccordionTrigger>
        <AccordionContent>
          <EditEmailForm user_email={fullUser.user_email} user_pk={fullUser.user_pk} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="phone">
        <AccordionTrigger>Phone number</AccordionTrigger>
        <AccordionContent>
          <EditPhoneForm user_phone={fullUser.user_phone_number} user_pk={fullUser.user_pk} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="address">
        <AccordionTrigger>Address</AccordionTrigger>
        <AccordionContent>
          <EditUserAddress user_zip_code={fullUser.user_zip_code} user_street_name={fullUser.user_street_name} user_street_number={fullUser.user_street_number} user_pk={fullUser.user_pk} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <EditDescription user_description={fullUser.user_description} user_pk={fullUser.user_pk} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="profile-picture">
        <AccordionTrigger>Profile picture</AccordionTrigger>
        <AccordionContent>
          <EditProfilePicture user_pk={fullUser.user_pk} user_avatar_url={fullUser.user_avatar_url} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
