import type { ListingImage } from "@prisma/client";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function ListingImageCarousel({ className, images }: { className?: string; images: ListingImage[] }) {
  return (
    <Carousel opts={{ loop: true, align: "start" }} className={cn("relative", className)}>
      <CarouselPrevious className="absolute bottom-0 left-4 z-10" />
      <CarouselContent>
        {images.map(image => (
          <CarouselItem className="aspect-video relative" key={image.listing_image_pk}>
            <Image src={image.listing_image_url} alt={image.listing_image_url} fill className="object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute bottom-0 right-4 z-10" />
    </Carousel>

  );
}
