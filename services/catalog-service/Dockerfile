FROM node:20-alpine AS build

WORKDIR /catalog-service

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /catalog-service

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /catalog-service/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/main.js"]
