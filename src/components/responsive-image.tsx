import type { ImageProps } from "next/image";

import Image from "next/image";

export function ResponsiveImage(props: Omit<ImageProps, "sizes">) {
  return (
    <Image
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
