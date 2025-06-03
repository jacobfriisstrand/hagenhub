import { prisma } from "@/lib/prisma";

type UserDescriptionProps = {
  user_pk: string;
};

export default async function UserDescription({ user_pk }: UserDescriptionProps) {
  const user = await prisma.user.findUnique({
    where: { user_pk },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">
          About
          {" "}
          {user.user_first_name}
          {" "}
          {user.user_last_name}
        </h2>
        <p>{user.user_description || "No description yet"}</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">
          {user.user_first_name}
          {" "}
          Listings
        </h2>
      </div>
    </div>
  );
}
