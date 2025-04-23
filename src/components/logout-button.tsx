"use client";

import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button/button";

export default function LogoutButton() {
  return (
    <Button variant="destructive" onClick={async () => await logout()}>
      Logout
    </Button>
  );
}
