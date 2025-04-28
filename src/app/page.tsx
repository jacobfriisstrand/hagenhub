import Link from "next/link";

import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import { getCurrentUser } from "./(auth)/current-user";

export default async function Home() {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: false,
  });

  if (fullUser == null) {
    return <div>Loading....</div>;
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">{fullUser?.user_first_name}</h2>
        <p className="text-muted-foreground">User description goes here </p>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href="/private">Private Area</Link>
        </Button>
        <LogoutButton />

        {fullUser?.user_role === "admin" && (
          <>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin Panel</Link>
            </Button>
            <LogoutButton />
          </>
        )}

      </CardFooter>
    </Card>
  );
}
