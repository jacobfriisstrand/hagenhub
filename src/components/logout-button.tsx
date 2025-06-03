"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button/button";

import { DynamicIcon } from "@/components/dynamic-icon";

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
<<<<<<< HEAD
      <DynamicIcon name="log-out" className="w-4 h-4" />
      <DynamicIcon name="log-out" className="w-4 h-4" />
=======
>>>>>>> bf51935 (32-fe-booklistingform (#142))
      Logout
    </Button>
  );
}
