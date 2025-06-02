import Link from "next/link";

import type { FullUser } from "@/app/(auth)/current-user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile({ fullUser }: { fullUser: FullUser | null }) {
  if (!fullUser)
    return null;
  return (
    <Link href={`/profile/${fullUser?.user_pk}`}>
      <Avatar className="cursor-pointer size-10">
        <AvatarImage className="object-cover" src={fullUser?.user_avatar_url || undefined} />
        <AvatarFallback>
          {fullUser?.user_first_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
