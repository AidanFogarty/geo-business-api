FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
