import Link from "next/link";

import { Button } from "@/components/ui/button/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import { getCurrentUser } from "./(auth)/current-user";

export default async function Home() {
  const fullUser = await getCurrentUser();

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">{fullUser?.id}</h2>
        <p className="text-muted-foreground">User description goes here</p>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href="/private">Private Area</Link>
        </Button>

        {fullUser?.role === "admin" && (
          <Button asChild variant="secondary">
            <Link href="/admin">Admin Panel</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
