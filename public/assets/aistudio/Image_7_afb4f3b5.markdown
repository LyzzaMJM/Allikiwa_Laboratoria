---
name: Allikiwa EdTech
colors:
  surface: '#fff8f6'
  surface-dim: '#ffcfc3'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e4'
  surface-container-high: '#ffe2db'
  surface-container-highest: '#ffdbd1'
  on-surface: '#3b0900'
  on-surface-variant: '#454652'
  inverse-surface: '#601400'
  inverse-on-surface: '#ffede8'
  outline: '#767683'
  outline-variant: '#c6c5d4'
  surface-tint: '#4a56b1'
  primary: '#0e1c7b'
  on-primary: '#ffffff'
  primary-container: '#2a3691'
  on-primary-container: '#9ba6ff'
  inverse-primary: '#bcc2ff'
  secondary: '#9a4600'
  on-secondary: '#ffffff'
  secondary-container: '#ff842c'
  on-secondary-container: '#632b00'
  tertiary: '#083200'
  on-tertiary: '#ffffff'
  tertiary-container: '#104b00'
  on-tertiary-container: '#5cc23c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bcc2ff'
  on-primary-fixed: '#000b62'
  on-primary-fixed-variant: '#313d98'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#ffb68c'
  on-secondary-fixed: '#321200'
  on-secondary-fixed-variant: '#753400'
  tertiary-fixed: '#91fb6e'
  tertiary-fixed-dim: '#76de55'
  on-tertiary-fixed: '#042100'
  on-tertiary-fixed-variant: '#125200'
  background: '#fff8f6'
  on-background: '#3b0900'
  surface-variant: '#ffdbd1'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a respectful, contemporary, and deeply educational digital environment focused on Peru's native languages (Quechua Chanka and Aimara). The brand balances institutional rigor with indigenous cultural warmth, discarding tourist clichés in favor of subtle geometric Andean design motifs, clean layout structures, and high legibility.

### Emotional Response & Personality
- **Rigorous & Trustworthy:** Anchored by deep indigo, instilling linguistic validity and academic confidence.
- **Warm & Affirming:** Earthy ochres and vibrant greens encourage learning without cognitive fatigue or intimidation.
- **Modern Heritage:** Rooted in ancestral context through refined geometry, avoiding folklore pastiche.

### Design Movement
**Modern Educational Humanism:** Crisp surfaces, balanced negative space, structured typographic hierarchies, and organic warm-tinted light containers.

## Colors

The palette codifies functional educational roles and ancestral semantic accents under a clean light mode base.

### Functional Roles
- **Deep Indigo (`#2a3691`):** Structural navigation, major headlines, linguistic metadata tags, and formal grammatical modules.
- **Sun Orange (`#f27a21`):** Active engagement, interactive exercises, vocabulary flashcards, and primary prompts.
- **Growth Green (`#3ca21d`):** Correct answers, learning milestones, streak progress, and positive validation.
- **Earthy Terracotta (`#b43f1d`):** Cultural context modules, etymology pills, dialectal badges, and respectful heritage notes.

### Canvas & Neutral Hierarchy
- **Canvas Base:** Soft warm off-white (`#fdfbf7`) to reduce eye strain during prolonged reading.
- **Surface Elevation 1:** Pure Slate White (`#ffffff`) for elevated interactive cards.
- **Border / Hairlines:** Muted Slate Cream (`#e2e8f0` / `#ede8df`).
- **Body Neutral:** Deep Slate Neutral (`#1e293b`) for maximum reading contrast.

## Typography

Typography balances phonetic clarity with engaging, humane headers:
- **Headlines (Plus Jakarta Sans):** Selected for its geometric warmth and rounded humanist terminals, welcoming learners to complex phonetic systems.
- **Body & Labels (Inter):** High x-height, distinct letterforms, and comprehensive diacritic support, ensuring phonetic accuracy across Quechua and Aimara alphabets (including aspirates, ejectives, and specific glottal markings).

## Layout & Spacing

A centralized responsive fluid grid system optimized for language pairs, interactive translation splits, and flashcard learning tracks.

### Breakpoints & Adaptive Rules
- **Mobile (< 768px):** Single column reflow. Margins lock at `1rem`. The navigation simplifies into a dedicated dual-tab control anchor. Translation panels switch from side-by-side to stacked panels with a quick bidirectional flip toggle.
- **Tablet (768px - 1024px):** 8-column layout. Translation containers split horizontally when screen width permits.
- **Desktop (> 1024px):** 12-column layout. Max container constraint at `1200px` for optimal reading scan lines. Two primary views are pinned in the top navigation bar: `'Traductor'` and `'Aprender'`.

## Elevation & Depth

This system avoids heavy drop shadows, opting for subtle ambient diffusion tinted with deep navy undertones (`rgba(42, 54, 145, 0.06)`).

- **Elevation 0 (Canvas):** Flat base surface in `#fdfbf7`.
- **Elevation 1 (Cards & Input Panels):** Pure `#ffffff` surface, bounded by a 1px border (`#ede8df`), with subtle shadow `0 2px 8px -2px rgba(42, 54, 145, 0.05)`.
- **Elevation 2 (Floating Action & Audio Controls):** `0 8px 24px -4px rgba(42, 54, 145, 0.08)`.
- **Elevation 3 (Modals & Pronunciation Overlays):** `0 16px 36px -6px rgba(42, 54, 145, 0.12)`.

## Shapes

The roundedness token level `2` delivers generous, welcoming geometry:
- Standard UI components (cards, text boxes, buttons) employ `0.5rem` (`rounded-md`) to `1rem` (`rounded-lg`).
- Container panels, flashcards, and primary action areas use `1.5rem` (`rounded-2xl`) to emphasize approachable learning.
- Badges, phonetic tags, and pill toggles adopt full organic curvature (`9999px`).
- Subtle Andean stepped geometry (inspired by the Andean *Chakana*) is restricted to lightweight line ornaments, subtle divider notches, and 45-degree corner micro-accents.

## Components

### Top Navigation Bar
- Constrained to the two primary navigation pillars: **Traductor** and **Aprender**.
- Left flank: Clean geometric logo placeholder with balanced aspect ratio.
- Active states indicated by a solid `#2a3691` bottom indicator bar and semi-bold typography.

### Translation Panel
- Symmetrical dual-surface cards (`rounded-2xl`, border `#ede8df`).
- Source language on the left, Target on the right, separated by an organic swap button (`#2a3691`).
- Integrated audio playback action button using subtle `#f8fafc` background with a hover transition to `#2a3691` and white icon.

### Action Buttons
- **Primary Action (Active exercises / Submit):** Vibrant sun orange (`#f27a21`), white text, bold weight, rounded-xl shape, with subtle downward micro-shadow for tactile press feedback.
- **Positive / Confirmation Button:** Growth green (`#3ca21d`), white text, used strictly for lesson success and progression confirmation.
- **Secondary / Tertiary:** Clean `#ffffff` with `#2a3691` hairline border and text.

### Badges & Cultural Tags
- **Linguistic Tags (Quechua Chanka, Aimara, Fonética):** Soft blue tint (`rgba(42, 54, 145, 0.08)`), text `#2a3691`.
- **Cultural Notes:** Earthy terracotta border and tint (`rgba(180, 63, 29, 0.1)`), text `#b43f1d`.

### Illustration & Graphic Placeholders
- Geometric SVG placeholder frames with rounded-2xl boundaries, subtle 1px dashed borders in terracotta or deep indigo, and minimalist neutral fill for culturally aligned vector art.