import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

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
      <Card className="mx-auto md:sticky md:top-10 py-4 px-2">
        <CardContent>
          <div className="flex flex-row items-center gap-10 justify-start">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="size-24">
                <AvatarImage className="object-cover" src={user.user_avatar_url ?? ""} alt="User Avatar" width={300} height={300} />
                <AvatarFallback>
                  {user.user_first_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg">
                {user.user_first_name}
                {" "}
                {user.user_last_name}
              </p>
              <p className="text-sm text-gray-500">
                Host
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">

              <p className="text-sm flex flex-col items-center gap-2 text-gray-500">
                Listings
                <span className="font-bold text-md text-black">
                  {" "}
                  {user.user_listings.length}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
