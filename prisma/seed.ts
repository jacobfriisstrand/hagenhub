import { PrismaClient } from '@prisma/client'
import crypto from "node:crypto"

const prisma = new PrismaClient()

// Helper function for password hashing (matching the application's method)
async function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) {
        reject(error);
      }
      resolve(hash.toString("hex").normalize());
    });
  });
}

// Shared data
const streetNames = ["Gothersgade", "Frederiksberg Allé", "Østerbrogade", "Nørrebrogade", "Vesterbrogade", "Amagerbrogade", "Store Kongensgade", "Bredgade", "Strøget", "Nyhavn"]
const streetNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
const firstNames = ["John", "Jane", "Maria", "Peter", "Anna", "Michael", "Sarah", "David", "Emma", "Lucas", "Sophie", "Oliver", "Isabella", "William", "Mia"]
const lastNames = ["Doe", "Smith", "Jensen", "Nielsen", "Hansen", "Andersen", "Pedersen", "Christensen", "Larsen", "Sørensen", "Rasmussen", "Jørgensen", "Madsen", "Kristensen", "Olsen"]
const domains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"]

// Helper functions for generating random data
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomUser(index: number, zipCodes: { code: string }[]) {
  const firstName = getRandomElement(firstNames)
  const lastName = getRandomElement(lastNames)
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${getRandomElement(domains)}`
  const password = "Password123!"
  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  
  return {
    user_first_name: firstName,
    user_last_name: lastName,
    user_email: email,
    user_password: hashedPassword,
    salt: salt,
    user_role: "user",
    user_phone_number: `${getRandomNumber(10000000, 99999999)}`,
    user_zip_code: getRandomElement(zipCodes).code,
    user_street_name: getRandomElement(streetNames),
    user_street_number: getRandomElement(streetNumbers),
    user_description: Math.random() > 0.5 ? `Experienced host with ${getRandomNumber(1, 10)} years of experience in hospitality.` : null,
    user_avatar_url: null as string | null // Allow both string and null values
  }
}

function generateRandomListing(userId: string, typeId: string, areaId: string, zipCodes: { code: string }[]) {
  const titles = [
    "Luxury", "Cozy", "Modern", "Charming", "Spacious", "Stylish", "Elegant", "Beautiful", "Stunning", "Amazing",
    "Perfect", "Wonderful", "Fantastic", "Excellent", "Superb"
  ]
  const types = [
    "Apartment", "House", "Villa", "Studio", "Room", "Loft", "Penthouse", "Cottage", "Mansion", "Bungalow"
  ]
  const areas = [
    "City Center", "Downtown", "Historic District", "Waterfront", "Business District", "Residential Area",
    "Shopping District", "Cultural Quarter", "University Area", "Park View"
  ]
  
  const title = `${getRandomElement(titles)} ${getRandomElement(types)} in ${getRandomElement(areas)}`
  const description = `Beautiful ${getRandomElement(types).toLowerCase()} with amazing views and modern amenities. Perfect for ${getRandomElement(["couples", "families", "business travelers", "groups", "solo travelers"])}.`
  
  const bedrooms = getRandomNumber(1, 6)
  const guestCount = bedrooms * 2
  
  return {
    listing_title: title,
    listing_description: description,
    listing_zip_code: getRandomElement(zipCodes).code,
    listing_street_name: getRandomElement(streetNames),
    listing_street_number: getRandomElement(streetNumbers),
    listing_night_price: getRandomNumber(500, 5000),
    listing_type_fk: typeId,
    listing_area_fk: areaId,
    listing_bedrooms: bedrooms,
    listing_guest_count: guestCount,
    listing_latitude: 55.6 + (Math.random() * 0.2), // Copenhagen latitude range
    listing_longitude: 12.5 + (Math.random() * 0.2), // Copenhagen longitude range
    listing_user_fk: userId
  }
}

function generateRandomBooking(guestId: string, listingId: string) {
  // Get current date
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  
  // Create start date within current month
  const startDate = new Date(currentYear, currentMonth, getRandomNumber(1, 28))
  
  // Create end date within current month (max 14 days from start)
  const endDate = new Date(startDate)
  const maxDaysUntilEndOfMonth = 28 - startDate.getDate() // Using 28 to be safe
  const stayDuration = getRandomNumber(1, Math.min(14, maxDaysUntilEndOfMonth))
  endDate.setDate(startDate.getDate() + stayDuration)
  
  const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"]
  const status = getRandomElement(statuses) as "Pending" | "Confirmed" | "Completed" | "Cancelled"
  
  return {
    booking_guest_fk: guestId,
    booking_listing_fk: listingId,
    booking_guest_count: getRandomNumber(1, 8),
    booking_night_count: stayDuration,
    booking_check_in: startDate,
    booking_check_out: endDate,
    booking_status: status
  }
}

function generateRandomReview(bookingId: string, userId: string, listingId: string) {
  const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
  const comments = [
    "Excellent stay! Would definitely recommend.",
    "Great location and very comfortable.",
    "Perfect for our needs, very clean and well-maintained.",
    "Amazing experience, the host was very accommodating.",
    "Beautiful property with all the amenities we needed.",
    "Wonderful stay, exceeded our expectations.",
    "Very nice place, would stay again.",
    "Good value for money, enjoyed our stay.",
    "Comfortable and convenient location.",
    "Nice property with good facilities."
  ]
  
  return {
    review_rating: getRandomElement(ratings) as number,
    review_comment: getRandomElement(comments),
    review_user_fk: userId,
    review_listing_fk: listingId,
    review_booking_fk: bookingId
  }
}

async function main() {
  console.log('Starting database seeding...')
  
  // Clear existing records
  console.log('Clearing existing records...')
  await prisma.review.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.listingImage.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.user.deleteMany()
  await prisma.listingType.deleteMany()
  await prisma.zipCode.deleteMany()
  await prisma.listingArea.deleteMany()

  // Create listing types
  console.log('Creating listing types...')
  const listingTypes = [
    { name: "Apartment", icon: "building" },
    { name: "House", icon: "house" },
    { name: "Room", icon: "door-open" },
    { name: "Villa", icon: "castle" },
    { name: "Studio", icon: "door-closed" }
  ]

  const createdTypes = await Promise.all(
    listingTypes.map(type => 
      prisma.listingType.create({
        data: {
          listing_type_name: type.name,
          listing_type_icon: type.icon,
        },
      })
    )
  )

  // Create listing areas
  console.log('Creating listing areas...')
  const areas = [
    "Copenhagen K",
    "Copenhagen V",
    "Copenhagen Ø",
    "Copenhagen N",
    "Copenhagen S",
    "Copenhagen NV",
    "Copenhagen SV",
    "Frederiksberg C",
    "Frederiksberg",
    "Amager",
    "Christianshavn",
    "Vesterbro",
    "Nørrebro",
    "Østerbro"
  ]

  const createdAreas = await Promise.all(
    areas.map(areaName => 
      prisma.listingArea.create({
        data: {
          listing_area_name: areaName,
        },
      })
    )
  )

  // Create zip codes
  console.log('Creating zip codes...')
  const zipCodes = [
    { code: "1050", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1051", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1052", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1053", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1054", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1055", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1056", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1057", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1058", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1059", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1100", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1150", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1200", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1300", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1400", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1500", city: "Copenhagen", district: "Copenhagen K" },
    { code: "1600", city: "Copenhagen", district: "Copenhagen V" },
    { code: "1620", city: "Copenhagen", district: "Copenhagen V" },
    { code: "1700", city: "Copenhagen", district: "Copenhagen V" },
    { code: "1800", city: "Frederiksberg", district: "Frederiksberg C" },
    { code: "1900", city: "Frederiksberg", district: "Frederiksberg C" },
    { code: "2000", city: "Frederiksberg", district: "Frederiksberg" },
    { code: "2100", city: "Copenhagen", district: "Copenhagen Ø" },
    { code: "2200", city: "Copenhagen", district: "Copenhagen N" },
    { code: "2300", city: "Copenhagen", district: "Copenhagen S" },
    { code: "2400", city: "Copenhagen", district: "Copenhagen NV" },
    { code: "2450", city: "Copenhagen", district: "Copenhagen SV" },
    { code: "2500", city: "Copenhagen", district: "Valby" },
    { code: "2600", city: "Copenhagen", district: "Glostrup" },
    { code: "2700", city: "Copenhagen", district: "Brønshøj" },
    { code: "2800", city: "Copenhagen", district: "Kongens Lyngby" }
  ]

  const createdZipCodes = await Promise.all(
    zipCodes.map(zipCode => 
      prisma.zipCode.create({
        data: {
          zip_code: zipCode.code,
          zip_code_city_name: zipCode.city,
          zip_code_district_name: zipCode.district,
        },
      })
    )
  )

  // Create users
  console.log('Creating users...')
  const users = []
  for (let i = 0; i < 20; i++) {
    const userData = generateRandomUser(i, createdZipCodes.map(z => ({ code: z.zip_code })))
    const randomNumber = getRandomNumber(1, 100)
    userData.user_avatar_url = `https://randomuser.me/api/portraits/men/${randomNumber}.jpg`
    users.push(userData)
  }

  const createdUsers = await Promise.all(
    users.map(user => prisma.user.create({ data: user }))
  )

  // Create listings (100 listings)
  console.log('Creating listings...')
  const createdListings = await Promise.all(
    Array.from({ length: 100 }, () => {
      const user = getRandomElement(createdUsers)
      const type = getRandomElement(createdTypes)
      const area = getRandomElement(createdAreas)
      return generateRandomListing(user.user_pk, type.listing_type_pk, area.listing_area_pk, createdZipCodes.map(z => ({ code: z.zip_code })))
    }).map(listingData =>
      prisma.listing.create({ data: listingData })
    )
  )

  // Add images to listings (3-5 images per listing)
  console.log('Adding images to listings...')
  for (const listing of createdListings) {
    const numImages = getRandomNumber(3, 5)
    await Promise.all(
      Array.from({ length: numImages }, () => {
        const randomId = getRandomNumber(100, 200)
        return prisma.listingImage.create({
          data: {
            listing_image_url: `https://picsum.photos/id/${randomId}/800/600?random=1`,
            listing_image_listing_fk: listing.listing_pk
          }
        })
      })
    )
  }

  // Create HagenHub test user
  console.log('Creating HagenHub test user...')
  const hagenHubSalt = crypto.randomBytes(16).toString("hex").normalize()
  const hagenHubHashedPassword = await hashPassword("password", hagenHubSalt)

  const hagenHubUser = await prisma.user.create({
    data: {
      user_first_name: "Hagen",
      user_last_name: "Hub",
      user_email: "test@hagenhub.com",
      user_password: hagenHubHashedPassword,
      salt: hagenHubSalt,
      user_role: "user",
      user_phone_number: "12345678",
      user_zip_code: "1050",
      user_street_name: "Gothersgade",
      user_street_number: "1",
      user_description: "Experienced host with 5 years of experience in hospitality.",
      user_avatar_url: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  })

  // Create listings for HagenHub user
  console.log('Creating listings for HagenHub user...')
  const hagenHubListings = await Promise.all([
    prisma.listing.create({
      data: {
        listing_title: "Luxury Apartment in City Center",
        listing_description: "Beautiful modern apartment in the heart of Copenhagen. Perfect for couples or small families. Features high-end amenities and stunning city views.",
        listing_zip_code: "1050",
        listing_street_name: "Gothersgade",
        listing_street_number: "1",
        listing_night_price: 2500,
        listing_type_fk: createdTypes[0].listing_type_pk, // Apartment
        listing_area_fk: createdAreas[0].listing_area_pk, // Copenhagen K
        listing_bedrooms: 2,
        listing_guest_count: 4,
        listing_latitude: 55.68,
        listing_longitude: 12.57,
        listing_user_fk: hagenHubUser.user_pk
      }
    }),
    prisma.listing.create({
      data: {
        listing_title: "Cozy Studio in Vesterbro",
        listing_description: "Charming studio apartment in the trendy Vesterbro district. Perfect for solo travelers or couples. Close to cafes, restaurants, and public transport.",
        listing_zip_code: "1620",
        listing_street_name: "Vesterbrogade",
        listing_street_number: "42",
        listing_night_price: 1200,
        listing_type_fk: createdTypes[4].listing_type_pk, // Studio
        listing_area_fk: createdAreas[5].listing_area_pk, // Vesterbro
        listing_bedrooms: 1,
        listing_guest_count: 2,
        listing_latitude: 55.67,
        listing_longitude: 12.55,
        listing_user_fk: hagenHubUser.user_pk
      }
    }),
    prisma.listing.create({
      data: {
        listing_title: "Spacious House in Frederiksberg",
        listing_description: "Large family house in the beautiful Frederiksberg area. Perfect for families or groups. Features a garden and modern amenities.",
        listing_zip_code: "2000",
        listing_street_name: "Frederiksberg Allé",
        listing_street_number: "15",
        listing_night_price: 3500,
        listing_type_fk: createdTypes[1].listing_type_pk, // House
        listing_area_fk: createdAreas[7].listing_area_pk, // Frederiksberg C
        listing_bedrooms: 4,
        listing_guest_count: 8,
        listing_latitude: 55.67,
        listing_longitude: 12.53,
        listing_user_fk: hagenHubUser.user_pk
      }
    })
  ])

  // Add images to HagenHub listings
  await Promise.all([
    // Images for first listing
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/201/800/600?random=1?random=1?random=1",
        listing_image_listing_fk: hagenHubListings[0].listing_pk
      }
    }),
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/202/800/600?random=1?random=1?random=1",
        listing_image_listing_fk: hagenHubListings[0].listing_pk
      }
    }),
    // Images for second listing
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/203/800/600?random=1?random=1?random=1",
        listing_image_listing_fk: hagenHubListings[1].listing_pk
      }
    }),
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/204/800/600?random=1?random=1?random=1",
        listing_image_listing_fk: hagenHubListings[1].listing_pk
      }
    }),
    // Images for third listing
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/205/800/600?random=1?random=1",
        listing_image_listing_fk: hagenHubListings[2].listing_pk
      }
    }),
    prisma.listingImage.create({
      data: {
        listing_image_url: "https://picsum.photos/id/206/800/600?random=1",
        listing_image_listing_fk: hagenHubListings[2].listing_pk
      }
    })
  ])

  // Create bookings for HagenHub user's listings
  console.log('Creating bookings for HagenHub listings...')
  const hagenHubNow = new Date()
  const hagenHubNextMonth = new Date(hagenHubNow.getFullYear(), hagenHubNow.getMonth() + 1, 1)
  const hagenHubTwoMonthsLater = new Date(hagenHubNow.getFullYear(), hagenHubNow.getMonth() + 2, 1)

  // Get some random users to book HagenHub's listings
  const randomGuests = getRandomElements(createdUsers, 6)

  // Create bookings for each listing with different statuses
  const hagenHubHostBookings = await Promise.all([
    // First listing bookings
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[0].user_pk,
        booking_listing_fk: hagenHubListings[0].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 3,
        booking_check_in: hagenHubNextMonth,
        booking_check_out: new Date(hagenHubNextMonth.getTime() + 3 * 24 * 60 * 60 * 1000),
        booking_status: "Pending"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[1].user_pk,
        booking_listing_fk: hagenHubListings[0].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 5,
        booking_check_in: hagenHubTwoMonthsLater,
        booking_check_out: new Date(hagenHubTwoMonthsLater.getTime() + 5 * 24 * 60 * 60 * 1000),
        booking_status: "Confirmed"
      }
    }),
    // Second listing bookings
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[2].user_pk,
        booking_listing_fk: hagenHubListings[1].listing_pk,
        booking_guest_count: 1,
        booking_night_count: 4,
        booking_check_in: new Date(hagenHubNow.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        booking_check_out: new Date(hagenHubNow.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        booking_status: "Completed"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[3].user_pk,
        booking_listing_fk: hagenHubListings[1].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 2,
        booking_check_in: new Date(hagenHubNow.getTime() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        booking_check_out: new Date(hagenHubNow.getTime() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
        booking_status: "Cancelled"
      }
    }),
    // Third listing bookings
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[4].user_pk,
        booking_listing_fk: hagenHubListings[2].listing_pk,
        booking_guest_count: 4,
        booking_night_count: 7,
        booking_check_in: new Date(hagenHubNow.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        booking_check_out: new Date(hagenHubNow.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        booking_status: "Completed"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: randomGuests[5].user_pk,
        booking_listing_fk: hagenHubListings[2].listing_pk,
        booking_guest_count: 6,
        booking_night_count: 3,
        booking_check_in: hagenHubNextMonth,
        booking_check_out: new Date(hagenHubNextMonth.getTime() + 3 * 24 * 60 * 60 * 1000),
        booking_status: "Confirmed"
      }
    })
  ])

  // Create reviews for completed bookings
  await Promise.all([
    prisma.review.create({
      data: {
        review_rating: 4.5,
        review_comment: "Great stay! The apartment was exactly as described and the location was perfect.",
        review_user_fk: randomGuests[2].user_pk,
        review_listing_fk: hagenHubListings[1].listing_pk,
        review_booking_fk: hagenHubHostBookings[2].booking_pk
      }
    }),
    prisma.review.create({
      data: {
        review_rating: 5,
        review_comment: "Amazing house! Perfect for our family gathering. The host was very accommodating.",
        review_user_fk: randomGuests[4].user_pk,
        review_listing_fk: hagenHubListings[2].listing_pk,
        review_booking_fk: hagenHubHostBookings[4].booking_pk
      }
    })
  ])

  // Create bookings for HagenHub user as a guest
  console.log('Creating bookings for HagenHub user as guest...')
  const randomListings = getRandomElements(
    createdListings.filter(listing => listing.listing_user_fk !== hagenHubUser.user_pk),
    5
  )

  const hagenHubGuestBookings = await Promise.all([
    prisma.booking.create({
      data: {
        booking_guest_fk: hagenHubUser.user_pk,
        booking_listing_fk: randomListings[0].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 3,
        booking_check_in: hagenHubNextMonth,
        booking_check_out: new Date(hagenHubNextMonth.getTime() + 3 * 24 * 60 * 60 * 1000),
        booking_status: "Pending"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: hagenHubUser.user_pk,
        booking_listing_fk: randomListings[1].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 5,
        booking_check_in: hagenHubTwoMonthsLater,
        booking_check_out: new Date(hagenHubTwoMonthsLater.getTime() + 5 * 24 * 60 * 60 * 1000),
        booking_status: "Confirmed"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: hagenHubUser.user_pk,
        booking_listing_fk: randomListings[2].listing_pk,
        booking_guest_count: 3,
        booking_night_count: 4,
        booking_check_in: new Date(hagenHubNow.getTime() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        booking_check_out: new Date(hagenHubNow.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        booking_status: "Completed"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: hagenHubUser.user_pk,
        booking_listing_fk: randomListings[3].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 2,
        booking_check_in: new Date(hagenHubNow.getTime() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
        booking_check_out: new Date(hagenHubNow.getTime() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
        booking_status: "Cancelled"
      }
    }),
    prisma.booking.create({
      data: {
        booking_guest_fk: hagenHubUser.user_pk,
        booking_listing_fk: randomListings[4].listing_pk,
        booking_guest_count: 2,
        booking_night_count: 3,
        booking_check_in: new Date(hagenHubNow.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        booking_check_out: new Date(hagenHubNow.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        booking_status: "Completed"
      }
    })
  ])

  // Create reviews for HagenHub's completed guest bookings
  await Promise.all([
    prisma.review.create({
      data: {
        review_rating: 4,
        review_comment: "Very nice apartment in a great location. The host was very helpful and responsive.",
        review_user_fk: hagenHubUser.user_pk,
        review_listing_fk: randomListings[2].listing_pk,
        review_booking_fk: hagenHubGuestBookings[2].booking_pk
      }
    }),
    prisma.review.create({
      data: {
        review_rating: 5,
        review_comment: "Excellent stay! The property was beautiful and the host was extremely accommodating.",
        review_user_fk: hagenHubUser.user_pk,
        review_listing_fk: randomListings[4].listing_pk,
        review_booking_fk: hagenHubGuestBookings[4].booking_pk
      }
    })
  ])

  // Create random bookings
  console.log('Creating random bookings...')
  const createdBookings = []
  
  for (const listing of createdListings) {
    const numBookings = getRandomNumber(2, 10)
    const listingBookings = await Promise.all(
      Array.from({ length: numBookings }, () => {
        const guest = getRandomElement(createdUsers)
        return generateRandomBooking(guest.user_pk, listing.listing_pk)
      }).map(bookingData =>
        prisma.booking.create({ data: bookingData })
      )
    )
    createdBookings.push(...listingBookings)
  }

  // Create reviews for completed bookings
  console.log('Creating reviews...')
  const randomCompletedBookings = createdBookings.filter(b => b.booking_status === "Completed")
  
  // Group bookings by listing to ensure we don't have multiple reviews from the same user for the same listing
  const bookingsByListing = randomCompletedBookings.reduce((acc, booking) => {
    if (!acc[booking.booking_listing_fk]) {
      acc[booking.booking_listing_fk] = []
    }
    acc[booking.booking_listing_fk].push(booking)
    return acc
  }, {} as Record<string, typeof randomCompletedBookings>)

  // Create reviews ensuring different users for each listing
  for (const [listingId, bookings] of Object.entries(bookingsByListing)) {
    // Get unique guests who have completed bookings for this listing
    const uniqueGuests = [...new Set(bookings.map(b => b.booking_guest_fk))]
    
    // For each unique guest, create a review if they haven't already reviewed
    for (const guestId of uniqueGuests) {
      const booking = bookings.find(b => b.booking_guest_fk === guestId)
      if (!booking) continue

      // Check if this guest has already reviewed this listing
      const existingReview = await prisma.review.findFirst({
        where: {
          review_user_fk: guestId,
          review_listing_fk: listingId
        }
      })

      if (!existingReview) {
        await prisma.review.create({
          data: generateRandomReview(booking.booking_pk, guestId, listingId)
        })
      }
    }
  }

  console.log('Seeding completed successfully!')
}

// Helper function to get random elements from an array
function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })