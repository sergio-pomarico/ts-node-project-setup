FROM node:22-alpine AS base

ENV DIR /app
WORKDIR $DIR

# Install dependencies and build
FROM base AS build

COPY package*.json /app
COPY tsconfig*.json $DIR
COPY types $DIR/types
COPY src $DIR/src

RUN npm ci

RUN npm run build && \
    npm prune --production

# Run app on release mode
FROM base AS release

RUN apk update && apk add --no-cache dumb-init

ENV NODE_ENV=production

ENV USER=node

USER $USER

COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

EXPOSE $PORT

CMD ["dumb-init", "node", "dist/app.js"]
