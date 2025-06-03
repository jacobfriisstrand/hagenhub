"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button/button";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await logout();
        router.refresh();
      }}
      className="hover:bg-transparent hover:text-red-500 hover:cursor-pointer p-0 m-0 h-fit py-1.5 px-2 flex justify-start max-w-full"
      variant="ghost"
    >
      Logout
    </Button>
  );
}
