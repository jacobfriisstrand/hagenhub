import Link from "next/link";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { getAllListings } from "@/app/features/listings/actions/get-all-listings";
import ListingList from "@/app/features/listings/components/listing-list";
import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default async function Home() {
  const [fullUser, listings] = await Promise.all([
    getCurrentUser({
      withFullUser: true,
      redirectIfNotFound: false,
    }),
    getAllListings(),
  ]);

  return (
    <>
      {fullUser && (
        <Card className="w-full max-w-[350px]">
          <CardHeader>
            <h2 className="text-2xl font-bold">{fullUser.user_first_name}</h2>
            <p className="text-muted-foreground">User description goes here </p>
          </CardHeader>

          <CardFooter className="flex justify-between">
            <Button asChild>
              <Link href="/private">Private Area</Link>
            </Button>
            <LogoutButton />

            {fullUser.user_role === "admin" && (
              <>
                <Button asChild variant="secondary">
                  <Link href="/admin">Admin Panel</Link>
                </Button>
                <LogoutButton />
              </>
            )}
          </CardFooter>
        </Card>
      )}

      <ListingList listings={listings} />
    </>
  );
}
