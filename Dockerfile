FROM node:18.20.1-alpine AS ui-build
WORKDIR /app
COPY client/ ./client/
WORKDIR /app/client
RUN npm install && npm run build && ls -la ./dist

FROM node:18.20.1-alpine AS server-build
WORKDIR /app
COPY server/ ./server/
WORKDIR /app/server

# Clean npm cache and install dependencies
RUN npm cache clean --force && \
    npm install -g typescript && \
    npm install --omit=dev && \
    npm run build:prod && ls -la

FROM node:18.20.1-alpine
WORKDIR /app
#COPY --from=ui-build /app/client/dist ./client/dist
#COPY --from=server-build /app/server/dist ./server/dist
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "./server/dist/index.js"]