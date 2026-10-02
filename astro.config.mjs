// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Served by GitHub Pages at https://stonetech-pxia.github.io/docudis-site/.
// The app links to /docudis-site/privacy/, so that path must keep working.
export default defineConfig({
	site: 'https://stonetech-pxia.github.io',
	base: '/docudis-site',
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
