# Build for client
FROM node:18.20.1-alpine AS ui-build
WORKDIR /app/client
COPY client/package*.json ./
COPY client/ ./
RUN npm install -g craco && npm install && npm run build

# Build for server
FROM node:18.20.1-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
COPY server/ ./
RUN npm install -g typescript && npm install --omit=dev
RUN rm -rf ./dist && npm run build:prod

# Resulting Image
FROM node:18.20.1-alpine
WORKDIR /app

COPY --from=ui-build /app/client ./client
COPY --from=server-build /app/server ./server

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "./server/dist/src/server.js"]
