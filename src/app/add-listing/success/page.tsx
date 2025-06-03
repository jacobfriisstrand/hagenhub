"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useListingStore } from "@/app/add-listing/store";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button/button";

export default function SuccessPage() {
  const router = useRouter();
  const { isListingCreated } = useListingStore();

  useEffect(() => {
    if (!isListingCreated) {
      router.push("/add-listing");
    }
  }, [isListingCreated, router]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
      <DynamicIcon name="check" className="text-green-500 size-10" />
      <h1 className="text-2xl font-bold">You have successfully created a listing!</h1>
      <p className="text-sm text-muted-foreground">You can now view your listing on the listings page.</p>

      <Button asChild>
<<<<<<< HEAD
        <Link href="/private/my-listings">Go to your listings</Link>
=======
        <Link href="/listings">Go to your listings</Link>
>>>>>>> bf51935 (32-fe-booklistingform (#142))
      </Button>
    </div>
  );
}
