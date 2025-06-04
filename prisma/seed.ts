import { PrismaClient } from '@prisma/client'
import crypto from "node:crypto"

const prisma = new PrismaClient()

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
    user_description: Math.random() > 0.5 ? `Experienced host with ${getRandomNumber(1, 10)} years of experience in hospitality.` : null
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

  // Create users (50 users)
  console.log('Creating users...')
  const createdUsers = await Promise.all(
    Array.from({ length: 50 }, (_, i) => generateRandomUser(i, createdZipCodes.map(z => ({ code: z.zip_code })))).map(userData =>
      prisma.user.create({ data: userData })
    )
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
            listing_image_url: `https://picsum.photos/id/${randomId}/800/600`,
            listing_image_listing_fk: listing.listing_pk
          }
        })
      })
    )
  }

  // Create bookings (200 bookings)
  console.log('Creating bookings...')
  const createdBookings = await Promise.all(
    Array.from({ length: 200 }, () => {
      const guest = getRandomElement(createdUsers)
      const listing = getRandomElement(createdListings)
      return generateRandomBooking(guest.user_pk, listing.listing_pk)
    }).map(bookingData =>
      prisma.booking.create({ data: bookingData })
    )
  )

  // Create reviews for completed bookings
  console.log('Creating reviews...')
  const completedBookings = createdBookings.filter(b => b.booking_status === "Completed")
  await Promise.all(
    completedBookings.map(booking => {
      const guest = createdUsers.find(u => u.user_pk === booking.booking_guest_fk)
      const listing = createdListings.find(l => l.listing_pk === booking.booking_listing_fk)
      if (!guest || !listing) return null
      
      return prisma.review.create({
        data: generateRandomReview(booking.booking_pk, guest.user_pk, listing.listing_pk)
      })
    })
  )

  console.log('Seeding completed successfully!')
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