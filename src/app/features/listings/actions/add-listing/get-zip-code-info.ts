"use server";

import { prisma } from "@/lib/prisma";

export type ZipCodeInfo = {
  zip_code_city_name: string;
  zip_code_district_name: string;
} | null;

export async function getZipCodeInfo(zipCode: string): Promise<ZipCodeInfo> {
  try {
    const result = await prisma.zipCode.findUnique({
      where: {
        zip_code: zipCode,
      },
      select: {
        zip_code_city_name: true,
        zip_code_district_name: true,
      },
    });

    return result;
  }
  catch (error) {
    console.error("Error fetching zip code info:", error);
    return null;
  }
}
