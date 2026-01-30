
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000
EXPOSE 5555

# CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"] // create
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
