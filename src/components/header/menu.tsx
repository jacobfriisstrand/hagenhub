import Link from "next/link";

import type { User } from "@/app/(auth)/current-user";

import { hasListings } from "@/app/features/users/actions/has-listings";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import LogoutButton from "../logout-button";

export default async function Menu({ user }: { user: User | null }) {
  const userHasListings = user ? await hasListings(user.user_pk) : false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 px-2 py-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-justify-icon lucide-align-justify">
            <path d="M3 12h18" />
            <path d="M3 18h18" />
            <path d="M3 6h18" />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/">
          <DropdownMenuItem>
            Listings
          </DropdownMenuItem>
        </Link>
        {user
          ? (
              <>
                <Link href="/add-listing">
                  <DropdownMenuItem>
                    Create Listing
                  </DropdownMenuItem>
                </Link>
                {userHasListings && (
                  <Link href="/private/my-listings">
                    <DropdownMenuItem>
                      My Listings
                    </DropdownMenuItem>
                  </Link>
                )}
                <Link href={`/bookings/${user.user_pk}`}>
                  <DropdownMenuItem>
                    Bookings
                  </DropdownMenuItem>
                </Link>
                <Link href="/edit-account">
                  <DropdownMenuItem>
                    Edit Account
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />

                <LogoutButton />

              </>
            )
          : (
              <>
                <DropdownMenuSeparator />
                <Link href="/login" className="cursor-pointer">
                  <DropdownMenuItem>
                    Login
                  </DropdownMenuItem>
                </Link>
                <Link href="/signup" className="cursor-pointer text-blue-600">
                  <DropdownMenuItem>
                    Sign up
                  </DropdownMenuItem>
                </Link>
              </>
            )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
