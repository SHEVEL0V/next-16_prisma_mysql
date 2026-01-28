FROM node:22-alpine

WORKDIR /app

# Копіюємо конфіги
COPY package*.json ./
COPY prisma ./prisma/

# Генеруємо
RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

# Використовуємо скрипт для запуску міграцій ПЕРЕД стартом додатку
CMD npx prisma migrate deploy && npm run dev
