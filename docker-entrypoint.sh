#!/bin/sh

set -e

echo "📦 Lancement de Prisma migrate deploy..."
npx prisma migrate deploy

echo "🌱 Seeding de la base de données..."
npx prisma db seed

echo "🚀 Lancement de l'application NestJS en production..."
exec node dist/src/main.js