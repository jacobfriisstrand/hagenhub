import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/header/search-bar";
import PageTitle from "@/components/page-title";
import QuickFilters from "@/components/quick-filters";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Hero from "@/public/404/hero.jpg";

export default async function NotFound() {
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
    <section className="flex flex-col gap-10 items-center">
      <Image
        src={Hero}
        alt="Copenhagen illustration"
        width={400}
        height={300}
        className="mx-auto rounded-2xl shadow-lg"
      />
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Oops! Page not found</h1>
      <p className="text-xl text-gray-600 max-w-2xl text-center">
        Looks like this page took a detour through the canals of Copenhagen. Let's get you back to discovering
        amazing stays in the Danish capital!
      </p>

      <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <PageTitle as="h2" className="mb-12 text-center">
            Find Your Perfect Stay in Copenhagen
          </PageTitle>
          <SearchBar className="w-full" />
          <QuickFilters />
        </CardContent>
      </Card>

      <div>
        <PageTitle as="h2" className="mb-4 text-center">
          Trending Areas
        </PageTitle>
        <div className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-3 shadow-sm sm:grid-cols-3 max-w-3xl mx-auto">
          {topAreas.map(area => (
            <Link
              href={`/search?search=${area.listing_area_name}`}
              key={area.listing_area_pk}
              className="flex flex-col items-center rounded-md p-4 text-center transition-colors hover:bg-white group"
            >
              <span className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                {area.listing_area_name}
              </span>
              <span className="text-xs text-gray-500">
                {area._count.listings}
                {" "}
                listings
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
