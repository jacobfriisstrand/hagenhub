import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";

type UserAvatarCardProps = {
  user_pk: string;
};

export default async function UserAvatarCard({ user_pk }: UserAvatarCardProps) {
  const user = await prisma.user.findUnique({
    where: { user_pk },
    include: {
      user_listings: true,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Card className="mx-auto md:sticky md:top-24 py-4 px-2">
        <CardContent>

          {/* Profile Sidebar */}
          <div className="md:col-span-3">
            <div className="sticky top-24">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg ">
                <Avatar className=" w-24 h-24 mb-4 border-2 border-blue-100">
                  <AvatarFallback className="bg-blue-50 text-blue-600 text-2xl">
                    {user.user_first_name.charAt(0)}
                  </AvatarFallback>
                  <AvatarImage className="object-cover" src={user.user_avatar_url || ""} />
                </Avatar>
                <h2 className="text-2xl font-bold">
                  {user.user_first_name}
                  {" "}
                  {user.user_last_name}
                </h2>
                <p className="px-3 py-1 mt-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {user.user_listings.length > 0 ? "Host" : "Guest"}
                </p>

                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Listings</span>
                    <span className="font-medium">{user.user_listings.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Member since</span>
                    <span className="font-medium">{user.user_created_at?.toLocaleDateString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-6">Contact Host</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
