"use server";

import { prisma } from "@/lib/prisma";

export async function getAllListingTypes() {
  const listingTypes = await prisma.listingType.findMany();
  return listingTypes;
}
