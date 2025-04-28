import Link from "next/link";

import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Welcome to the admin area
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/private">Private Area</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
