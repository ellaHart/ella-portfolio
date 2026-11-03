/**
 * Content model for the whole site. Every page renders from these shapes,
 * so adding a project means adding one object, not touching components.
 *
 * Convention: a string starting with "TODO:" is missing content. Components
 * render it as a visible placeholder (see <Placeholder/>) instead of hiding it.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  /** Intrinsic size, used to reserve layout space and avoid shift. */
  width: number;
  height: number;
  /** Optional higher-resolution file the lightbox loads for zooming into detail. */
  large?: string;
};

export type Metric = { value: string; label: string };

/* --------------------------------------------------------------------------
   Case studies
   Every case study follows the same editorial structure:
     Hero (meta) → The problem → My approach → Results → A closer look (numbered
     chapters) → More selected work.
   Chapters are built from a small set of content blocks so each project can
   tell its story differently without new components.
   -------------------------------------------------------------------------- */

export type CaseStudyBlock =
  /** Paragraphs, optionally introduced by a small heading. */
  | { kind: 'text'; heading?: string; body: string[] }
  /** One or more images; `expandable` opens them in the zoomable lightbox. */
  | { kind: 'figure'; images: ImageAsset[]; caption?: string; expandable?: boolean }
  /**
   * Short text beside a small image. `reference` labels the image as someone
   * else's work (e.g. an original game screen) so it's never mistaken for mine.
   */
  | { kind: 'aside'; body: string[]; image: ImageAsset; caption?: string; reference?: string }
  /** Simple bulleted list with an optional heading. */
  | { kind: 'bullets'; heading?: string; items: string[] }
  /** Side-by-side before/after (stacked on mobile), each with its own notes. */
  | { kind: 'comparison'; items: { label: string; image: ImageAsset; points: string[] }[]; caption?: string }
  /**
   * Compact, auto-scrolling strip of screenshots. `image: null` renders a
   * labelled placeholder until the file is supplied.
   */
  | { kind: 'marquee'; label: string; items: { title: string; detail?: string; image: ImageAsset | null }[] }
  /** A small concluding observation. */
  | { kind: 'callout'; text: string }
  /** Gameplay footage with accessible play/pause (and sound, when the clip has audio). */
  | { kind: 'video'; video: CaseVideoAsset; caption?: string }
  /**
   * Individual interface screens at a readable size, each with a caption.
   * `board` adds the full design board as an expandable image.
   */
  | { kind: 'screens'; items: { title: string; caption: string; image: ImageAsset }[]; board?: { image: ImageAsset; label: string } }
  /** Two (or more) approaches compared by advantages and challenges. */
  | { kind: 'proscons'; items: { title: string; pros: string[]; cons: string[] }[] }
  /** A simple step-by-step diagram; `note` qualifies what it does and doesn't claim. */
  | { kind: 'flow'; steps: string[]; note?: string }
  /** Design file next to the in-game equivalent. */
  | { kind: 'pairs'; label: string; items: { title: string; design: ImageAsset; built: ImageAsset; caption: string }[] }
  /**
   * Research findings: observation → recommendation → development response.
   * `status` keeps implemented changes, open discussions and proposals distinct.
   */
  | {
      kind: 'findings';
      source?: string;
      items: {
        title: string;
        observation: string;
        recommendation: string;
        response: string;
        status: 'implemented' | 'discussed' | 'recommended';
        insight: string;
        excerpt?: string;
      }[];
    }
  /** A row of titled cards (e.g. opportunities). */
  | { kind: 'cards'; items: { title: string; body: string }[] }
  /** Lo-fi → hi-fi → final strip for one interface, with discussion points. */
  | { kind: 'progression'; title: string; body: string; points?: string[]; stages: { label: string; image: ImageAsset }[] }
  /** "This versus that" design considerations. */
  | { kind: 'tradeoffs'; items: { a: string; b: string; body?: string }[] }
  /** Large pull quote. */
  | { kind: 'quote'; text: string }
  /** Colour swatches taken from the design itself; `note` says where they came from. */
  | { kind: 'palette'; items: { name: string; hex: string; use: string }[]; note?: string };

export type CaseVideoAsset = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Accessible description of what the footage shows. */
  label: string;
  /** Whether to offer a sound toggle (screen recordings here are silent). */
  hasAudio?: boolean;
};

export type CaseStudyChapter = {
  /** Used for the anchor link and index. */
  id: string;
  title: string;
  blocks: CaseStudyBlock[];
};

/**
 * Every case study has the same spine, in this order:
 *   1. Hero: title, short description, Role · Duration · Tools · Project type,
 *      featured image or video
 *   2. Overview: The problem → My approach → Results (all required)
 *   3. A closer look: project-specific chapters built from shared blocks
 *   4. Reflection (required)
 *   5. Project navigation (next project / all work), added automatically
 * The required fields make it impossible to publish a case study that skips
 * part of the standard structure.
 */
export type CaseStudy = {
  /* ---------- Hero ---------- */
  /** Standard metadata, always shown first (Role comes from the project). */
  duration: string;
  tools: string[];
  projectType: string;
  /** Project-specific details shown after the standard four, e.g. "Organization". */
  meta?: { label: string; value: string }[];
  /** Shown in the hero label, e.g. "Case study · NERDLab". */
  organization?: string;
  /** Short description under the headline. Falls back to the project summary. */
  intro?: string | string[];
  /** External calls to action, e.g. "Play the game". */
  links?: { label: string; href: string }[];
  responsibilities?: string[];
  /** Featured media: video with controls → card video → image → project cover. */
  heroVideo?: CaseVideoAsset;
  heroImage?: ImageAsset;
  /** Small note under the hero media, e.g. clarifying an educational/independent project. */
  disclaimer?: string;

  /* ---------- Overview ---------- */
  /** The challenge, user need, or design problem. */
  problem: {
    /** Small italic heading above the featured question. */
    heading?: string;
    question: string;
    body: string[];
    listHeading?: string;
    list?: string[];
    /** Short annotations under the question. */
    notes?: { label: string; text: string }[];
  };
  /** My contributions and process, as a short sequence of steps. */
  approach: { title: string; body: string }[];
  /** Optional heading and paragraphs shown above the approach steps. */
  approachIntro?: { heading?: string; body: string[] };
  /** Real outcomes and deliverables only; `note` clarifies what figures do and don't mean. */
  results: {
    /** Optional small italic heading above the statement. */
    heading?: string;
    statement: string;
    /** Optional supporting paragraphs after the statement. */
    body?: string[];
    /** Optional featured image of the final design. */
    image?: ImageAsset;
    metrics?: Metric[];
    highlights?: string[];
    note?: string;
  };

  /* ---------- A closer look ---------- */
  chapters: CaseStudyChapter[];

  /* ---------- Reflection ---------- */
  reflection: { heading?: string; quote?: string; body: string[] };
};

export type Project = {
  slug: string;
  title: string;
  /** Outcome / problem-first headline. */
  headline: string;
  summary: string;
  role: string;
  industry: string;
  year: string;
  tags: string[];
  cover: ImageAsset | null;
  /**
   * Looping preview for the Selected Work cards (homepage gallery + Work page).
   * Autoplays muted; falls back to `cover` as the poster under reduced motion.
   */
  video?: { src: string; width: number; height: number };
  /** Shown on cards as "Category" instead of industry when set. */
  category?: string;
  duration?: string;
  metrics?: Metric[];
  featured: boolean;
  /** Visual identity for the case study page and gallery panel. */
  accent?: string;
  caseStudy?: CaseStudy;
  externalLink?: { label: string; href: string };
};

export type Game = {
  slug: string;
  title: string;
  description: string;
  role: string;
  tools: string[];
  context: string;
  award?: string;
  /** Small pixel-art icon for the desktop's game grid. */
  icon?: ImageAsset;
  cover: ImageAsset | null;
  link: { label: string; href: string };
};

export type Experience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Certification = {
  /** Stable id used for keys and element ids. */
  slug: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  /** The original certificate PDF, offered alongside the image preview. */
  pdf?: string;
  /** Small image shown in the certifications grid. Falls back to an icon. */
  thumbnail?: ImageAsset | null;
  /**
   * Full certificate shown in the preview modal. Export PDFs to PNG/WebP
   * first so the certificate displays inline rather than as a download.
   */
  preview?: ImageAsset | null;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: 'mail' | 'linkedin' | 'github' | 'itch';
};
