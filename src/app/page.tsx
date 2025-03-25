import Link from "next/link";

import { Button } from "@/components/ui/button/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

// First, let's create a type for our user data
type User = {
  role: string;
  // Add other user properties you need
};

export default function Home() {
  // This is where you'd normally fetch or receive the user data
  const fullUser: User = {
    role: "admin", // This is just for demonstration
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold">User Title</h2>
        <p className="text-muted-foreground">User description goes here</p>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href="/private">Private Area</Link>
        </Button>

        {fullUser.role === "admin" && (
          <Button asChild variant="secondary">
            <Link href="/admin">Admin Panel</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
