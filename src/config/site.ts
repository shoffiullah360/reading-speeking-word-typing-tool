export type ToolCategory = 'Reading' | 'Writing' | 'Speaking' | 'Text' | 'Typing Speed Test';
export type ToolStatus = 'live' | 'draft';
export type LocaleCode = 'en' | 'es' | 'pt';

export interface ToolDefinition {
	id: string;
	/** Section key inside src/i18n/*.json holding this page's translated copy. */
	dictKey: string;
	slug: `/${string}/`;
	name: string;
	shortName: string;
	description: string;
	category: ToolCategory;
	status: ToolStatus;
	availableLocales: LocaleCode[];
	metricPreview: string;
	badge?: string;
}

export interface StaticPageDefinition {
	id: string;
	/** Section key inside src/i18n/*.json holding this page's translated copy. */
	dictKey: string;
	slug: `/${string}/`;
	name: string;
	shortName: string;
	availableLocales: LocaleCode[];
}

export const SITE_CONFIG = {
	name: 'Wordora',
	tagline: 'Precision Reading, Writing, Speaking & Text Utilities',
	origin: 'https://wordora.site',
	defaultLocale: 'en' as LocaleCode,
	supportedLocales: ['en', 'es', 'pt'] as LocaleCode[],
	categories: ['Reading', 'Writing', 'Speaking', 'Text', 'Typing Speed Test'] as ToolCategory[],
	dropdownCategories: ['Reading', 'Writing', 'Speaking', 'Text'] as ToolCategory[],
} as const;

export const TOOLS_REGISTRY: ToolDefinition[] = [
	{
		id: 'reading-time-calculator',
		dictKey: 'readingTimeCalculator',
		slug: '/reading-time-calculator/',
		name: 'Reading Time Calculator & Counter',
		shortName: 'Reading Time Calculator',
		description:
			'Estimate exact silent reading duration (238 WPM) and read-aloud speech timing (183 WPM) from pasted text, word counts, or page counts with lexical difficulty analysis.',
		category: 'Reading',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '238 WPM Silent · 183 WPM Aloud',
		badge: 'Flagship',
	},
	{
		id: 'reading-speed-test',
		dictKey: 'readingSpeedTest',
		slug: '/reading-speed-test/',
		name: 'Reading Speed Test (WPM)',
		shortName: 'Reading Speed Test',
		description:
			'Measure your personal silent Words Per Minute (WPM) reading rate across calibrated non-fiction passages with a quick comprehension check.',
		category: 'Reading',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: 'Live WPM Timer · 238 WPM Avg',
	},
	{
		id: 'audiobook-speed-calculator',
		dictKey: 'audiobookCalculator',
		slug: '/audiobook-speed-calculator/',
		name: 'Audiobook Speed & Listening Time Calculator',
		shortName: 'Audiobook Speed Calculator',
		description:
			'Calculate exact audiobook listening duration across 0.75x to 3.0x playback speeds, time saved, and daily listening schedules by length or word count.',
		category: 'Reading',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '0.5x – 3.0x Playback Speed',
	},
	{
		id: 'words-to-pages',
		dictKey: 'wordsToPages',
		slug: '/words-to-pages/',
		name: 'Words to Pages Converter',
		shortName: 'Words to Pages',
		description:
			'Convert word counts into manuscript, academic, and book page totals across font families, point sizes, margin presets, and line spacings.',
		category: 'Writing',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '250 / 500 Words per Page',
	},
	{
		id: 'word-counter',
		dictKey: 'wordCounter',
		slug: '/word-counter/',
		name: 'Word & Character Counter',
		shortName: 'Word Counter',
		description:
			'Analyze real-time word frequency, character limits, sentence length distribution, and paragraph structure 100% locally in your browser.',
		category: 'Writing',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: 'Words · Chars · Sentences',
	},
	{
		id: 'speech-time-calculator',
		dictKey: 'speechCalculator',
		slug: '/speech-time-calculator/',
		name: 'Speech Time Calculator',
		shortName: 'Speech Time Calculator',
		description:
			'Calculate keynote, podcast, and presentation speaking duration with custom pause intervals, teleprompter pacing, and WPM cadence targets.',
		category: 'Speaking',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '100 – 220 WPM Cadence',
		badge: 'Flagship',
	},
	{
		id: 'random-topic-generator',
		dictKey: 'randomTopicGenerator',
		slug: '/random-topic-generator/',
		name: 'Random Topic & Prompt Generator',
		shortName: 'Random Topic Generator',
		description:
			'Generate thought-provoking writing prompts and speaking topics across Essay & Academic, Public Speaking & Debate, Creative Writing, and Blog & Content modes.',
		category: 'Speaking',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '4 Modes · Instant Prompts',
	},
	{
		id: 'case-converter',
		dictKey: 'caseConverter',
		slug: '/case-converter/',
		name: 'Case Converter',
		shortName: 'Case Converter',
		description:
			'Convert any text into Sentence case, lower case, UPPER CASE, Title Case, Capitalized Case, camelCase, snake_case, or kebab-case in one click.',
		category: 'Text',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '8 Case Modes · Instant Convert',
	},
	{
		id: 'text-repeater',
		dictKey: 'textRepeater',
		slug: '/text-repeater/',
		name: 'Text Repeater',
		shortName: 'Text Repeater',
		description:
			'Repeat any word, phrase, or block of text up to 10,000 times with custom separators, line breaks, and optional line numbering.',
		category: 'Text',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: 'Up to 10,000x · Custom Separators',
	},
	{
		id: 'text-reverser',
		dictKey: 'textReverser',
		slug: '/text-reverser/',
		name: 'Text Reverser & Flipper',
		shortName: 'Text Reverser',
		description:
			'Reverse entire text strings, reverse word order, mirror each word individually, or flip text upside down instantly in your browser.',
		category: 'Text',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '4 Flip & Reverse Modes',
	},
	{
		id: 'typing-speed-test',
		dictKey: 'typingSpeedTest',
		slug: '/typing-speed-test/',
		name: 'Typing Speed Test (WPM)',
		shortName: 'Typing Speed Test',
		description:
			'Test your typing speed in Words Per Minute (WPM), raw WPM, and keystroke accuracy across 15s, 30s, 60s, and 120s timed passages.',
		category: 'Typing Speed Test',
		status: 'live',
		availableLocales: ['en', 'es', 'pt'],
		metricPreview: '15s – 120s · Live WPM & Accuracy',
	},
];

export const STATIC_PAGES: StaticPageDefinition[] = [
	{
		id: 'about',
		dictKey: 'about',
		slug: '/about/',
		name: 'About Wordora',
		shortName: 'About',
		availableLocales: ['en', 'es', 'pt'],
	},
	{
		id: 'privacy-policy',
		dictKey: 'privacy',
		slug: '/privacy-policy/',
		name: 'Privacy Policy',
		shortName: 'Privacy Policy',
		availableLocales: ['en', 'es', 'pt'],
	},
	{
		id: 'terms-of-service',
		dictKey: 'terms',
		slug: '/terms-of-service/',
		name: 'Terms of Service',
		shortName: 'Terms of Service',
		availableLocales: ['en', 'es', 'pt'],
	},
	{
		id: 'contact',
		dictKey: 'contact',
		slug: '/contact/',
		name: 'Contact Us',
		shortName: 'Contact',
		availableLocales: ['en', 'es', 'pt'],
	},
];

/**
 * Ensures a pathname starts and ends with a single slash (e.g. "/" or "/reading-time-calculator/").
 */
export function normalizeTrailingSlashPath(pathname: string): string {
	if (!pathname || pathname === '/') return '/';
	const clean = pathname.split('?')[0].split('#')[0].trim();
	const withLeading = clean.startsWith('/') ? clean : `/${clean}`;
	return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Resolves the full canonical URL on https://wordora.site with guaranteed trailing slash.
 */
export function resolveCanonicalUrl(pathname: string): string {
	const normalizedPath = normalizeTrailingSlashPath(pathname);
	return new URL(normalizedPath, SITE_CONFIG.origin).toString();
}

/**
 * Returns only live tools that are publicly routable.
 */
export function getLiveTools(): ToolDefinition[] {
	return TOOLS_REGISTRY.filter((tool) => tool.status === 'live');
}

/**
 * Returns only draft tools (never routable, never linked, never in sitemap).
 */
export function getDraftTools(): ToolDefinition[] {
	return TOOLS_REGISTRY.filter((tool) => tool.status === 'draft');
}

/**
 * Lookup a tool by its ID.
 */
export function getToolById(id: string): ToolDefinition | undefined {
	return TOOLS_REGISTRY.find((tool) => tool.id === id);
}

/**
 * Lookup a tool by its normalized slug.
 */
export function getToolBySlug(pathname: string): ToolDefinition | undefined {
	const normalized = normalizeTrailingSlashPath(pathname);
	return TOOLS_REGISTRY.find((tool) => tool.slug === normalized);
}

/**
 * Prefixes a normalized `/slug/` path for a locale (`en` has no prefix).
 */
export function localizeSlug(slug: string, locale: LocaleCode): string {
	const normalized = normalizeTrailingSlashPath(slug);
	if (locale === SITE_CONFIG.defaultLocale) return normalized;
	return normalized === '/' ? `/${locale}/` : `/${locale}${normalized}`;
}

/**
 * Strips a leading `/es/` or `/pt/` prefix from a pathname.
 */
export function stripLocalePrefix(pathname: string): string {
	const normalized = normalizeTrailingSlashPath(pathname);
	for (const locale of SITE_CONFIG.supportedLocales) {
		if (locale === SITE_CONFIG.defaultLocale) continue;
		if (normalized === `/${locale}/`) return '/';
		if (normalized.startsWith(`/${locale}/`)) return normalized.slice(locale.length + 1);
	}
	return normalized;
}

/**
 * Returns the registry entry (tool or static page) for a locale-agnostic slug, or undefined.
 */
export function getPageEntry(slug: string): ToolDefinition | StaticPageDefinition | undefined {
	const normalized = normalizeTrailingSlashPath(slug);
	return (
		TOOLS_REGISTRY.find((tool) => tool.slug === normalized && tool.status === 'live') ??
		STATIC_PAGES.find((page) => page.slug === normalized)
	);
}

/**
 * Locales that are verified/built for a locale-agnostic slug ('/' is available in all locales).
 */
export function getAvailableLocalesForSlug(slug: string): LocaleCode[] {
	const normalized = normalizeTrailingSlashPath(slug);
	if (normalized === '/') return [...SITE_CONFIG.supportedLocales];
	return getPageEntry(normalized)?.availableLocales ?? [];
}

/**
 * Returns verified reciprocal hreflang links + x-default for a given (possibly localized) path.
 * Only locales listed in `availableLocales` are emitted; unknown routes emit nothing.
 */
export function getVerifiedHreflangLinks(pathname: string): Array<{ hreflang: string; href: string }> {
	const baseSlug = stripLocalePrefix(pathname);
	const locales = getAvailableLocalesForSlug(baseSlug);
	if (locales.length === 0) return [];

	const links: Array<{ hreflang: string; href: string }> = locales.map((locale) => ({
		hreflang: locale,
		href: resolveCanonicalUrl(localizeSlug(baseSlug, locale)),
	}));
	if (locales.includes(SITE_CONFIG.defaultLocale)) {
		links.push({
			hreflang: 'x-default',
			href: resolveCanonicalUrl(localizeSlug(baseSlug, SITE_CONFIG.defaultLocale)),
		});
	}
	return links;
}

/**
 * Returns the exact set of full canonical URLs permitted in the XML sitemap
 * (all verified locales). Strictly excludes any draft tool or unverified locale route.
 */
export function getAllowedSitemapUrls(): Set<string> {
	const allowed = new Set<string>();
	const add = (slug: string, locales: LocaleCode[]) => {
		for (const locale of locales) allowed.add(resolveCanonicalUrl(localizeSlug(slug, locale)));
	};
	add('/', [...SITE_CONFIG.supportedLocales]);
	for (const tool of getLiveTools()) add(tool.slug, tool.availableLocales);
	for (const page of STATIC_PAGES) add(page.slug, page.availableLocales);
	return allowed;
}

/**
 * Predicate used by @astrojs/sitemap filter to guarantee zero draft URLs enter the sitemap.
 */
export function isPublicLiveUrl(pageUrl: string): boolean {
	try {
		const parsed = new URL(pageUrl, SITE_CONFIG.origin);
		const normalizedFull = resolveCanonicalUrl(parsed.pathname);
		return getAllowedSitemapUrls().has(normalizedFull);
	} catch {
		return false;
	}
}
