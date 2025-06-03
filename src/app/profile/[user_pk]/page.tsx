import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/(auth)/current-user";
import ListingList from "@/app/features/listings/components/listing-list";
import { getListingsByUserPk } from "@/app/features/users/actions/get-listings-by-user-pk";
import UserAvatarCard from "@/app/features/users/components/profile/user-avatar-card";
import UserDescription from "@/app/features/users/components/profile/user-description";
import { prisma } from "@/lib/prisma"; // Adjust the import path to your prisma client

type ProfilePageProps = {
  params: Promise<{ user_pk: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;

  // Fetch user data from the database
  const user_pk = resolvedParams;

  const [user, listings] = await Promise.all([
    prisma.user.findUnique({
      where: { user_pk: user_pk.user_pk },
    }),
    getListingsByUserPk(user_pk.user_pk),
  ]);

  const currentUser = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false,
  });

  if (!user) {
    // If user not found, show 404 page
    notFound();
  }

  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-20">
      <div className=" md:h-full ">
        <UserAvatarCard user_pk={user.user_pk} />
      </div>
      <UserDescription user_pk={user.user_pk} />
      <ListingList listings={listings} user={currentUser} />
    </div>
  );
}
