const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')
  
  // Clear existing records
  console.log('Clearing existing records...')
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