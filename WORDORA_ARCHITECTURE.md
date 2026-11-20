# Wordora Architecture & Project Blueprint

## Overview

Wordora (`https://wordora.site`) is an editorial utility platform built on Astro 7 and Tailwind CSS v4. The platform provides fast, client-side, privacy-focused utilities for reading, writing, speaking, and text manipulation.

---

## 1. Routing System (`src/pages/` & `[lang]`)

The site uses directory-based routing (`build.format: 'directory'`) with strict trailing slash enforcement (`trailingSlash: 'always'`). Every internal route, canonical URL, and internal link must end with a trailing slash `/`.

### Route Resolution Flow

```text
Incoming Request
│
├── "/"                            -> src/pages/index.astro
│
├── "/<tool-slug>/"                -> src/pages/<tool-slug>/index.astro
│   (Default English)
│
├── "/typing-speed-test/play/"     -> src/pages/typing-speed-test/play/index.astro
│   (Interactive timed arena)
│
├── "/es/" or "/pt/"               -> src/pages/[lang]/[...slug].astro (slug: undefined)
│
├── "/es/<slug>/" or "/pt/<slug>/" -> src/pages/[lang]/[...slug].astro (slug: "<slug>")
│
├── "/<lang>/typing-speed-test/play/" -> src/pages/[lang]/typing-speed-test/play/index.astro
│
└── Unmatched URL                  -> src/pages/404.astro
```

### Route Generation Mechanics

* **Default English Routes (`src/pages/<tool-slug>/index.astro`)**:
  * English is served at the domain root without a locale prefix (`prefixDefaultLocale: false` in `astro.config.mjs`).
  * Each tool page is a lightweight entrypoint (3–5 lines of code) importing and rendering its corresponding view from `src/views/`.

* **Localized Dynamic Routes (`src/pages/[lang]/[...slug].astro`)**:
  * Powered by `getStaticPaths()`.
  * Queries `TOOLS_REGISTRY` (for live tools) and `STATIC_PAGES` from `src/config/site.ts`.
  * Emits routes only for locales verified in `availableLocales` (e.g. `es`, `pt`).
  * Passes `dictKey` as a prop to resolve the view dynamically via `src/views/index.ts`.

* **Special Sub-Routes**:
  * `/typing-speed-test/play/` and its localized equivalents (`/es/typing-speed-test/play/`, `/pt/typing-speed-test/play/`) provide an isolated, distraction-free typing arena.
  * These routes are explicitly configured with `robots: "noindex, follow"` and excluded from sitemaps via the sitemap filter in `astro.config.mjs`.

* **Route Mapping Table**:

| Route Path | File Location | Purpose | Sitemap Status |
| :--- | :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Homepage (English) | Indexed |
| `/<tool-slug>/` | `src/pages/<tool-slug>/index.astro` | Tool landing page (English) | Indexed |
| `/[lang]/` | `src/pages/[lang]/[...slug].astro` | Homepage (Spanish/Portuguese) | Indexed |
| `/[lang]/<tool-slug>/` | `src/pages/[lang]/[...slug].astro` | Tool page (Spanish/Portuguese) | Indexed |
| `/typing-speed-test/play/` | `src/pages/typing-speed-test/play/index.astro` | Timed typing interface | Noindex / Excluded |
| `/[lang]/typing-speed-test/play/` | `src/pages/[lang]/typing-speed-test/play/index.astro` | Localized timed typing interface | Noindex / Excluded |
| `/404/` | `src/pages/404.astro` | Not found fallback page | Noindex / Excluded |

---

## 2. Architecture Layers

Wordora separates routing, layout orchestration, UI widgets, and styling into distinct layers:

```text
src/pages/ (Thin Routing Entrypoint)
   │
   ▼
src/views/ (Orchestrator: SEO, Schema, i18n, Layout Wrapping)
   │
   ├──> src/layouts/Layout.astro (Head, SEO tags, Fonts, FOUC Script)
   │       └──> src/styles/global.css (Tokens, Tailwind, Scoped CSS)
   │
   ├──> src/components/Header.astro (Navigation & Category Dropdowns)
   │       └──> src/components/LanguageSwitcher.astro
   │
   ├──> src/components/<ToolComponent>.astro (Interactive Client Workspace)
   │
   ├──> src/components/RelatedTools.astro (Topical Interlinking Grid)
   │       └──> src/components/ToolLinkCard.astro
   │
   └──> src/components/Footer.astro (Footer Directory & Legal Links)
```

### Layer Responsibilities

1. **Pages (`src/pages/`)**:
   * Pure routing entrypoints for Astro's file-system router.
   * Contain no presentation markup or business logic.

2. **Views (`src/views/`)**:
   * Registered in `src/views/index.ts` keyed by `dictKey`.
   * Resolve current locale from `Astro.url` using `getLocaleFromUrl()`.
   * Initialize translation functions with `useTranslations(locale)`.
   * Resolve canonical URLs using `resolveCanonicalUrl()`.
   * Construct structured JSON-LD schemas (`SoftwareApplication`, `FAQPage`).
   * Assemble page structure: `<Layout>`, `<Header>`, `<InteractiveTool>`, editorial sections/tables, FAQ accordions, `<RelatedTools>`, and `<Footer>`.

3. **Components (`src/components/`)**:
   * Contain interactive workspaces, client-side scripts, state logic, and visual components.
   * Handle user events, local storage persistence, DOM updates, and client-side calculations.

4. **Layout (`src/layouts/Layout.astro`)**:
   * Defines the HTML document skeleton (`<!doctype html>`, `<html lang={locale}>`).
   * Renders `<head>` meta tags: title, meta description, self-referencing canonical URL, and verified reciprocal `hreflang` tags + `x-default`.
   * Loads the `Geist` font family via Google Fonts.
   * Injects an inline theme script preventing Flash of Unstyled Content (FOUC).
   * Imports `src/styles/global.css`.

---

## 3. i18n, Central Registry, Interlinking & Validation

### Central Registry (`src/config/site.ts`)

`src/config/site.ts` is the single source of truth for all tools and static pages:

* **`TOOLS_REGISTRY`**: Array of tool definitions with properties:
  * `id`: Unique tool identifier (e.g., `'typing-speed-test'`).
  * `dictKey`: Key pointing to translations in `src/i18n/*.json`.
  * `slug`: Normalized path ending with a trailing slash (e.g., `'/typing-speed-test/'`).
  * `name`: Full title for headings and schema markup.
  * `shortName`: Compact title for navigation bars and footer links.
  * `description`: Meta description and search snippets.
  * `category`: One of the 5 supported categories: `'Reading'`, `'Writing'`, `'Speaking'`, `'Text'`, `'Typing Speed Test'`.
  * `status`: `'live'` (publicly accessible) or `'draft'` (strictly non-routable).
  * `availableLocales`: Array of supported language codes (`'en'`, `'es'`, `'pt'`).
  * `metricPreview`: Short badge text (e.g., `'15s – 120s · Live WPM'`).
  * `badge`: Optional badge label (e.g., `'Flagship'`).

* **Registry Utility Functions**:
  * `resolveCanonicalUrl(path)`: Returns the absolute URL on `https://wordora.site` with trailing slash.
  * `localizeSlug(slug, locale)`: Prefixes paths for non-default languages.
  * `getVerifiedHreflangLinks(path)`: Returns reciprocal alternate links only for languages listed in `availableLocales`.
  * `getAllowedSitemapUrls()` & `isPublicLiveUrl(url)`: Feed the `@astrojs/sitemap` integration to block draft tools and auxiliary routes.

### Internationalization (`src/i18n/`)

* **Translation Files**: `src/i18n/en.json`, `es.json`, `pt.json`.
* **Translation Engine (`src/i18n/ui.ts`)**:
  * `useTranslations(locale)`: Provides `t(key)` for string lookups and `t.raw<T>(key)` for objects/arrays.
  * Automatic English Fallback: If a key is missing in `es.json` or `pt.json`, it falls back to the English value instead of breaking.
  * `localizeHtmlLinks(html, locale)`: Automatically rewrites internal links in editorial or FAQ markup to retain the active language prefix.
  * `LanguageSwitcher.astro`: Inspects `getAvailableLocalesForSlug()`. If a page is only available in English, selecting Spanish or Portuguese safely routes to that locale's homepage (`/es/` or `/pt/`).

### Topical Interlinking (`src/config/related.ts`)

* Provides automated interlinking rendered by `<RelatedTools toolId={...} locale={...} />`.
* `TOPICAL_CLUSTERS`: Defines the 2 closest complementary tools for each tool.
* `SPOTLIGHT_TOOL_IDS`: Points to popular spotlight tools (`random-topic-generator`, `typing-speed-test`).
* `getRelatedToolIds(toolId)`: Resolves exactly 4 unique tool cards per page without self-linking.

### Build-Time Validator (`scripts/validate-build.mjs`)

Executed during `npm run validate` following `npm run build`. Enforces strict quality and SEO gates across `dist/`:

1. **Registry Verification**: Confirms all categories are valid and all slugs start and end with `/`.
2. **Route Isolation**: Ensures all live routes exist and confirms that 0 draft tool routes or directories exist in `dist/`.
3. **Noindex Verification**: Confirms `/404.html` and play routes contain `noindex` robots tags.
4. **Canonical & hreflang Integrity**: Validates that every HTML page contains exactly one self-referencing canonical URL and matching reciprocal `hreflang` tags + `x-default`.
5. **Link & Anchor Integrity**: Scans every `<a href>` tag in all HTML files:
   * Checks for trailing slashes on internal links.
   * Verifies that target routes exist in `dist/`.
   * Verifies in-page anchor IDs exist on target pages.
   * Fails if any link points to a draft tool.
6. **Sitemap Integrity**: Verifies that `sitemap-0.xml` matches expected live URLs with 0 draft leaks.

---

## 4. Styling & Design Rules

Guidelines are defined in `DESIGN.md`, `AGENTS.md`, and `src/styles/global.css`.

### Design Principles

* **No Robotic Monospace or Forced Uppercase**:
  * UI labels, category badges, metadata pills, section eyebrows, and table headers must use Sans-Serif (`Geist` / `Inter`) in standard Sentence Case.
  * Never use `font-mono` or `uppercase tracking-wider` for UI chrome.
  * Use `tabular-nums` on counters, live timers, WPM outputs, and data tables to preserve numeric column alignment.
* **Non-Containerized, Calm Layout**:
  * Avoid heavy nested container boxes ("box-inside-a-box").
  * Do not use rainbow mesh hero gradients (`.vercel-mesh-hero`). Sections sit directly on the clean page canvas.
  * Rely on generous whitespace, subtle 1px structural hairlines, and soft elevation shadows.
* **Mobile-First Geometry (320px–430px)**:
  * Form inputs, selects, and textareas must have at least `16px` font size below `768px` to prevent iOS automatic zoom.
  * Touch targets must be at least `44px` tall on mobile devices.
  * Segmented controls, preset buttons, and category pills must wrap rather than clip.

### Color Tokens

| Token / Element | Light Mode | Dark Mode (`.dark`) | Purpose |
| :--- | :--- | :--- | :--- |
| Canvas (`bg-canvas`) | `#F8FAF9` / `#E8EDF3` | `#121214` / `#0a0a0a` | Full page background |
| Elevated Workspace / Card | `#FFFFFF` / `#F3F6FA` | `#1A1A1E` / `#111111` | Primary tool workspaces & cards |
| Nested Surface / Table Header | `#F1F5F3` / `#DCE3EC` | `#232329` | Inactive tabs, table headers, kbd tags |
| Primary Ink (`text-ink`) | `#0F172A` | `#FAFAFA` / `#ededed` | Headings, primary text |
| Body Text (`text-body`) | `#334155` / `#2D3B4E` | `#D4D4D8` / `#a1a1a1` | Descriptive paragraphs, explanations |
| Muted Text (`text-mute`) | `#475569` / `#5B6B80` | `#A1A1AA` / `#878787` | Footnotes, minor labels |
| Structural Hairline | `#E2E8E5` / `#C4CFDD` | `#2E2E36` / `#242424` | 1px borders, card dividers |
| Emerald Stage (Accent) | `#0F2E26` | `#FAFAFA` | Result summary bars, primary hero panels |
| Mint Readout (Accent) | `#AFE3D0` | `#121214` | Readout digits, active mode pills |
