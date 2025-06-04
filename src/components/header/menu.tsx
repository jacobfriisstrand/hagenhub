import type { User } from "@/app/(auth)/current-user";

import { hasListings } from "@/app/features/users/actions/has-listings";
import LinkWithIcon from "@/components/link-with-icon";
import LogoutButton from "@/components/logout-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default async function Menu({ user }: { user: User | null }) {
  const userHasListings = user ? await hasListings(user.user_pk) : false;

  return (
    <DropdownMenu modal={false}>
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
        <DropdownMenuItem>
          <LinkWithIcon href="/" icon="house">
            See all listings
          </LinkWithIcon>
        </DropdownMenuItem>
        {user
          ? (
              <>
                <DropdownMenuItem>
                  <LinkWithIcon href="/add-listing" icon="plus">
                    Create listing
                  </LinkWithIcon>
                </DropdownMenuItem>
                {userHasListings && (
                  <DropdownMenuItem>
                    <LinkWithIcon href="/private/my-listings" icon="list">
                      My listings
                    </LinkWithIcon>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <LinkWithIcon href={`/bookings/${user.user_pk}`} icon="calendar">
                    Bookings
                  </LinkWithIcon>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LinkWithIcon href="/edit-account" icon="user">
                    Edit account
                  </LinkWithIcon>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton />
              </>
            )
          : (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LinkWithIcon href="/login" icon="log-in">
                    Login
                  </LinkWithIcon>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LinkWithIcon href="/signup" icon="user-plus">
                    Sign up
                  </LinkWithIcon>
                </DropdownMenuItem>
              </>
            )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
