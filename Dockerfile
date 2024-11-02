# Build für die Client-Anwendung
FROM node:18.20.1-alpine AS ui-build
WORKDIR /app/client
COPY client/package*.json ./
COPY client/ ./
RUN npm install -g craco && npm install && npm run build && ls -la build

# Build für die Server-Anwendung
FROM node:18.20.1-alpine AS server-build
WORKDIR /app/server
COPY server/package*.json ./
COPY server/ ./
RUN npm install -g typescript && npm install --omit=dev
RUN rm -rf ./dist && npm run build:prod && ls -la dist

# Endgültiges Image
FROM node:18.20.1-alpine
WORKDIR /app

COPY --from=ui-build /app/client ./client
COPY --from=server-build /app/server ./server

RUN ls -la

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "./server/dist/src/server.js"]
