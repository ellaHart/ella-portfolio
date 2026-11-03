# Ella Hartsell Portfolio: Analysis & Plan

_Last updated 2026-11-01_

## 1. Findings (Phase 1)

### Repository
- `personalWebsite/` was empty. This is a fresh React + Vite + TypeScript build, not a refactor.
- The live site (ellahartsell.com) is a Lovable-generated build. Its source is not in this folder, so no code was reused. Its **content** was reused: project names, descriptions, tags, itch.io/GitHub links and the contact email are now in `src/content/`.

### References
| Source | Status | What I took from it |
|---|---|---|
| Figma inspiration file | **Not received.** I only got exported screenshots (moodboard + browser captures). | Brand sheet, palette, logos, headshots, and the reference-site screenshots |
| joannaminott.com | Reviewed live | Outcome-first project headlines, metric pairs per project, tag rows, a calm editorial rhythm, a contact block like "Got a problem worth solving?", and a case-study sidebar TOC |
| drewhalle.com | Screenshots only | Scattered-polaroid wall and a "photo editor" window chrome. These patterns inform Creative Mode and the Creative page |
| `Desktop/ELVTR/Portfolio Template.png` | Reviewed | The **case study structure**: About → Role/Length → Challenges → Work Process → Player Profile/Journey → Prototype & Flow → Moodboard → Styleguide & Mockups → Outcomes → Post-mortem |

### Brand assets
- **Logos**: the EH script mark and the circular "eh" mark were supplied on an opaque white field. `scripts/prepare-assets.mjs` derives transparency from luminance and recolours them to #635D56. **The letterforms are unchanged.** The circle mark is legible at 32px and is used for the favicon.
- **Headshots**: one full-resolution photo (black suit). The studio B&W and laptop photos are **interim crops from the moodboard** (about 440px wide). Please send the original files.
- **Fonts**: The Seasons and Garet were **not supplied**. Interim fallbacks:
  - The Seasons → **Cormorant Garamond** (a high-contrast display serif with a similar soft, editorial feel)
  - Garet → **Outfit** (a geometric sans with round bowls and a similar x-height)
  - Handwriting (Creative Mode only) → **Caveat**

  To use your licensed fonts, drop the `.woff2` files into `public/fonts/` and uncomment the `@font-face` block in `src/styles/fonts.css`. Every component reads `--font-display` and `--font-sans`, so nothing else changes.

### Missing content (shown as labelled placeholders in the UI)
- ~~MVMNT~~: removed from the site for now (no content yet)
- Answer Campus: your UI/UX role specifics, duration, process artefacts, and the cover image (it currently lives on ellahartsell.com)
- Game cover images (also on ellahartsell.com). I haven't downloaded them yet; I'm waiting for your OK
- Resume PDF → `public/resume/Ella-Hartsell-Resume.pdf`
- itch.io profile URL (only individual game pages are known)
- Certifications (none provided)
- Hurricanettes / NERDLab / VESL: role titles, dates, and outcomes
- Polaroid photos (dance, performances, events)
- ELVTR: the template says "seven-week course" in one place and "14 Weeks" in another. Which is right?

## 2. Architecture

```
src/
  content/          # single source of truth, typed data
    types.ts  site.ts  projects.ts  games.ts  experience.ts  certifications.ts
  context/
    CreativeMode.tsx  # mode state, persistence, view-transition switch
  hooks/            # useReducedMotion, useMediaQuery
  components/
    layout/         # SiteHeader, SiteFooter, Layout, ScrollManager
    ui/             # Logo, ModeToggle, Tag, ArrowLink, Icon, Reveal, Placeholder, CursorFollower
    home/           # Hero, Marquee, SelectedWork, AboutPreview, ContactSection
    footer/         # BubbleField (Pop the Bubbles)
  pages/            # Home, Work, CaseStudy, About, Creative, NotFound
  styles/           # tokens.css, fonts.css, global.css
```

Routes: `/`, `/work`, `/work/:slug`, `/about`, `/contact`, `/dance` (`/creative` redirects there), `*`.

- **Home**: Hero → scrolling tags → horizontal Selected Work → "Let's create something together" → footer
- **Work**: vertical project list → game development desktop (`components/work/GameDesktop`) → footer
- **About**: two-column intro (headshot + bio), "How I work", experience, certifications, resume and links
- **Contact**: no form. Two columns: heading left, thin vertical divider, then Email (mailto + copy-to-clipboard with "Copied!"), LinkedIn, GitHub and itch.io stacked right. Phones stack with a horizontal rule.
- **Dance** (`/dance`, Creative Mode only; `/creative` redirects): intro, a GSAP-pinned stack of performance videos (`components/dance/StickyVideoStack`, adapted from Skiper UI StickyCard002 with attribution; a plain list under reduced motion), then draggable polaroids of real photos that open in the lightbox. Turning Creative Mode off here returns to the homepage.

## 3. Design tokens
- **Surfaces**: ivory `#F8F2E8` (page), champagne `#DCCEB3` (highlight), mauve `#CBC3BF` (rules and borders only)
- **Ink**: `#3B3632` body (≈9:1 on ivory), `#635D56` headings and UI (≈5.6:1), `#958578` taupe for large or decorative text only (≈3.2:1, never body copy)
- **Type scale**: a fluid `clamp()` scale. Display sizes run up to about 11rem.
- **Space**: 4px base. Section rhythm uses `--space-section`.
- **Motion**: a single easing family (`--ease-out-expo`) and three durations. Everything collapses under `prefers-reduced-motion`.

## 4. Selected Work gallery (recommendation)
**GSAP ScrollTrigger, pinned horizontal track, enabled only at ≥ 960px with motion allowed** (via `gsap.matchMedia`).
- Vertical scroll maps to `x` on a flex track. The pin length equals the track overflow, so the gallery ends exactly when the last panel arrives. Scrolling stays native, so nothing is hijacked or trapped.
- Inner images have their own parallax (`containerAnimation`). Titles reveal as each panel enters.
- A progress rail and a "01 / 03" counter are tied to the same timeline.
- **Keyboard**: when focus moves into a panel, the window scrolls to the scroll position that centres that panel. A "Skip gallery" link sits before the track.
- **Below 960px or with reduced motion**: no pin. Panels stack vertically as full-width editorial entries, using the same markup and no separate component.

## 5. Creative Mode (recommendation)
Creative Mode is one **presentation layer over the same site**, not a second site.
- State lives in `CreativeModeContext`, persists to `localStorage`, and is mirrored to `<html data-mode="creative">`. Almost every visual change is CSS that keys off that attribute, so components stay clean.
- **Switch**: a `role="switch"` toggle in the nav. It uses the View Transitions API to reveal the new mode as an expanding circle from the toggle, and falls back to an instant swap.
- **What changes**: paper grain and a warmer canvas; the hero headshot becomes a taped polaroid with a handwritten note; handwritten margin notes appear; project images tilt and a cursor "view" bubble follows on fine pointers; the marquee goes italic; the footer fills with more bubbles; and a **Dance** link (→ `/dance`) appears in the nav.
- **What never changes**: nav order, content, headings, focus order, and contrast.
- `/dance` is always reachable via the footer. Visiting it switches Creative Mode on, because that page is the mode's natural home.

## 6. Milestones
1. ✅ Analysis, plan, assets pipeline
2. ✅ Foundation: Vite/TS, tokens, fonts, routing, header/footer, Creative Mode
3. ✅ Homepage: Hero, Marquee, Selected Work gallery, About preview, Contact, footer bubbles
4. ✅ Work page (vertical list) + case study template (ELVTR filled from your real template; others show placeholders)
5. ⏳ About page: additional experience + certifications (scaffolded, waiting on content)
6. ⏳ Creative page: polaroid wall + desktop game gallery (scaffolded)
7. ⏳ Refinement pass: real fonts, real images, performance budget, a11y audit

## Answer Campus video assets

The gameplay clips in `assets-source/answer-campus/video/` were cut from the original
3456×2160 screen recordings (kept outside the repo, in `Videos/Screen Recordings`) with
ffmpeg. The black bars were cropped to the 16:9 game area, the clips scaled down, the audio
removed, and the files set to start streaming immediately:

```
ffmpeg -ss <start> -t <duration> -i "<recording>.mp4" -an \
  -vf "crop=3456:1944:0:108,scale=1600:-2:flags=lanczos,fps=30" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart <clip>.mp4
```

| Clip | Source recording | Start | Length |
|---|---|---|---|
| clip-messaging | 124428 | 0s | 8.8s |
| clip-map | 124753 | 0s | 12.4s |
| clip-agenda | 124647 | 28.5s | 7.5s |

The prototype video (`answer-campus-prototype.mp4`, used as both the case study hero and the project cards) is the supplied file, remuxed with
`-c copy -movflags +faststart` so its content is unchanged. `npm run assets` copies everything into `public/`.

## Case study structure (all projects)

Every case study renders through `src/pages/CaseStudy.tsx` using the components in
`src/components/caseStudy/`, always in this order:

1. **Hero** (`CaseStudyHero`): title, headline, short description, then Role · Duration · Tools · Project type, followed by any project-specific `meta`, then the featured video or image
2. **The problem → My approach → Results** (`Overview.tsx`): the same split layout for all three
3. **A closer look** (`CloserLook`): project-specific chapters built from the shared blocks in `blocks.tsx`
4. **Reflection** (`ReflectionSection`)
5. **Project navigation** (`ProjectNav`): next project and back to all work

`problem`, `approach`, `results`, `chapters` and `reflection` are required fields on
`CaseStudy`, so a new project can't skip a section. Projects without a written case study
(e.g. Tiny Tempo) use `placeholderCaseStudy()`, which has the same structure with visible TODOs.
To add one, create `src/content/caseStudies/<project>.ts` (copy an existing file as a
template) and set `caseStudy` on the project in `projects.ts`.

## Tiny Tempo assets

Sources live in `assets-source/tiny-tempo/`: the team's Figma board (`board.png`), the SAS architecture diagram (`system-architecture.png`, extracted unchanged from the SAS .docx), and the prototype recording. `npm run assets` crops the individual screens from the board (boxes measured on a 2000px-wide copy) and copies the videos.

| File | How it was made |
| --- | --- |
| `video/tiny-tempo-prototype.mp4` | Full 75 s recording at 1920×1080, silent audio removed, re-encoded (x264 CRF 25, `-tune stillimage`, faststart): 26 MB → 10 MB |
| `video/tiny-tempo-preview.mp4` | 13.5 s muted loop: segments 4–6.5 s (pairing), 10–12.5 (dashboard), 21–23.5 (specialists), 46.5–48.5 (messaging), 69–71 (device approval), 72–74 (patient directory); concatenated, `scale=1600:-2,fps=30`, libx264 CRF 26 |
| `stills/*-poster.png` | Frames at 10.5 s (preview) and 0.5 s (prototype) |

Attribution and claim rules are recorded at the top of `src/content/caseStudies/tinyTempo.ts`.

## Work-page desktop assets

Sources live in `assets-source/desktop/`: the pixel-art wallpaper (`umiami-pixel-wallpaper.png`, 2688×1520), the three Coursera certificate PDFs and the resume PDF. PDFs are copied byte-for-byte to `public/certifications/` and `public/resume/`.

Certificate images (`certifications/*.png`) are page 1 of each original PDF rasterized at 2400px with pdf.js (`disableFontFace: true` so glyphs render as outlines); `npm run assets` turns them into the modal preview (1800px) and grid thumbnail (480px). Re-render them the same way if a certificate is replaced.

## Tipping, Reimagined assets

Sources in `assets-source/tipping/`: Ella's process board (`iteration-board.png`, cropped into `stills/iter-*`), the watercolor café illustration (`cafe-watercolor.png`, kept as source; the café appears in the prototype recording itself), and the prototype recording (`prototype-original.mp4`).

| File | How it was made |
| --- | --- |
| `video/tipping-prototype.mp4` | Full 16 s prototype recording at 1600px, silent audio removed, CRF 24 |
| `stills/screen-{2,6,12.5,15.5}.png` | Frames at those seconds, cropped to the tipping card (520×705 at x 670, y 185) |
| `stills/original-coded.png` | Frame at 11.5 s of Ella's 2024 coded version recording (`Enter Subtotal - Google Chrome 2024-11-21`) |
| `stills/tipping-prototype-poster.png` | Frame at 9 s |

The palette swatches on the page were sampled from `screen-12.5`.
