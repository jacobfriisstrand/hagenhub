import { getCurrentUser } from "@/app/(auth)/current-user";
import Logo from "@/components/header/logo";
import LinkWithIcon from "@/components/link-with-icon";
import prisma from "@/lib/prisma";

export default async function Footer() {
  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false,
  });

  const listingTypes = await prisma.listingType.findMany();

  // Get top 3 listing areas with their listing counts
  const topAreas = await prisma.listingArea.findMany({
    include: {
      _count: {
        select: {
          listings: true,
        },
      },
    },
    orderBy: {
      listings: {
        _count: "desc",
      },
    },
    take: 3,
  });
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <section className="space-y-4">
            <Logo />
            <p className="text-gray-600 text-sm">
              Find your perfect stay in Copenhagen with our curated selection of apartments, houses, and rooms.
            </p>
          </section>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <LinkWithIcon href="/" icon="search">
                  All Listings
                </LinkWithIcon>
              </li>
              {topAreas.map(area => (
                <li key={area.listing_area_pk}>
                  <LinkWithIcon href={`/search?search=${area.listing_area_name}`} icon="map-pin">
                    {area.listing_area_name}
                  </LinkWithIcon>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Property Types</h3>
            <ul className="space-y-2">
              {listingTypes.map(type => (
                <li key={type.listing_type_pk}>
                  <LinkWithIcon href={`/search?search=${type.listing_type_name}`} icon="">
                    {type.listing_type_name}
                  </LinkWithIcon>
                </li>
              ))}
            </ul>

            {user && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mt-6 mb-4">Account</h3>
                <ul className="space-y-2">
                  <li>
                    <LinkWithIcon href="/" icon="house">
                      Listings
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon href="/add-listing" icon="plus">
                      Create Listing
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon href="/private/my-bookings" icon="calendar">
                      MyBookings
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon href="/private/my-listings" icon="list">
                      My Listings
                    </LinkWithIcon>
                  </li>
                  <li>
                    <LinkWithIcon href="/edit-account" icon="user">
                      Edit Account
                    </LinkWithIcon>
                  </li>
                </ul>
              </>
            )}

          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <LinkWithIcon href="mailto:support@hagenhub.com" icon="mail">
                  support@hagenhub.com
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon href="tel:+4512345678" icon="phone">
                  +45 12 34 56 78
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon href="/" icon="info">
                  About Us
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon href="/" icon="info">
                  Terms & Conditions
                </LinkWithIcon>
              </li>
              <li>
                <LinkWithIcon href="/" icon="info">
                  Privacy Policy
                </LinkWithIcon>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            Hagenhub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
