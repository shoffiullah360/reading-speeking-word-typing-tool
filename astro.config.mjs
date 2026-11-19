// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_CONFIG, isPublicLiveUrl } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://wordora.site',
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'pt'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	devToolbar: { enabled: false },
	integrations: [
		sitemap({
			i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es', pt: 'pt' } },
			filter: (page) => isPublicLiveUrl(page) && !page.includes('/typing-speed-test/play/'),
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
