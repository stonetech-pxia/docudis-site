# Docudis site

The Docudis website, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) and served by GitHub Pages at https://docudis.com/.

- `src/pages/index.astro`: the home page. Styles are in `src/styles/landing.css`.
- `src/content/docs/docs/`: documentation pages, served under `/docs/`.
- `public/privacy/index.html`: the privacy policy. The app links to `stonetech-pxia.github.io/docudis-site/privacy/`, which GitHub redirects to `docudis.com/privacy/`, so this path must keep working. Source of truth: `docs/store/privacy-policy/index.html` in [docudis-android](https://github.com/stonetech-pxia/docudis-android); copy it here to update.
- `public/privacy/ios/index.html` and `public/privacy/desktop/index.html`: the privacy policies of the iPhone app and of the Windows and macOS app, maintained here.
- `public/CNAME`: the custom domain.

- `src/content/docs/docs/licenses.mdx`: the licenses of the third-party code and fonts the site ships, written by `scripts/generate-licenses.mjs`. Run it after changing dependencies.
- `public/fonts/`: the fonts the privacy policy loads, so it makes no third-party requests.

Every privacy statement on the site must match what the apps actually do. Check the app source before changing one.

## License

The site's code and text are licensed under the [Apache License 2.0](LICENSE), Copyright 2026 Pengda Xia (stonetech). The Docudis name and logo, the app screenshots in `public/img/` (which show third-party trademarks), and the privacy policy are not covered by that license. Third-party components keep their own licenses, listed on the site's open-source licenses page.

## Develop

Requires Node.js 24.

```sh
npm install
npm run dev      # http://localhost:4321/
npm run build    # writes dist/
```

Pushing to `main` builds and deploys the site with `.github/workflows/deploy.yml`. In the repository settings, Pages must use **GitHub Actions** as its source.
