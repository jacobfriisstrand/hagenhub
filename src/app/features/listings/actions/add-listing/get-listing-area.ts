"use server";

import { getZipCodeInfo } from "@/app/features/listings/actions/add-listing/get-zip-code-info";
import prisma from "@/lib/prisma";

export async function getListingArea(zipCode: string): Promise<string | null> {
  try {
    // First get the zip code info to get the district name
    const zipCodeInfo = await getZipCodeInfo(zipCode);
    if (!zipCodeInfo) {
      return null;
    }

    // Find the existing area that matches the district name
    const area = await prisma.listingArea.findFirst({
      where: {
        listing_area_name: zipCodeInfo.zip_code_district_name,
      },
    });

    if (!area) {
      console.error("No matching area found for district:", zipCodeInfo.zip_code_district_name);
      return null;
    }

    return area.listing_area_pk;
  }
  catch (error) {
    console.error("Error fetching listing area:", error);
    return null;
  }
}
