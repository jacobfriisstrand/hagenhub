"use server";
import type { z } from "zod";

import { prisma } from "@/lib/prisma";
import { UserSchema } from "@/prisma/generated/zod";

const FirstLastNameSchema = UserSchema.pick({
  user_first_name: true,
  user_last_name: true,
});
const emailSchema = UserSchema.pick({
  user_email: true,
});
const phoneSchema = UserSchema.pick({
  user_phone_number: true,
});
const addressSchema = UserSchema.pick({
  user_zip_code: true,
  user_street_name: true,
  user_street_number: true,
});
const descriptionSchema = UserSchema.pick({
  user_description: true,
});

type FirstLastNameFormValues = z.infer<typeof FirstLastNameSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;
type PhoneFormValues = z.infer<typeof phoneSchema>;
type AddressFormValues = z.infer<typeof addressSchema>;
type DescriptionFormValues = z.infer<typeof descriptionSchema>;

export async function editFirstLastName(unsafedata: FirstLastNameFormValues, user_pk: string) {
  const { success, data } = FirstLastNameSchema.safeParse(unsafedata);

  if (!success) {
    return { error: "Invalid credentials" };
  }

  await prisma.user.update({
    where: { user_pk },
    data: { user_first_name: data.user_first_name, user_last_name: data.user_last_name },
  });
}

export async function editEmail(unsafedata: EmailFormValues, user_pk: string) {
  const { success, data } = emailSchema.safeParse(unsafedata);

  if (!success) {
    return { error: "Invalid credentials" };
  }

  await prisma.user.update({
    where: { user_pk },
    data: { user_email: data.user_email },
  });
}

export async function editPhone(unsafedata: PhoneFormValues, user_pk: string) {
  const { success, data } = phoneSchema.safeParse(unsafedata);

  if (!success) {
    return { error: "Invalid credentials" };
  }

  await prisma.user.update({
    where: { user_pk },
    data: { user_phone_number: data.user_phone_number },
  });
}

export async function editAddress(unsafedata: AddressFormValues, user_pk: string) {
  const { success, data } = addressSchema.safeParse(unsafedata);

  if (!success) {
    return { error: "Invalid credentials" };
  }

  await prisma.user.update({
    where: { user_pk },
    data: { user_zip_code: data.user_zip_code, user_street_name: data.user_street_name, user_street_number: data.user_street_number },
  });
}

export async function editDescription(unsafedata: DescriptionFormValues, user_pk: string) {
  const { success, data } = descriptionSchema.safeParse(unsafedata);
  if (!success) {
    return { error: "Invalid credentials" };
  }

  await prisma.user.update({
    where: { user_pk },
    data: { user_description: data.user_description },
  });
}
