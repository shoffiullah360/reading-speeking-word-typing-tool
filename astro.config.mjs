// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_CONFIG, isPublicLiveUrl } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE_CONFIG.origin,
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => isPublicLiveUrl(page),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
