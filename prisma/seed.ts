const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')
  
  // Clear existing records
  console.log('Clearing existing records...')
  await prisma.booking.deleteMany()
  await prisma.listingImage.deleteMany()
  await prisma.listing.deleteMany()
  await prisma.user.deleteMany()
  await prisma.listingType.deleteMany()
  await prisma.zipCode.deleteMany()
  await prisma.listingArea.deleteMany()

  console.log('Creating listing types...')
  const apartmentType = await prisma.listingType.create({
    data: {
      listing_type_name: "Apartment",
      listing_type_icon: "building",
    },
  })

  const houseType = await prisma.listingType.create({
    data: {
      listing_type_name: "House",
      listing_type_icon: "house",
    },
  })

  const roomType = await prisma.listingType.create({
    data: {
      listing_type_name: "Room",
      listing_type_icon: "door-open",
    },
  })

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
    "Frederiksberg"
  ]

  for (const areaName of areas) {
    await prisma.listingArea.create({
      data: {
        listing_area_name: areaName,
      },
    })
  }

  console.log('Creating Copenhagen zip codes...')
  const copenhagenZipCodes = [
    { zip_code: "1050", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1051", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1052", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1053", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1054", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1055", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1056", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1057", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1058", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1059", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1100", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1150", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1200", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1300", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1400", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1500", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen K" },
    { zip_code: "1600", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen V" },
    { zip_code: "1700", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen V" },
    { zip_code: "1800", zip_code_city_name: "Frederiksberg", zip_code_district_name: "Frederiksberg C" },
    { zip_code: "1900", zip_code_city_name: "Frederiksberg", zip_code_district_name: "Frederiksberg C" },
    { zip_code: "2000", zip_code_city_name: "Frederiksberg", zip_code_district_name: "Frederiksberg" },
    { zip_code: "2100", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen Ø" },
    { zip_code: "2200", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen N" },
    { zip_code: "2300", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen S" },
    { zip_code: "2400", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen NV" },
    { zip_code: "2450", zip_code_city_name: "Copenhagen", zip_code_district_name: "Copenhagen SV" },
  ]

  for (const zipCodeData of copenhagenZipCodes) {
    await prisma.zipCode.create({
      data: zipCodeData
    })
  }

  console.log('Creating sample listings...')
  const listings = [
    {
      listing_title: "Cozy Apartment in Copenhagen K",
      listing_description: "Beautiful apartment in the heart of Copenhagen, just minutes from Nyhavn and Strøget. Modern amenities and stunning city views.",
      listing_zip_code: "1050",
      listing_street_name: "Gothersgade",
      listing_street_number: "123",
      listing_night_price: 1200,
      listing_type_fk: apartmentType.listing_type_pk,
      listing_bedrooms: 2,
      listing_guests: 4,
      listing_guest_count: 4,
      listing_latitude: 55.6828,
      listing_longitude: 12.5757,
      listing_area_fk: (await prisma.listingArea.findFirst({ where: { listing_area_name: "Copenhagen K" } }))?.listing_area_pk,
    },
    {
      listing_title: "Charming House in Frederiksberg",
      listing_description: "Spacious family house with garden in the quiet and beautiful Frederiksberg area. Close to parks and public transportation.",
      listing_zip_code: "1800",
      listing_street_name: "Frederiksberg Allé",
      listing_street_number: "45",
      listing_night_price: 2500,
      listing_type_fk: houseType.listing_type_pk,
      listing_bedrooms: 4,
      listing_guests: 8,
      listing_guest_count: 8,
      listing_latitude: 55.6784,
      listing_longitude: 12.5347,
      listing_area_fk: (await prisma.listingArea.findFirst({ where: { listing_area_name: "Frederiksberg" } }))?.listing_area_pk,
    },
    {
      listing_title: "Modern Room in Østerbro",
      listing_description: "Bright and modern room in a shared apartment in Østerbro. Perfect for students or young professionals. Close to Fælledparken.",
      listing_zip_code: "2100",
      listing_street_name: "Østerbrogade",
      listing_street_number: "78",
      listing_night_price: 600,
      listing_type_fk: roomType.listing_type_pk,
      listing_bedrooms: 1,
      listing_guests: 2,
      listing_guest_count: 2,
      listing_latitude: 55.7087,
      listing_longitude: 12.5711,
      listing_area_fk: (await prisma.listingArea.findFirst({ where: { listing_area_name: "Copenhagen Ø" } }))?.listing_area_pk,
    }
  ]

  // Create a test user for the listings
  const testUser = await prisma.user.create({
    data: {
      user_first_name: "Test",
      user_last_name: "User",
      user_email: "test@example.com",
      user_password: "hashedpassword123",
      salt: "salt123",
      user_role: "user"
    }
  })

  // Create the listings with the test user and add images
  for (const listingData of listings) {
    const listing = await prisma.listing.create({
      data: {
        ...listingData,
        listing_user_fk: testUser.user_pk
      }
    })

    // Add 3-5 random images for each listing
    const numImages = Math.floor(Math.random() * 3) + 3 // Random number between 3-5
    for (let i = 0; i < numImages; i++) {
      const randomId = Math.floor(Math.random() * 101) + 100 // Random number between 100-200
      await prisma.listingImage.create({
        data: {
          listing_image_url: `https://picsum.photos/id/${randomId}/800/600`,
          listing_image_listing_fk: listing.listing_pk
        }
      })
    }
  }

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