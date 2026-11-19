---
version: 2.0
name: Wordora Editorial Utility Design System
description: Clean, calm, human-centric editorial utility aesthetic built on Geist / Inter Sans-Serif typography. Prioritizes generous whitespace, natural sentence-case labels, subtle 1px dividers, and everyday human phrasing—free of artificial rainbow gradients, robotic monospace uppercase eyebrows, or nested "box-inside-a-box" containers.

colors:
  primary: "#0F172A"
  on-primary: "#F3F6FA"
  ink: "#0F172A"
  body: "#2D3B4E"
  mute: "#5B6B80"
  faint: "#8292A6"
  hairline: "#C4CFDD"
  hairline-soft: "#DCE3EC"
  canvas: "#E8EDF3"
  canvas-elevated: "#F3F6FA"
  canvas-muted: "#DCE3EC"
  card: "#F3F6FA"
  surface: "#DCE3EC"
  header-bg: "rgba(232, 237, 243, 0.88)"
  footer-bg: "#DCE3EC"
  footer-border: "#C4CFDD"
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

Wordora's design language is a calm, distraction-free editorial utility aesthetic designed for writers, editors, speakers, and students. The interface uses a layered surface hierarchy with zero pure white glare in Light Mode: a soothing slate-mist page canvas (`#E8EDF3` in light mode, `#0a0a0a` in dark mode) paired with soft tinted ice-slate elevated workspaces (`#F3F6FA` in light mode, `#111111` in dark mode), distinct `1px` structural borders (`#C4CFDD` light / `#242424` dark), and tactile elevation shadows (`0 2px 6px rgba(15, 23, 42, 0.06)`).

## Core Design Principles

### 1. Human-Readable Sans-Serif Typography (No Robotic Monospace or Forced Uppercase)
- **All UI labels, badges, metadata pills, table headers, and subheadings use Sans-Serif (`Geist` / `Inter`) in normal Sentence Case** (e.g., "Silent reading time", "Read aloud time", "Word & character count", "Reading level", "Speaking speed").
- **Never** use `font-mono` or `uppercase tracking-wider` on UI labels, section eyebrows, badges, or table columns.
- **Numeric Alignment:** Use `tabular-nums` on live numerical outputs, timers, WPM counters, and data tables so digits stay cleanly aligned without switching to a robotic monospace font.

### 2. Layered Surface Contrast & Framing
- **Page Canvas vs. Elevated Surfaces:** The Light Mode canvas (`#E8EDF3`) provides subtle contrast so ice-slate (`#F3F6FA`) tool cards, calculator workspaces, benchmark tables, and FAQ accordions pop with clarity and zero white glare.
- **Live vs. Draft Card Hierarchy:** Live tool cards sit on `#F3F6FA` with `#C4CFDD` borders, soft elevation shadow (`0 2px 6px rgba(15, 23, 42, 0.06)`), and a tactile hover lift (`-translate-y-0.5`, border shifting to `#0F172A`, and deepened shadow). Draft (`Soon`) cards remain visually recessed (`#DCE3EC` background with `#C4CFDD` border).
- **Distinct Header & Footer Framing:** `Header.astro` uses a translucent mist surface (`rgba(232, 237, 243, 0.88)` with backdrop blur) and a crisp `#C4CFDD` bottom border. `Footer.astro` finishes the page with a grounded `#DCE3EC` surface and a `#C4CFDD` top border.
- **No Artificial Hero Gradients or "Box Inside a Box" Nesting:** Hero sections sit directly on the clean canvas (`bg-canvas`) without `.vercel-mesh-hero` rainbow washes. Avoid wrapping every badge or sub-stat in its own nested box inside a parent card.

### 3. Natural, Everyday Copy (Zero AI Jargon)
- Write like a clear, helpful human editor—not a spec sheet or marketing pitch.
- Prefer "Word & character count", "Reading level", "Runs privately in your browser", and "Common questions" over robotic phrasing like "Volume Metrics", "Lexical difficulty", "Zero-Latency Client-Side Engine", or "Reference Specification".

### 4. Mobile-First Behavior (320px–430px)
- **No horizontal scrolling anywhere.** `html`/`body` clip sideways overflow, flex and grid children shrink (`min-w-0`, `max-w-full`), and wide benchmark tables keep their own `overflow-x-auto` wrapper.
- **Form fields never trigger iOS auto-zoom.** Every `input`, `select`, and `textarea` renders at least `16px` below `768px`; desktop type sizes are unchanged.
- **Touch targets:** header controls, drawer rows, and primary actions are at least `44px` tall on phones.
- **Segmented tab bars, filter pills, and preset chips wrap** instead of clipping, so labels stay fully readable at `320px`.
- **Typing arena:** while the on-screen keyboard is open, non-essential chrome (mode/stat strips, desktop shortcut hints) collapses so the timer, progress bar, and active word lines stay visible above the keyboard.

## Color Tokens

### Light Mode (Default)
- **Canvas:** `#E8EDF3` (`--color-canvas` / `--c-canvas`)
- **Elevated Workspace / Cards:** `#F3F6FA` (`--color-card` / `--c-canvas-elevated`)
- **Muted / Table Header / Nested Surface:** `#DCE3EC` (`--color-surface` / `--c-canvas-muted`)
- **Header Surface:** `rgba(232, 237, 243, 0.88)` (`--c-header-bg`) with `backdrop-blur-md` and `#C4CFDD` bottom border
- **Footer Surface:** `#DCE3EC` (`--c-footer-bg`) with `#C4CFDD` (`--c-footer-border`) top border
- **Primary / Ink:** `#0F172A` (`--color-ink` / `--c-ink` / `--c-primary`)
- **Body Copy:** `#2D3B4E` (`--color-body` / `--c-body`)
- **Muted Text:** `#5B6B80` (`--color-muted` / `--c-mute`)
- **Faint / Placeholder:** `#8292A6` (`--c-faint`)
- **Structural Hairline:** `#C4CFDD` (`--color-hairline` / `--c-hairline`)
- **Soft Hover / Inner Fill:** `#DCE3EC` (`--c-hairline-soft`)
- **Card Elevation Shadow:** `0 2px 6px rgba(15, 23, 42, 0.06)`

### Dark Mode (`.dark`)
- **Canvas:** `#0a0a0a`
- **Elevated Workspace:** `#111111`
- **Primary / Ink:** `#ededed`
- **Body Copy:** `#a1a1a1`
- **Muted Text:** `#878787`
- **Faint / Placeholder:** `#666666`
- **Structural Hairline:** `#242424`
- **Soft Hover Fill:** `#161616`
