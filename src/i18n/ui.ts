import en from './en.json';
import es from './es.json';
import pt from './pt.json';

export const languages = { en: 'EN', es: 'ES', pt: 'PT' } as const;
export const languageNames = { en: 'English', es: 'Español', pt: 'Português' } as const;
export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';
export const locales = Object.keys(languages) as Locale[];
/** Locales that are served under a URL prefix (everything except the default). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

const dictionaries: Record<Locale, unknown> = { en, es, pt };

function isLocale(value: string | undefined): value is Locale {
	return !!value && value in languages;
}

/** Detects `es` or `pt` from the first pathname segment, defaulting to `en`. */
export function getLocaleFromUrl(url: URL): Locale {
	const [, first] = url.pathname.split('/');
	return isLocale(first) && first !== defaultLocale ? first : defaultLocale;
}

/** Removes a leading `/es/` or `/pt/` prefix and returns a normalized `/slug/` path. */
export function stripLocale(path: string): string {
	const { pathname } = splitPath(path);
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length && (prefixedLocales as readonly string[]).includes(segments[0])) segments.shift();
	return segments.length ? `/${segments.join('/')}/` : '/';
}

function splitPath(path: string): { pathname: string; suffix: string } {
	const idx = path.search(/[?#]/);
	return idx === -1
		? { pathname: path, suffix: '' }
		: { pathname: path.slice(0, idx), suffix: path.slice(idx) };
}

/**
 * Returns the trailing-slash path for a locale:
 * `/` or `/slug/` for `en`; `/es/`, `/es/slug/`, `/pt/`, `/pt/slug/` otherwise.
 * Query strings and #hash fragments are preserved.
 */
export function getLocalizedPath(path: string, locale: Locale): string {
	const { suffix } = splitPath(path);
	const base = stripLocale(path);
	const localized = locale === defaultLocale ? base : base === '/' ? `/${locale}/` : `/${locale}${base}`;
	return localized + suffix;
}

/** Shorthand used by components: localize a path for the page currently being rendered. */
export function localePath(path: string, url: URL): string {
	return getLocalizedPath(path, getLocaleFromUrl(url));
}

/**
 * Rewrites internal `href="/slug/"` links inside trusted HTML strings (e.g. FAQ answers)
 * so they stay in the visitor's language. Utility routes such as the typing arena are left alone.
 */
export function localizeHtmlLinks(html: string, locale: Locale): string {
	return html.replace(/href="(\/(?:[a-z0-9-]+\/)*(?:#[^"]*)?)"/g, (match, path: string) =>
		path.startsWith('/typing-speed-test/play/') ? match : `href="${getLocalizedPath(path, locale)}"`,
	);
}

function lookup(source: unknown, key: string): unknown {
	let node: unknown = source;
	for (const part of key.split('.')) {
		if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
			node = (node as Record<string, unknown>)[part];
		} else {
			return undefined;
		}
	}
	return node;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
	return !!v && typeof v === 'object' && !Array.isArray(v);
}

function deepMergeFallback(base: unknown, override: unknown): unknown {
	if (override === undefined) return base;
	if (!isPlainObject(base) || !isPlainObject(override)) return override;
	const merged: Record<string, unknown> = { ...base };
	for (const k of Object.keys(override)) {
		merged[k] = deepMergeFallback(base[k], override[k]);
	}
	return merged;
}

function resolve(locale: Locale, key: string): unknown {
	const fallback = lookup(dictionaries[defaultLocale], key);
	if (locale === defaultLocale) return fallback;
	const localized = lookup(dictionaries[locale], key);
	return deepMergeFallback(fallback, localized);
}

export interface Translator {
	/** Returns a string, falling back to English and finally to the key itself (never throws). */
	(key: string, vars?: Record<string, string | number>): string;
	/** Returns arrays/objects (e.g. FAQ lists) with the same English fallback. */
	raw<T = unknown>(key: string): T | undefined;
}

export function useTranslations(locale: Locale): Translator {
	const t = ((key: string, vars?: Record<string, string | number>) => {
		const value = resolve(locale, key);
		if (typeof value !== 'string') return key;
		return vars
			? value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`))
			: value;
	}) as Translator;
	t.raw = <T,>(key: string) => resolve(locale, key) as T | undefined;
	return t;
}
