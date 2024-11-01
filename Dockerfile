FROM node:18.20.1-alpine AS ui-build
WORKDIR /app
COPY client/ ./client/
RUN cd client && npm install && npm run build

FROM node:18.20.1-alpine AS server-build
WORKDIR /app
COPY server/ ./server/
RUN cd server && npm install && npm run build:prod

FROM node:18.20.1-alpine
WORKDIR /app
COPY --from=ui-build /app/client/dist ./client/dist
COPY --from=server-build /app/server/dist ./
RUN ls

EXPOSE 3001

CMD ["node", "./api.bundle.js"]