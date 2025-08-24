FROM node:22-alpine

RUN apk add --no-cache bash curl build-base python3

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

COPY docker-entrypoint.sh .
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 4001
CMD ["./docker-entrypoint.sh"]