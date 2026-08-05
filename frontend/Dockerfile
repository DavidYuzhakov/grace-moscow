ARG NODE_VERSION=20-alpine

# Stage 1
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
npm ci --no-audit --no-fund

COPY . .

ARG NEXT_PUBLIC_YANDEX_API_KEY

ENV NEXT_PUBLIC_YANDEX_API_KEY=$NEXT_PUBLIC_YANDEX_API_KEY
ENV NODE_ENV=production

RUN echo "=== BUILD ENV ==="
RUN env | sort | grep NEXT_PUBLIC
RUN env | sort | grep STRAPI
RUN npm run build

# Stage 2
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]