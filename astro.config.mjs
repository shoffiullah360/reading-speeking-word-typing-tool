// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_CONFIG, isPublicLiveUrl } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
	site: SITE_CONFIG.origin,
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'de', 'fr'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	devToolbar: { enabled: false },
	integrations: [
		sitemap({
			filter: (page) => isPublicLiveUrl(page) && !page.includes('/typing-speed-test/play/'),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
