# HagenHub

A Next.js project with Prisma and PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (version specified in `.nvmrc`)
- [Docker](https://www.docker.com/) and Docker Compose (for PostgreSQL database)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd hagenhub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Start the PostgreSQL database using Docker:

```bash
docker compose up --build -d
```

### 4. Set up environment variables

Create a `.env` file in the root directory with the required environment variables. See `.env.example` for reference.

### 5. Run database migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

Or use the npm script:

```bash
npm run db:deploy
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests with Vitest
- `npm run db:deploy` - Deploy database migrations and generate Prisma client

## Database Management

You can use Prisma Studio to manage your database:

```bash
npx prisma studio
```

This will start Prisma Studio at [http://localhost:5555](http://localhost:5555).

## Docker

The project includes Docker configuration for running the entire stack:

```bash
docker-compose up
```

This will start:

- PostgreSQL database
- Next.js application
- Prisma Studio (available at http://localhost:5555)

## Project Structure

- `/src` - Application source code
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets
