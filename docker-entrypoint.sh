#!/bin/sh

set -e

echo "📦 Lancement de Prisma migrate deploy..."
npx prisma migrate deploy

echo "🚀 Lancement de l'application NestJS en production..."
exec node dist/src/main.js