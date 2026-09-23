#!/bin/bash
set -euo pipefail

cd /var/www/al-nawras

git fetch origin main
git reset --hard origin/main

npm ci
npm run build

pm2 restart al-nawras --update-env
pm2 save

echo "Deployed $(git rev-parse --short HEAD)"
