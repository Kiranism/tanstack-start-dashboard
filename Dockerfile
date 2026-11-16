# ============================================
# Stage 1: Install dependencies
# ============================================

ARG NODE_VERSION=24-slim

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

# Install bun to use bun.lock for dependency resolution
RUN npm install -g bun

# Copy package-related files to leverage Docker cache
COPY package.json bun.lock* bunfig.toml ./

# Install dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile --ignore-scripts

# ============================================
# Stage 2: Build the TanStack Start application
# ============================================

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Nitro's Node.js server preset: a self-contained server in .output/
ENV SERVER_PRESET=node-server

RUN npm run build

# ============================================
# Stage 3: Production runner
# ============================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# .output bundles the server, its dependencies and the public assets,
# so node_modules isn't needed at runtime.
COPY --from=builder --chown=node:node /app/.output ./.output

# Run as non-root user
USER node

EXPOSE 3000

# SESSION_SECRET is required at runtime: docker run -e SESSION_SECRET=...
CMD ["node", ".output/server/index.mjs"]
