# Використовуємо легкий Node.js образ
FROM node:22-alpine

# Встановлюємо робочу директорію (має співпадати з volume в docker-compose)
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./
COPY prisma ./prisma/

# Встановлюємо залежності та генеруємо клієнт Prisma
RUN npm install
RUN npx prisma generate

# Копіюємо решту коду
COPY . .

# Відкриваємо порт
EXPOSE 3000

# Команда запуску (перевизначається в docker-compose, але тут як fallback)
CMD ["npm", "run", "dev"]