import AddListingHeroImage from "@/public/listings/add-listing-hero.jpg";
import Link from "next/link";

import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button/button";
import { Card } from "@/components/ui/card";
import { ResponsiveImage } from "@/components/ui/image/responsive-image";

export default function AddListingHero() {
  return (
    <section className="flex justify-center items-center h-full">
      <Card className="p-0 overflow-hidden md:flex-row md:h-[50%]">
        <ResponsiveImage
          src={AddListingHeroImage}
          alt="Add Listing Hero"
          className="w-full h-full object-cover aspect-video md:w-1/2"
        />
        <div className="pb-6 pr-6 pl-6 space-y-4 md:space-y-0 md:pt-6 md:w-1/2 md:flex md:h-full md:flex-col md:pl-0 md:gap-6">
          <DynamicIcon name="house" className="md:size-12" />
          <h1 className="text-2xl md:text-4xl font-bold">Turn Your Space into Income</h1>
          <p className="text-md md:text-xl">Share your home, earn extra income, and join our community of hosts</p>
          <Button size="xl" asChild className="w-full md:mt-auto">
            <Link href="/add-listing/listing-type">Get started</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
