const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')
  
  // Clear existing records
  console.log('Clearing existing records...')
  await prisma.listingType.deleteMany()

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