"use client";

import { toggleRole } from "@/app/(auth)/toggle-role";
import { Button } from "@/components/ui/button/button";

export function ToggleRoleButton() {
  return <Button onClick={toggleRole}>Toggle Role</Button>;
}
