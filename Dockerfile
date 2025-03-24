FROM node:lts-alpine3.17

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY prisma ./prisma

RUN apk add --no-cache python3 make g++

RUN npm ci

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]