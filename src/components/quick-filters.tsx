import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function QuickFilters() {
  const listingTypes = await prisma.listingType.findMany();
  return (
    <nav className="mt-8 flex flex-wrap justify-center gap-3">
      {listingTypes.map(filter => (
        <Link
          href={`/search?search=${filter.listing_type_name}`}
          key={filter.listing_type_pk}
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-200"
        >
          {filter.listing_type_name}
        </Link>
      ))}
    </nav>
  );
}
