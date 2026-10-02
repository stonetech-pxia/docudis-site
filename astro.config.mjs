// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served by GitHub Pages at https://docudis.com/ (custom domain set in the repo's Pages settings).
// The app links to stonetech-pxia.github.io/docudis-site/privacy/, which GitHub redirects to
// /privacy/ here, so that path must keep working.
export default defineConfig({
	site: 'https://docudis.com',
	integrations: [
		starlight({
			title: 'Docudis',
			description: 'Remove personal details from documents on your phone before you ask AI.',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/starlight.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/stonetech-pxia/docudis-core' },
			],
			sidebar: [
				{
					label: 'Docudis',
					items: [
						{ label: 'Overview', slug: 'docs' },
						{ label: 'How your data is handled', slug: 'docs/privacy' },
					],
				},
				{
					label: 'Docudis Core',
					items: [
						{ label: 'Getting started', slug: 'docs/core' },
						{ label: 'Command line', slug: 'docs/core/cli' },
						{ label: 'C interface', slug: 'docs/core/c-abi' },
					],
				},
			],
		}),
	],
});
