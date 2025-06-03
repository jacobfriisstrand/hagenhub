import { getCurrentUser } from "@/app/(auth)/current-user";

import Logo from "./logo";
import Menu from "./menu";
import Profile from "./profile-image";
import SearchBar from "./search-bar";

export default async function Header() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false,
  });
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: false,
  });
  return (
<<<<<<< HEAD
    <header className="flex flex-col gap-4 py-4 px-8 md:flex-row md:items-center md:justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
=======
    <header className="flex flex-col gap-4 py-2 px-4 md:flex-row md:items-center md:justify-between">
>>>>>>> bf51935 (32-fe-booklistingform (#142))
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4 md:hidden">
          <Profile fullUser={fullUser} />
          <Menu user={user} />
        </div>
      </div>
      <SearchBar className="w-full md:w-1/2" />
      <div className="hidden md:flex md:flex-row md:items-center md:justify-end md:gap-4">
        <Profile fullUser={fullUser} />
        <Menu user={user} />
      </div>
    </header>
  );
}
