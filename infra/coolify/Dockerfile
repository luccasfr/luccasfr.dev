FROM oven/bun:1.4.2 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml turbo.json tsconfig.json ./
COPY apps/web apps/web
COPY packages packages
RUN bun install --frozen-lockfile
RUN bun run build

FROM docker.io/nginxinc/nginx-unprivileged@sha256:e2a8fca8aa356d66159aaf8a877a9c126773635adf210503eefaaeaffeed6ad7
COPY infra/coolify/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/apps/web/dist/ /srv/luccasfr-site/current/
EXPOSE 8080
