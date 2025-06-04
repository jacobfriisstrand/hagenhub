import { notFound } from "next/navigation";

import { getCurrentUser } from "@/app/(auth)/current-user";
import ListingList from "@/app/features/listings/components/listing-list";
import { getListingsByUserPk } from "@/app/features/users/actions/get-listings-by-user-pk";
import UserAvatarCard from "@/app/features/users/components/profile/user-avatar-card";
import UserDescription from "@/app/features/users/components/profile/user-description";
import prisma from "@/lib/prisma"; // Adjust the import path to your prisma client

type ProfilePageProps = {
  params: Promise<{ user_pk: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-12">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <UserAvatarCard user_pk={user.user_pk} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <div className="space-y-6">
            {/* About Section */}
            <section className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-900">
                About
                {user.user_first_name}
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {user.user_description || "No description yet"}
              </p>
            </section>

            {/* Listings Section */}
            <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Listings</h3>
              <ListingList listings={listings} />
            </section>
          </div>
        </div>
      </div>
      <UserDescription user_pk={user.user_pk} />
      <ListingList listings={listings} user={currentUser} />
    </div>
  );
}
