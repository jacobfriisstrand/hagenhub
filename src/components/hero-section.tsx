import Link from "next/link";

import { prisma } from "@/lib/prisma";

import SearchBar from "./header/search-bar";

export default async function HeroSection() {
  const listingTypes = await prisma.listingType.findMany();

  // Get top 3 listing areas with their listing counts
  const topAreas = await prisma.listingArea.findMany({
    include: {
      _count: {
        select: {
          listings: true,
        },
      },
    },
    orderBy: {
      listings: {
        _count: "desc",
      },
    },
    take: 3,
  });

  return (
    <div className="w-full mb-24 mt-12">
      {/* Hero Content */}
      <section className="flex flex-col items-center justify-center px-4 pb-12 text-center">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            <span className="bg-gradient-to-l from-primary/90 to-primary/50 bg-clip-text text-transparent">
              Find Your Perfect Stay in Copenhagen
            </span>
          </h1>
          <p className="pt-4 max-w-3xl text-sm text-gray-600 md:text-md">
            Discover apartments, houses, and rooms across the city's most vibrant neighborhoods
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar className="w-full max-w-3xl" />

        {/* Quick Filters */}
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
      </section>

      {/* Featured Areas */}
      <section className="mx-auto w-full max-w-3xl px-4">
        <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-3 shadow-sm sm:grid-cols-3">
          {topAreas.map(area => (
            <Link
              href={`/search?search=${area.listing_area_name}`}
              key={area.listing_area_pk}
              className="flex flex-col items-center rounded-md p-2 text-center transition-colors hover:bg-white"
            >
              <span className="text-sm font-medium text-gray-900">{area.listing_area_name}</span>
              <span className="text-xs text-gray-500">
                {area._count.listings}
                {" "}
                listings
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
