# Production deployment

- [Website](https://luccasfr.dev/)
- [GitHub repository and branch](https://github.com/luccasfr/luccasfr.dev/tree/master)
- [Coolify application](http://coolify:8000/project/qg48g048o8sc0wow84o0044k/environment/bkw44k0w88gks8owc08gcocs/application/z2n905etvpy02kwpauopiqag) in Lucas / production on `debian-docker-03`
- Private origin `http://100.103.252.10:9059`

The `lucas-personal-apps` GitHub App delivers push events to Coolify. The application uses **Deploy on push (webhooks)** for `master`. Docker Compose uses base directory `/infra/coolify` and file `/compose.yaml`. Bun installs dependencies from the lockfile and builds the site into the pinned, unprivileged Nginx image.

After pushing to `master`, check Deployment Logs for the commit and the GitHub webhook trigger. Check `/health` and load the public site to verify the new version. Hostinger Traefik serves the public domain using the dedicated file `/traefik/jera-cicd/config/traefik/services/luccasfr-site.yml` from `router.yml`.

## Rollback

The previous Coolify service `luccasfr/landing` serves the last manual release at `http://100.103.252.10:9058`. For a rollback of the route, point only the site's Traefik backend at that address. The previous release remains under `/srv/luccasfr-site/current`. Its hashed assets remain available to the new application through the read-only mount from `/srv/luccasfr-site/shared`.

After replacing the site's route file, touch `/traefik/jera-cicd/config/traefik/luccasfr-site-reload.marker` to trigger Traefik's file watcher.
