# Wordora (`https://wordora.site`) — Agent Architecture & Governance Rules

## 1. Development Server

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## 2. Design Language & Aesthetic Mandate

All UI, typography, color tokens, elevation, and component geometry MUST strictly follow `DESIGN.md`:
- **Palette:** Soft slate-mist canvas (`#E8EDF3` light / `#0a0a0a` dark), elevated workspace & card surface (`#F3F6FA` light / `#111111` dark), nested surface & table header (`#DCE3EC` light / `rgba(17,17,17,0.6)` dark), deep slate ink (`#0F172A` light / `#ededed` dark), and 1px structural hairlines (`#C4CFDD` light / `#242424` dark). Zero pure white (`#FFFFFF`) in Light Mode.
- **No Robotic Monospace or Forced Uppercase:** Never use `font-mono` or `uppercase tracking-wider` on UI labels, badges, metadata pills, table headers, or subheadings. Use clean, human-readable Sans-Serif typography (`Geist` / `Inter`) in normal Sentence Case everywhere (e.g., "Silent reading time", "Read aloud time", "Word & character count", "Reading level"). Reserve `tabular-nums` for live numerical outputs and tables so digits stay aligned.
- **Clean, Non-Containerized Layout:** Never use `.vercel-mesh-hero` rainbow gradient backgrounds or extra empty horizontal border bands below the hero. Avoid heavy nested container boxes ("box inside a box")—use generous whitespace, soft subtle borders, and clean horizontal dividers.
- **Natural, Everyday Copy:** Write clear, human-centric copy ("Word & character count", "Reading level", "Runs privately in your browser") and avoid robotic AI/tech jargon ("Volume Metrics", "Lexical difficulty", "Zero-Latency Client-Side Engine").

## 3. Multi-Tool Taxonomy (4 Canonical Categories)

Every utility in the Wordora ecosystem MUST belong to one of these four exact categories:
1. `Reading`
2. `Writing`
3. `Speaking`
4. `Text`

Do not invent additional categories without explicit user approval.

## 4. Content & Anti-Bloat Rules for Tool Pages

- **Flagship Preservation (`/reading-time-counter/`):** The existing Reading Time Calculator page retains its complete feature set (Paste Text, Word Count, Pages Count tabs, `.txt` drag-and-drop upload, Silent/Read-Aloud WPM sliders, Benchmark Table, and FAQ section) 100% intact.
- **Future New Tool Pages:** Do **NOT** auto-generate filler SEO articles, generic benchmark tables, or boilerplate FAQ walls on future new tool pages. Each new tool page must focus on a crisp interactive utility workspace plus a clean commented slot (`{/* Editorial Content & FAQ Slot — User Managed */}`) so editorial content can be curated manually when desired.

## 5. URL Structure, Canonical, `hreflang`, & Sitemap Rules

- **Production Origin:** `https://wordora.site`
- **Trailing Slash Policy:** `trailingSlash: 'always'` is strictly enforced in `astro.config.mjs`. Every internal route, `<a href="...">` link, `<link rel="canonical">`, `hreflang` link, and sitemap entry MUST end with a trailing slash `/` (before any `#hash` fragment).
- **Self-Referencing Canonicals:** Every page must output a self-referencing `<link rel="canonical" href="https://wordora.site/.../" />`.
- **Verified `hreflang` Only:** Reciprocal `<link rel="alternate" hreflang="..." />` and `hreflang="x-default"` tags must only be emitted for locales verified in `availableLocales` within `src/config/site.ts` (currently `['en']`). Never emit `hreflang` tags pointing to unbuilt or non-existent locale routes.

## 6. Central Registry & Strict Draft Protection (`src/config/site.ts`)

`src/config/site.ts` is the single source of truth for all tools (`status: 'live' | 'draft'` and `availableLocales`).
- **Draft Isolation Rule:** Any tool with `status: 'draft'` MUST NEVER:
  1. Have a routable page in `src/pages/` or `dist/`.
  2. Render as a clickable `<a href="...">` link anywhere in the UI (Header, Footer, Homepage Directory, or internal callout blocks). Draft tools may only appear as non-clickable cards/spans (`aria-disabled="true"`) with a `Soon` badge.
  3. Appear in `sitemap-index.xml` or `sitemap-0.xml`.
- **Pre-Release Validation:** Always run `npm run build` followed by `npm run validate` before concluding any architectural or tool-page task.

## 7. Astro Documentation Reference

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:
- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/basics/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
