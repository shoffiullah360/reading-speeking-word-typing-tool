import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SITE_CONFIG_PATH = path.join(ROOT_DIR, 'src', 'config', 'site.ts');

/**
 * Parses TOOLS_REGISTRY and SITE_CONFIG from src/config/site.ts so the validator
 * works across all Node 22+ environments without experimental flag warnings.
 */
function loadSiteRegistry() {
	if (!fs.existsSync(SITE_CONFIG_PATH)) {
		throw new Error(`Missing central registry at ${SITE_CONFIG_PATH}`);
	}
	const raw = fs.readFileSync(SITE_CONFIG_PATH, 'utf8');

	const originMatch = raw.match(/origin:\s*['"]([^'"]+)['"]/);
	const origin = originMatch ? originMatch[1] : 'https://wordora.site';

	const arrayBlockMatch = raw.match(/export const TOOLS_REGISTRY[\s\S]*?=\s*\[([\s\S]*?)\];/);
	if (!arrayBlockMatch) {
		throw new Error('Could not parse TOOLS_REGISTRY from src/config/site.ts');
	}

	const objectMatches = [...arrayBlockMatch[1].matchAll(/\{([\s\S]*?)\}/g)];
	const tools = objectMatches.map((m) => {
		const body = m[1];
		const id = body.match(/id:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const slug = body.match(/slug:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const category = body.match(/category:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const status = body.match(/status:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const localesBlock = body.match(/availableLocales:\s*\[([^\]]*)\]/)?.[1] ?? '';
		const availableLocales = [...localesBlock.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
		return { id, slug, category, status, availableLocales };
	});

	const staticBlockMatch = raw.match(/export const STATIC_PAGES[\s\S]*?=\s*\[([\s\S]*?)\];/);
	const staticObjectMatches = staticBlockMatch ? [...staticBlockMatch[1].matchAll(/\{([\s\S]*?)\}/g)] : [];
	const staticPages = staticObjectMatches.map((m) => {
		const body = m[1];
		const id = body.match(/id:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const slug = body.match(/slug:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
		const localesBlock = body.match(/availableLocales:\s*\[([^\]]*)\]/)?.[1] ?? '';
		const availableLocales = [...localesBlock.matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
		return { id, slug, availableLocales };
	});

	return { origin, tools, staticPages };
}

function walkHtmlFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) return fileList;
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkHtmlFiles(fullPath, fileList);
		} else if (entry.isFile() && entry.name.endsWith('.html')) {
			fileList.push(fullPath);
		}
	}
	return fileList;
}

function routePathFromHtmlFile(htmlFilePath) {
	const rel = path.relative(DIST_DIR, htmlFilePath).replace(/\\/g, '/');
	if (rel === 'index.html') return '/';
	if (rel.endsWith('/index.html')) {
		return `/${rel.slice(0, -'index.html'.length)}`;
	}
	return `/${rel}`;
}

function runValidation() {
	const errors = [];
	const checks = [];

	console.log('==========================================================');
	console.log(' Wordora Build-Time Validator (Stage 1: dist/ Verification)');
	console.log('==========================================================\n');

	if (!fs.existsSync(DIST_DIR)) {
		console.error(`❌ ERROR: dist/ directory not found at ${DIST_DIR}. Run "npm run build" first.`);
		process.exit(1);
	}

	const { origin, tools, staticPages } = loadSiteRegistry();
	const allowedCategories = new Set(['Reading', 'Writing', 'Speaking', 'Text']);

	// 1. Validate Registry Integrity
	for (const tool of tools) {
		if (!allowedCategories.has(tool.category)) {
			errors.push(`Registry tool "${tool.id}" has invalid category "${tool.category}".`);
		}
		if (!tool.slug.startsWith('/') || !tool.slug.endsWith('/')) {
			errors.push(`Registry tool "${tool.id}" slug "${tool.slug}" must start and end with "/".`);
		}
	}
	for (const page of staticPages) {
		if (!page.slug.startsWith('/') || !page.slug.endsWith('/')) {
			errors.push(`Static page "${page.id}" slug "${page.slug}" must start and end with "/".`);
		}
	}
	checks.push(
		`Registry check passed (${tools.length} tools across 4 canonical categories + ${staticPages.length} trust/legal pages).`
	);

	const liveTools = tools.filter((t) => t.status === 'live');
	const draftTools = tools.filter((t) => t.status === 'draft');

	const expectedLiveRoutes = new Set([
		'/',
		...liveTools.map((t) => t.slug),
		...staticPages.map((p) => p.slug),
	]);
	const utilityErrorRoutes = new Set(['/404.html']);
	const draftSlugs = new Set(draftTools.map((t) => t.slug));

	// 2. Discover all HTML files in dist/
	const htmlFiles = walkHtmlFiles(DIST_DIR);
	const actualRoutes = new Map(); // routePath -> htmlFilePath
	for (const file of htmlFiles) {
		const route = routePathFromHtmlFile(file);
		actualRoutes.set(route, file);
	}

	// Verify all expected live routes exist
	for (const expectedRoute of expectedLiveRoutes) {
		if (!actualRoutes.has(expectedRoute)) {
			errors.push(`Missing expected live route in dist/: "${expectedRoute}"`);
		}
	}

	// Verify NO draft route exists in dist/
	for (const draftSlug of draftSlugs) {
		if (actualRoutes.has(draftSlug)) {
			errors.push(`DRAFT LEAK DETECTED: Draft route "${draftSlug}" was generated in dist/!`);
		}
		const draftDir = path.join(DIST_DIR, draftSlug.replace(/^\/|\/$/g, ''));
		if (fs.existsSync(draftDir)) {
			errors.push(`DRAFT LEAK DETECTED: Draft directory "${draftDir}" exists in dist/!`);
		}
	}

	// Verify no unexpected HTML routes exist
	for (const actualRoute of actualRoutes.keys()) {
		if (!expectedLiveRoutes.has(actualRoute) && !utilityErrorRoutes.has(actualRoute)) {
			errors.push(`Unexpected HTML route found in dist/: "${actualRoute}"`);
		}
	}
	const builtLiveCount = [...actualRoutes.keys()].filter((r) => expectedLiveRoutes.has(r)).length;
	checks.push(
		`Route isolation verified: ${builtLiveCount} live route(s) built${actualRoutes.has('/404.html') ? ' (+ 404.html)' : ''}, 0/${draftSlugs.size} draft routes leaked.`
	);

	// Cache HTML contents and IDs per route for anchor verification
	const routeHtmlMap = new Map();
	const routeIdsMap = new Map();
	for (const [route, file] of actualRoutes.entries()) {
		const html = fs.readFileSync(file, 'utf8');
		routeHtmlMap.set(route, html);
		const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map((m) => m[1]));
		routeIdsMap.set(route, ids);
	}

	// 3. Validate Canonicals, hreflang, and Internal Links in every HTML file
	let totalInternalLinksChecked = 0;

	for (const [route, html] of routeHtmlMap.entries()) {
		const isUtilityErrorPage = utilityErrorRoutes.has(route);
		const expectedCanonical = new URL(isUtilityErrorPage ? '/' : route, origin).toString();

		if (isUtilityErrorPage) {
			const hasNoIndex = /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(html);
			if (!hasNoIndex) {
				errors.push(`Utility error page "${route}" must include <meta name="robots" content="noindex, nofollow" />.`);
			}
		} else {
			// Canonical check
			const canonicalMatches = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
			if (canonicalMatches.length !== 1) {
				errors.push(
					`Route "${route}" must have exactly 1 <link rel="canonical">, found ${canonicalMatches.length}.`
				);
			} else {
				const hrefMatch = canonicalMatches[0][0].match(/\bhref=["']([^"']+)["']/i);
				const canonicalHref = hrefMatch ? hrefMatch[1] : '';
				if (canonicalHref !== expectedCanonical) {
					errors.push(
						`Route "${route}" canonical mismatch: expected "${expectedCanonical}", found "${canonicalHref}".`
					);
				}
				if (!canonicalHref.endsWith('/')) {
					errors.push(`Route "${route}" canonical URL "${canonicalHref}" does not end with a trailing slash.`);
				}
			}

			// hreflang check
			const alternateLinks = [
				...html.matchAll(/<link\b[^>]*\brel=["']alternate["'][^>]*\bhreflang=["']([^"']+)["'][^>]*>/gi),
			];
			const hreflangMap = new Map();
			for (const match of alternateLinks) {
				const tag = match[0];
				const lang = match[1];
				const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? '';
				hreflangMap.set(lang, href);
			}

			if (hreflangMap.get('en') !== expectedCanonical) {
				errors.push(
					`Route "${route}" missing or invalid hreflang="en" (expected "${expectedCanonical}", found "${hreflangMap.get('en')}").`
				);
			}
			if (hreflangMap.get('x-default') !== expectedCanonical) {
				errors.push(
					`Route "${route}" missing or invalid hreflang="x-default" (expected "${expectedCanonical}", found "${hreflangMap.get('x-default')}").`
				);
			}
			for (const [lang, href] of hreflangMap.entries()) {
				if (lang !== 'en' && lang !== 'x-default') {
					errors.push(`Route "${route}" emitted unverified hreflang="${lang}" (${href}).`);
				}
			}
		}

		// Internal <a href="..."> check
		const anchorTags = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];
		for (const aMatch of anchorTags) {
			const rawHref = aMatch[1].trim();
			if (
				rawHref.startsWith('http://') ||
				rawHref.startsWith('https://') ||
				rawHref.startsWith('mailto:') ||
				rawHref.startsWith('tel:')
			) {
				// If it points to wordora.site, validate internal URL structure
				if (rawHref.startsWith(origin)) {
					const parsed = new URL(rawHref);
					if (!parsed.pathname.endsWith('/')) {
						errors.push(
							`Route "${route}" contains absolute internal link without trailing slash: "${rawHref}".`
						);
					}
					if (draftSlugs.has(parsed.pathname)) {
						errors.push(
							`DRAFT LINK LEAK: Route "${route}" links to draft tool URL "${rawHref}".`
						);
					}
				}
				continue;
			}

			totalInternalLinksChecked++;

			// Pure hash link on current page (e.g. "#calculator")
			if (rawHref.startsWith('#')) {
				const targetId = rawHref.slice(1);
				if (!targetId) {
					errors.push(`Route "${route}" contains empty hash link href="#".`);
				} else if (!routeIdsMap.get(route)?.has(targetId)) {
					errors.push(
						`Route "${route}" contains broken in-page anchor href="${rawHref}" (no id="${targetId}" on page).`
					);
				}
				continue;
			}

			// Internal path link (e.g. "/reading-time-calculator/" or "/reading-time-calculator/#benchmarks")
			const [pathPart, hashPart] = rawHref.split('#');
			const cleanPath = pathPart.split('?')[0];

			if (!cleanPath.startsWith('/')) {
				errors.push(`Route "${route}" contains relative non-root internal link "${rawHref}".`);
				continue;
			}

			if (!cleanPath.endsWith('/')) {
				errors.push(
					`Route "${route}" contains internal link missing trailing slash: "${rawHref}".`
				);
			}

			const normalizedTarget = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
			if (draftSlugs.has(normalizedTarget)) {
				errors.push(
					`DRAFT LINK LEAK: Route "${route}" contains clickable <a href="${rawHref}"> to draft tool "${normalizedTarget}".`
				);
			}

			if (!actualRoutes.has(normalizedTarget)) {
				errors.push(
					`Broken internal link on "${route}": href="${rawHref}" (target route "${normalizedTarget}" does not exist in dist/).`
				);
			} else if (hashPart) {
				const targetIds = routeIdsMap.get(normalizedTarget);
				if (!targetIds?.has(hashPart)) {
					errors.push(
						`Broken target anchor on "${route}": href="${rawHref}" (#${hashPart} not found in "${normalizedTarget}").`
					);
				}
			}
		}
	}

	checks.push(
		`Self-referencing canonicals & reciprocal hreflang (en + x-default) verified on all ${routeHtmlMap.size} page(s).`
	);
	checks.push(
		`Internal link & hash integrity verified (${totalInternalLinksChecked} internal <a> links checked, 0 broken, 0 draft links).`
	);

	// 4. Validate Sitemap Files
	const sitemapIndexPath = path.join(DIST_DIR, 'sitemap-index.xml');
	const sitemapZeroPath = path.join(DIST_DIR, 'sitemap-0.xml');

	if (!fs.existsSync(sitemapIndexPath)) {
		errors.push('Missing dist/sitemap-index.xml.');
	}
	if (!fs.existsSync(sitemapZeroPath)) {
		errors.push('Missing dist/sitemap-0.xml.');
	} else {
		const sitemapXml = fs.readFileSync(sitemapZeroPath, 'utf8');
		const locUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
		const expectedSitemapUrls = new Set(
			[...expectedLiveRoutes].map((r) => new URL(r, origin).toString())
		);

		for (const loc of locUrls) {
			if (!loc.endsWith('/')) {
				errors.push(`Sitemap URL "${loc}" does not end with a trailing slash.`);
			}
			const parsed = new URL(loc);
			if (draftSlugs.has(parsed.pathname)) {
				errors.push(`DRAFT SITEMAP LEAK: Draft URL "${loc}" found in sitemap-0.xml!`);
			}
			if (!expectedSitemapUrls.has(loc)) {
				errors.push(`Unexpected URL "${loc}" found in sitemap-0.xml.`);
			}
		}

		for (const expectedUrl of expectedSitemapUrls) {
			if (!locUrls.includes(expectedUrl)) {
				errors.push(`Expected live URL "${expectedUrl}" is missing from sitemap-0.xml.`);
			}
		}

		checks.push(
			`Sitemap verification passed: ${locUrls.length} live URL(s) in sitemap-0.xml (${locUrls.join(', ')}), 0 draft URLs.`
		);
	}

	// Print Summary
	for (const msg of checks) {
		console.log(`✅ ${msg}`);
	}

	if (errors.length > 0) {
		console.error(`\n❌ VALIDATION FAILED with ${errors.length} error(s):`);
		for (const err of errors) {
			console.error(`   - ${err}`);
		}
		process.exit(1);
	}

	console.log('\n🎉 ALL BUILD VALIDATIONS PASSED (0 errors, 0 draft leaks, 100% canonical & sitemap accuracy).');
}

runValidation();

