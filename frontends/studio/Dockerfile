
FROM node:20-alpine AS build

WORKDIR /studio

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /studio

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build --chown=node:node /studio/.next/standalone ./

COPY --from=build --chown=node:node /studio/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
