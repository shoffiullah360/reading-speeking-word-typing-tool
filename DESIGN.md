---
version: 2.0
name: Wordora Editorial Utility Design System
description: Clean, calm, human-centric editorial utility aesthetic built on Geist / Inter Sans-Serif typography. Prioritizes generous whitespace, natural sentence-case labels, subtle 1px dividers, and everyday human phrasing—free of artificial rainbow gradients, robotic monospace uppercase eyebrows, or nested "box-inside-a-box" containers.

colors:
  primary: "#09090b"
  on-primary: "#ffffff"
  ink: "#09090b"
  body: "#334155"
  mute: "#475569"
  faint: "#94a3b8"
  hairline: "#e2e8f0"
  hairline-soft: "#f1f5f9"
  canvas: "#f3f4f6"
  canvas-elevated: "#ffffff"
  canvas-muted: "#f8fafc"
  header-bg: "rgba(255, 255, 255, 0.92)"
  footer-bg: "#eaecef"
  footer-border: "#d1d5db"
  link: "#0070f3"
  link-deep: "#0761d1"
  link-soft: "#d3e5ff"
  error: "#ee0000"
  warning: "#f5a623"

typography:
  display-xl:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 48px
    fontWeight: 600
    lineHeight: 52px
    letterSpacing: -2px
  heading-lg:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 30px
    fontWeight: 600
    lineHeight: 38px
    letterSpacing: -0.8px
  heading-md:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 19px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: -0.3px
  label-md:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0
  body-lg:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 25px
    letterSpacing: 0
  body-md:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0
  body-sm:
    fontFamily: Geist, Inter, -apple-system, BlinkMacSystemFont, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0

rounded:
  none: 0px
  sm: 6px
  md: 12px
  lg: 16px
  pill-category: 64px
  pill: 100px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 64px
  4xl: 80px
---

## Overview

Wordora's design language is a calm, distraction-free editorial utility aesthetic designed for writers, editors, speakers, and students. The interface uses a layered surface hierarchy: a cool neutral page canvas (`#f3f4f6` in light mode, `#0a0a0a` in dark mode) paired with crisp pure white elevated workspaces (`#ffffff` in light mode, `#111111` in dark mode), distinct `1px` structural borders (`#e2e8f0` light / `#242424` dark), and soft multi-stop elevation shadows (`0 1px 3px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.03)`).

## Core Design Principles

### 1. Human-Readable Sans-Serif Typography (No Robotic Monospace or Forced Uppercase)
- **All UI labels, badges, metadata pills, table headers, and subheadings use Sans-Serif (`Geist` / `Inter`) in normal Sentence Case** (e.g., "Silent reading time", "Read aloud time", "Word & character count", "Reading level", "Speaking speed").
- **Never** use `font-mono` or `uppercase tracking-wider` on UI labels, section eyebrows, badges, or table columns.
- **Numeric Alignment:** Use `tabular-nums` on live numerical outputs, timers, WPM counters, and data tables so digits stay cleanly aligned without switching to a robotic monospace font.

### 2. Layered Surface Contrast & Framing
- **Page Canvas vs. Elevated Surfaces:** The Light Mode canvas (`#f3f4f6`) provides subtle contrast so pure white (`#ffffff`) tool cards, calculator workspaces, benchmark tables, and FAQ accordions pop with clarity.
- **Live vs. Draft Card Hierarchy:** Live tool cards sit on `#ffffff` with `#e2e8f0` borders, soft elevation shadow, and a tactile hover lift (`-translate-y-0.5`, border shifting to `#0f172a`, and deepened shadow). Draft (`Soon`) cards remain visually recessed (`#f8fafc` background with `#e2e8f0` border).
- **Distinct Header & Footer Framing:** `Header.astro` uses a translucent pure white surface (`rgba(255, 255, 255, 0.92)` with backdrop blur) and a crisp `#e2e8f0` bottom border. `Footer.astro` finishes the page with a grounded `#eaecef` surface and a `#d1d5db` top border.
- **No Artificial Hero Gradients or "Box Inside a Box" Nesting:** Hero sections sit directly on the clean canvas (`bg-canvas`) without `.vercel-mesh-hero` rainbow washes. Avoid wrapping every badge or sub-stat in its own nested box inside a parent card.

### 3. Natural, Everyday Copy (Zero AI Jargon)
- Write like a clear, helpful human editor—not a spec sheet or marketing pitch.
- Prefer "Word & character count", "Reading level", "Runs privately in your browser", and "Common questions" over robotic phrasing like "Volume Metrics", "Lexical difficulty", "Zero-Latency Client-Side Engine", or "Reference Specification".

## Color Tokens

### Light Mode (Default)
- **Canvas:** `#f3f4f6` (`--c-canvas`)
- **Elevated Workspace / Cards:** `#ffffff` (`--c-canvas-elevated`)
- **Muted / Draft Card Surface:** `#f8fafc` (`--c-canvas-muted`)
- **Header Surface:** `rgba(255, 255, 255, 0.92)` (`--c-header-bg`) with `backdrop-blur-md` and `#e2e8f0` bottom border
- **Footer Surface:** `#eaecef` (`--c-footer-bg`) with `#d1d5db` (`--c-footer-border`) top border
- **Primary / Ink (Obsidian Black):** `#09090b` (`--c-ink` / `--c-primary`)
- **Body Copy (Rich Dark Slate):** `#334155` (`--c-body`)
- **Muted Text:** `#475569` (`--c-mute`)
- **Faint / Placeholder:** `#94a3b8` (`--c-faint`)
- **Structural Hairline:** `#e2e8f0` (`--c-hairline`)
- **Soft Hover Fill:** `#f1f5f9` (`--c-hairline-soft`)
- **Card Elevation Shadow:** `0 1px 3px rgba(15, 23, 42, 0.05), 0 4px 12px rgba(15, 23, 42, 0.03)`

### Dark Mode (`.dark`)
- **Canvas:** `#0a0a0a`
- **Elevated Workspace:** `#111111`
- **Primary / Ink:** `#ededed`
- **Body Copy:** `#a1a1a1`
- **Muted Text:** `#878787`
- **Faint / Placeholder:** `#666666`
- **Structural Hairline:** `#242424`
- **Soft Hover Fill:** `#161616`
