# Docudis site

The Docudis website, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) and served by GitHub Pages at https://stonetech-pxia.github.io/docudis-site/.

- `src/pages/index.astro`: the home page. Styles are in `src/styles/landing.css`.
- `src/content/docs/docs/`: documentation pages, served under `/docs/`.
- `public/privacy/index.html`: the privacy policy. The app links to `/docudis-site/privacy/`, so this path must keep working. Source of truth: `docs/store/privacy-policy/index.html` in [docudis-android](https://github.com/stonetech-pxia/docudis-android); copy it here to update.
- `privacy/index.html`: a copy of the policy for the old branch-based Pages setup. Delete it once Pages builds from GitHub Actions.

Every privacy statement on the site must match what the apps actually do. Check the app source before changing one.

## Develop

Requires Node.js 24.

```sh
npm install
npm run dev      # http://localhost:4321/docudis-site/
npm run build    # writes dist/
```

Pushing to `main` builds and deploys the site with `.github/workflows/deploy.yml`. In the repository settings, Pages must use **GitHub Actions** as its source.
