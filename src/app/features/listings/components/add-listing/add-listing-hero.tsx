import AddListingHeroImage from "@/public/listings/add-listing-hero.jpg";
import Link from "next/link";

import { DynamicIcon } from "@/components/dynamic-icon";
import { ResponsiveImage } from "@/components/responsive-image";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card";

export default function AddListingHero() {
  return (
    <section className="flex justify-center items-center h-full">
      <Card className="p-0 overflow-hidden lg:flex-row lg:h-[80%] lg:gap-10">
        <ResponsiveImage
          src={AddListingHeroImage}
          alt="Add Listing Hero"
          className="w-full h-full object-cover aspect-video lg:w-1/2"
        />
        <div className="pb-6 pr-6 pl-6 space-y-4 lg:space-y-0 lg:pt-10 lg:pb-10 lg:pr-10 lg:w-1/2 lg:flex lg:h-full lg:flex-col lg:pl-0 lg:gap-4">
          <DynamicIcon name="house" className="lg:size-12" />
          <h1 className="text-2xl lg:text-4xl font-bold">Turn your space into income</h1>
          <p className="text-md lg:text-xl">Share your home, earn extra income, and join our community of hosts</p>
          <Button size="xl" asChild className="w-full lg:mt-auto">
            <Link href="/add-listing/listing-type">Get started</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
