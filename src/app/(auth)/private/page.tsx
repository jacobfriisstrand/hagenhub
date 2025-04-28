import Link from "next/link";

import { getCurrentUser } from "@/app/(auth)/current-user";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { ToggleRoleButton } from "./toggle-role-button";

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Private Page</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Role:
          {" "}
          {currentUser?.user_role}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <ToggleRoleButton />
      </CardFooter>
    </Card>
  );
}
