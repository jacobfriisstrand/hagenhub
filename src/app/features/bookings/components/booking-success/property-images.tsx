import Image from "next/image";

export function PropertyImages({
  images,
  title,
}: {
  images: any[];
  title: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.slice(0, 4).map((image, index) => (
        <div key={image.listing_image_pk} className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={image.listing_image_url || "/placeholder.svg"}
            alt={`${title} - Image ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
