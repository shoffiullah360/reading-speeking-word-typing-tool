/**
 * Wordora Post-Deployment Smoke Test (Stage 2: Live / Cloudflare Pages Verification)
 *
 * Usage:
 *   npm run smoke
 *   SITE_URL=https://wordora.site npm run smoke
 *   SITE_URL=https://preview.wordora.pages.dev npm run smoke
 */

const SITE_URL = (process.env.SITE_URL || 'https://wordora.site').replace(/\/+$/, '');

const LIVE_PATHS = ['/', '/reading-time-counter/', '/speech-time-calculator/'];
const DRAFT_PATHS = [
	'/reading-speed-test/',
	'/words-to-pages/',
	'/word-counter/',
];

async function runSmokeTest() {
	console.log('==========================================================');
	console.log(` Wordora Post-Deployment Smoke Test -> ${SITE_URL}`);
	console.log('==========================================================\n');

	const errors = [];

	// 1. Verify Live Routes return 200 OK and have valid canonicals + hreflang
	for (const routePath of LIVE_PATHS) {
		const url = `${SITE_URL}${routePath}`;
		try {
			const res = await fetch(url, { redirect: 'manual' });
			if (res.status !== 200) {
				errors.push(`Live route ${url} returned HTTP ${res.status} (expected 200).`);
				continue;
			}
			const html = await res.text();
			const expectedCanonical = `https://wordora.site${routePath}`;
			if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) {
				errors.push(`Live route ${url} missing expected canonical "${expectedCanonical}".`);
			}
			if (!html.includes(`hreflang="en" href="${expectedCanonical}"`)) {
				errors.push(`Live route ${url} missing hreflang="en".`);
			}
			if (!html.includes(`hreflang="x-default" href="${expectedCanonical}"`)) {
				errors.push(`Live route ${url} missing hreflang="x-default".`);
			}
			console.log(`✅ Live route 200 OK & SEO verified: ${url}`);
		} catch (err) {
			errors.push(`Failed to fetch live route ${url}: ${err.message}`);
		}
	}

	// 2. Verify Sitemap endpoints
	for (const sitemapPath of ['/sitemap-index.xml', '/sitemap-0.xml']) {
		const url = `${SITE_URL}${sitemapPath}`;
		try {
			const res = await fetch(url);
			if (res.status !== 200) {
				errors.push(`Sitemap ${url} returned HTTP ${res.status} (expected 200).`);
				continue;
			}
			const xml = await res.text();
			for (const draftPath of DRAFT_PATHS) {
				if (xml.includes(draftPath)) {
					errors.push(`Draft slug "${draftPath}" leaked into live sitemap ${url}!`);
				}
			}
			console.log(`✅ Sitemap 200 OK & draft-free: ${url}`);
		} catch (err) {
			errors.push(`Failed to fetch sitemap ${url}: ${err.message}`);
		}
	}

	// 3. Verify Draft Routes return 404 Not Found
	for (const draftPath of DRAFT_PATHS) {
		const url = `${SITE_URL}${draftPath}`;
		try {
			const res = await fetch(url, { redirect: 'manual' });
			if (res.status !== 404) {
				errors.push(
					`Draft route ${url} returned HTTP ${res.status} (expected 404 Not Found).`
				);
			} else {
				console.log(`✅ Draft route properly isolated (HTTP 404): ${url}`);
			}
		} catch (err) {
			errors.push(`Failed to check draft route ${url}: ${err.message}`);
		}
	}

	if (errors.length > 0) {
		console.error(`\n❌ SMOKE TEST FAILED with ${errors.length} error(s):`);
		for (const e of errors) {
			console.error(`   - ${e}`);
		}
		process.exit(1);
	}

	console.log('\n🎉 ALL POST-DEPLOYMENT SMOKE CHECKS PASSED!');
}

runSmokeTest();

