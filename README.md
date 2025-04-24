# HagenHub

A Next.js application with Prisma and PostgreSQL.

## Development Setup

### Prerequisites

- Node.js (v22.x)
- Docker
- npm

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jacobfriisstrand/hagenhub.git
   cd hagenhub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/hagenhub"
   NODE_ENV="development"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   This will:

   - Start the PostgreSQL database in Docker
   - Apply any pending migrations
   - Start Prisma Studio (available at http://localhost:5555)
   - Start the Next.js development server

The application will be available at `http://localhost:3000`.

### Database Management

#### Viewing Database

To inspect your database using Prisma Studio:

```bash
npx prisma studio
```

#### Creating Migrations

When you make changes to the schema (`prisma/schema.prisma`):

```bash
npx prisma migrate dev --name your_migration_name
```

#### Reset Database

To reset the database and re-apply all migrations:

```bash
npx prisma migrate reset
```

This will also run the seed script automatically.

#### Manual Seeding

To manually run the seed script:

```bash
npx prisma db seed
```

### Development Workflow

1. Create a new branch from `develop`
2. Make your changes
3. If you update the schema, create a migration:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
4. Test your changes locally
5. Create a PR to the `develop` branch
6. The GitHub Actions workflow will automatically verify your migrations

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/hagenhub"
NODE_ENV="development"
```

## Contributing

1. Branch from `develop`
2. Make your changes
3. Create a pull request to `develop`

The GitHub Actions workflow will automatically verify:

- Schema changes have corresponding migrations
- Migrations can be applied successfully
- Seeding works with your changes
