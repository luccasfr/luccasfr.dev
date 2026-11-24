# Production deployment

- Website: https://luccasfr.dev/
- Repository: https://github.com/luccasfr/luccasfr.dev (branch `master`).
- Coolify project: Lucas / production.
- Service: `luccasfr/landing`, UUID `fnrosmxnsbqcrz3xvpmc6mef`.
- Runtime: `debian-docker-03` (`jera-debian-eveo03` over SSH).
- Private origin: `http://100.103.252.10:9058`.
- Static root: `/srv/luccasfr-site`; release directories under `releases/`, `current` symlink, retained hashed assets under `shared/assets/`.
- Edge: Hostinger Traefik; exclusive router `/traefik/jera-cicd/config/traefik/services/luccasfr-site.yml` from `router.yml`.
- DNS: proxied apex A record `luccasfr.dev` → `92.113.38.139`. Previous target was `2.57.91.91`; a backup is retained on the edge at `/traefik/jera-cicd/config/luccasfr-site-dns-before.json`.

The service uses a third-party Nginx image pinned to the digest already validated on the runtime. It does not build or allocate a tenant registry image. Runtime image ID: `sha256:b252f703bfef51b61a4b369dfd6316b5acaa8f6b5eb0116b92de6fdc1aa42454`. Files are mounted read-only, the process runs as UID/GID 101, and the port binds only to the private Tailscale address. Coolify manages service lifecycle; source pushes alone do not publish new assets.

## Git-backed application

Create a Docker Compose application on `debian-docker-03` from `luccasfr/luccasfr.dev`, branch `master`, using the `lucas-personal-apps` GitHub App. Set Base Directory to `/infra/coolify` and Docker Compose Location to `/compose.yaml`. Enable **Deploy on push (webhooks)**.

The Compose application builds the site from the commit selected by Coolify and publishes it on the private address `http://100.103.252.10:9059`. Nginx serves the files bundled in the image and can still serve hashes from the previous static service. No public domain needs to be assigned to the Coolify application.

Verify the new origin before pointing the site's Traefik route at port `9059`. Keep port `9058` available during the cutover so the edge route can be reverted without a container restart. Confirm that a push to `master` shows up as a webhook deployment in Coolify.

## Updating the site

1. Run `bun run check-types` and `bun run build` locally.
2. Commit and push the source; use that commit SHA as the release directory name.
3. Archive `apps/web/dist/`, upload it to a new `/srv/luccasfr-site/releases/<sha>/`, and extract it there.
4. Copy new hashed assets to `/srv/luccasfr-site/shared/assets/` without deleting older hashes.
5. Switch `current` atomically using a temporary relative symlink and `mv -Tf`. The parent directory is mounted, so this needs no container restart.
6. Verify the HTML and assets against the local build over HTTPS; check missing paths return 404 and controls still work.

These steps apply to the original Coolify service on port `9058`. Its Compose configuration is managed in Coolify.

Traefik 3.2 watches the top-level config directory. After installing the exclusive route, touch `/traefik/jera-cicd/config/traefik/luccasfr-site-reload.marker` to trigger a reload. The marker must not have a YAML extension. Do not restart the shared proxy.

## Verification on 2026-11-08

Source release: `a03a11b`. Build and typecheck passed. The private origin is healthy; origin and public HTTPS return 200 with valid certificates. Browser checks passed for PT/EN, light/dark themes and command palette, with no console warnings or errors. Telyo router files retain their previous hashes. The edge proxy kept its original start time, `2026-10-28T17:39:06.228771004Z`.

Rollback: atomically point `current` at a previously validated release. The first deployment can also be reverted by restoring only the saved apex DNS record. Retain old release directories and shared hashes until the rollback window has ended.
