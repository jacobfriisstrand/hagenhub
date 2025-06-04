import Link from "next/link";

import { DynamicIcon } from "@/components/dynamic-icon";
import { ResponsiveImage } from "@/components/responsive-image";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card";
import AddListingHeroImage from "@/public/listings/add-listing-hero.jpg";

export default function AddListingHero() {
  return (
    <section className="flex justify-center items-center h-full">
      <Card className="p-0 overflow-hidden xl:flex-row xl:h-[80%] xl:gap-10 xl:min-h-[60dvh]">
        <ResponsiveImage
          src={AddListingHeroImage}
          alt="Add Listing Hero"
          priority
          className="w-full h-full object-cover aspect-video xl:w-1/2"
        />
        <div className="pb-6 pr-6 pl-6 space-y-4 xl:space-y-0 xl:pt-10 xl:pb-10 xl:pr-10 xl:w-1/2 xl:flex xl:h-full xl:flex-col xl:pl-0 xl:gap-4">
          <DynamicIcon name="house" className="xl:size-12" />
          <h1 className="text-2xl md:text-4xl font-bold">Turn your space into income</h1>
          <p className="text-md xl:text-xl">Share your home, earn extra income, and join our community of hosts</p>
          <Button size="xl" asChild className="w-full xl:mt-auto">
            <Link href="/add-listing/general-info">Get started</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
