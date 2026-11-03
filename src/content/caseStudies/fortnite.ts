import type { CaseStudy, ImageAsset } from '../types';

/*
 * Fortnite: UI Design & Accessibility
 * Two-week academic exercise (weeks 5–6 of the 7-week UI/UX for Gaming course).
 * Copy is Ella's own. Accessibility work is simulation-based visual evaluation
 * only: no user testing, scores, or WCAG claims.
 */

const img = (file: string, alt: string, width: number, height: number, large = true): ImageAsset => ({
  src: `/images/projects/fortnite/${file}.webp`,
  alt,
  width,
  height,
  ...(large ? { large: `/images/projects/fortnite/${file}-lg.webp` } : {}),
});

export const fn = {
  startScreen: img(
    'fortnite-start-screen-reference',
    'Original Fortnite start screen: white condensed logotype and a yellow "Press to start" button on a bright blue gradient',
    1800,
    1013,
    false,
  ),
  styleGuide: img(
    'fortnite-ui-style-guide',
    'Fortnite UI style guide documenting typography, button and selected states, tags, character-selection tiles and background gradients',
    1800,
    1125,
  ),
  initial: img(
    'fortnite-character-select-initial',
    'Initial character-selection mockup: character preview with outfit label, an empty selection grid and a Done button',
    1800,
    1125,
  ),
  refined: img(
    'fortnite-character-select-refined',
    'Refined character-selection mockup: character thumbnails in the grid, category tags, outfit description and Edit and Back buttons in a bottom bar',
    1800,
    1125,
  ),
};

/**
 * Colour-vision simulation screenshots. Drop each file into
 * assets-source/fortnite/accessibility/<slug>.png, run `npm run assets`,
 * then set `image: a11y('<slug>', width, height)`.
 */
export const a11y = (slug: string, title: string, width: number, height: number): ImageAsset => ({
  src: `/images/projects/fortnite/accessibility/${slug}.webp`,
  alt: `Fortnite-inspired character-selection mockup viewed through a colour-vision simulator: ${title}`,
  width,
  height,
});

export const fortniteCaseStudy: CaseStudy = {
  organization: 'UI/UX for Gaming, University of Miami',
  duration: '2 weeks (of a 7-week program)',
  tools: ['Adobe Photoshop', 'Color-vision simulator'],
  projectType: 'Academic design exercise',
  meta: [
    { label: 'Discipline', value: 'Game UI / Visual Design' },
    { label: 'Context', value: 'UI/UX for Gaming, University of Miami' },
  ],
  intro:
    'A two-week exploration of Fortnite’s interface design, examining how typography, color, and visual hierarchy shape the player experience. Through UI mockups, style guide development, and accessibility testing, I recreated the game’s distinctive visual language while identifying opportunities to improve readability.',
  disclaimer:
    'An independent academic exercise completed for a UI/UX for Gaming course at the University of Miami. Not an official Fortnite project, and not affiliated with, endorsed by, or commissioned by Epic Games.',
  heroImage: fn.refined,

  problem: {
    heading: 'The design challenge',
    question: 'Understanding an established visual language',
    body: [
      'Fortnite has a distinctive visual identity built around bold typography, vibrant gradients, recognizable character artwork, and highly stylized interface elements.',
      'For this assignment, I wanted to explore what makes that visual language effective rather than replace it with something entirely different. I was particularly interested in the game’s oversized typography, variation in lettering styles and sizes, and use of layered text against bright gradient backgrounds.',
      'The challenge was to recreate these visual characteristics while maintaining clear information hierarchy and recognizable interaction patterns.',
    ],
    listHeading: 'Design objectives',
    list: [
      'Recreate Fortnite’s recognizable interface aesthetic.',
      'Establish a consistent UI style guide.',
      'Explore typography, color, and component hierarchy.',
      'Develop character-selection interface mockups.',
      'Evaluate visual accessibility using color-vision simulation.',
      'Refine the interface based on observations.',
    ],
  },

  // Drawn from the case study's own sections; no new claims.
  approach: [
    { title: 'Visual research', body: 'Studied Fortnite’s interface from a designer’s perspective: condensed typography, blue gradients, and layered text.' },
    { title: 'Style guide', body: 'Documented typography, button and selected states, tags, and character-selection components.' },
    { title: 'Initial mockup', body: 'Established the character-selection layout: preview, selection grid, and basic navigation.' },
    { title: 'Refinement', body: 'Added character thumbnails, supporting descriptions, category tags, and bottom navigation controls.' },
    { title: 'Accessibility review', body: 'Viewed the interface across eight color-vision conditions and used the observations to inform smaller adjustments.' },
  ],

  results: {
    statement:
      'A UI style guide and a character-selection mockup that recreate Fortnite’s visual language, reviewed across eight simulated color-vision conditions.',
    metrics: [
      { value: '1', label: 'UI style guide' },
      { value: '2', label: 'Character-selection mockups (initial and refined)' },
      { value: '8', label: 'Simulated color-vision conditions' },
    ],
    note: 'These figures describe deliverables. The accessibility work was a simulation-based visual evaluation, not user testing or formal accessibility certification.',
  },

  chapters: [
    {
      id: 'visual-research',
      title: 'Visual research',
      blocks: [
        { kind: 'text', heading: 'Learning from Fortnite’s visual identity', body: [
          'Having played Fortnite when I was younger, I was already familiar with its visual identity. Returning to the game from a design perspective allowed me to examine the decisions behind an interface I had previously experienced primarily as a player.',
        ] },
        {
          kind: 'aside',
          body: [
            'I was especially drawn to the game’s bold, condensed typography, bright blue gradient backgrounds, and the way text and interface elements are layered to create depth.',
            'I wanted to understand how these elements worked together before attempting to recreate them.',
          ],
          image: fn.startScreen,
          reference: 'Reference · Original Fortnite interface',
          caption: 'Fortnite’s start screen, studied as a reference. Not my design work.',
        },
      ],
    },
    {
      id: 'style-guide',
      title: 'UI style guide',
      blocks: [
        { kind: 'text', heading: 'Building a consistent design system', body: [
          'Before completing my interface mockups, I documented the visual elements that define Fortnite’s UI. I created a style guide examining typography hierarchy, button styles, selected states, tags, and character-selection components.',
          'This helped me maintain consistency across the different elements of my mockup while understanding how Fortnite communicates hierarchy and interactivity.',
        ] },
        { kind: 'figure', images: [fn.styleGuide], caption: 'UI style guide. Select to expand.', expandable: true },
        {
          kind: 'cards',
          items: [
            { title: 'Burbank Big Condensed Bold', body: 'Large display and title typography.' },
            { title: 'Heading Now', body: 'Secondary interface headings.' },
            { title: 'Agency', body: 'Supporting interface text.' },
            { title: 'Burbank', body: 'Smaller informational text.' },
          ],
        },
        {
          kind: 'bullets',
          heading: 'Components documented',
          items: [
            'Default button states',
            'Selected buttons with a contrasting outline',
            'Informational tags',
            'Rounded character-selection tiles',
            'Character-selection indicators',
            'Background gradients',
            'Text hierarchy',
          ],
        },
      ],
    },
    {
      id: 'interface-design',
      title: 'Interface design & iteration',
      blocks: [
        { kind: 'text', heading: 'From structure to a finished interface', body: [
          'For my primary mockup, I chose Fortnite’s character-selection screen. It offered an opportunity to explore several UI components within a single composition: character previews, selection grids, navigation buttons, category labels, and supporting text.',
          'I began by establishing the layout and visual structure before developing a more complete interface. As the design progressed, I added character thumbnails, supporting descriptions, category tags, and navigation controls, which helped establish a clearer relationship between the selected character and the available customization options.',
        ] },
        {
          kind: 'comparison',
          items: [
            { label: 'Initial mockup', image: fn.initial, points: ['Established character preview', 'Selection-grid structure', 'Basic navigation elements'] },
            {
              label: 'Refined mockup',
              image: fn.refined,
              points: ['Added character thumbnails', 'Expanded supporting information', 'Introduced category tags', 'Developed bottom navigation controls'],
            },
          ],
          caption: 'Developing the character-selection interface from its initial structure into a more complete UI composition.',
        },
      ],
    },
    {
      id: 'accessibility',
      title: 'Accessibility testing',
      blocks: [
        { kind: 'text', heading: 'Designing beyond color', body: [
          'To evaluate the accessibility of my Fortnite-inspired interface, I used a color-vision simulator to examine how the design appeared across eight different visual conditions. I focused on the readability of typography, visibility of selected states, and contrast between interface elements.',
          'The simulations helped me identify where additional attention to text placement and visual hierarchy could improve clarity without compromising Fortnite’s established visual identity.',
        ] },
        {
          kind: 'marquee',
          label: 'Color-vision simulations',
          items: [
            { title: 'Protanomaly', detail: 'Red-weak', image: a11y('protanomaly', 'Protanomaly (red-weak)', 900, 747) },
            { title: 'Deuteranomaly', detail: 'Green-weak', image: a11y('deuteranomaly', 'Deuteranomaly (green-weak)', 900, 758) },
            { title: 'Tritanomaly', detail: 'Blue-weak', image: a11y('tritanomaly', 'Tritanomaly (blue-weak)', 900, 762) },
            { title: 'Protanopia', detail: 'Red-blind', image: a11y('protanopia', 'Protanopia (red-blind)', 900, 754) },
            { title: 'Deuteranopia', detail: 'Green-blind', image: a11y('deuteranopia', 'Deuteranopia (green-blind)', 900, 757) },
            { title: 'Tritanopia', detail: 'Blue-blind', image: a11y('tritanopia', 'Tritanopia (blue-blind)', 900, 759) },
            { title: 'Achromatopsia', detail: 'Monochromacy', image: a11y('achromatopsia', 'Achromatopsia (monochromacy)', 900, 742) },
            { title: 'Blue cone monochromacy', image: a11y('blue-cone-monochromacy', 'Blue cone monochromacy', 900, 750) },
          ],
        },
        {
          kind: 'callout',
          text: 'Accessibility testing reinforced the importance of designing beyond color alone. Strong typography, clear hierarchy, and recognizable interface states help maintain usability even when color perception changes.',
        },
      ],
    },
  ],

  reflection: {
    body: [
      'This project challenged me to approach an interface I already knew as a player from the perspective of a designer.',
      'Recreating Fortnite’s visual language required more than matching its colors and typography. I had to consider how different interface elements work together to communicate hierarchy, navigation, and interaction.',
      'Developing the style guide helped me understand the importance of consistency, while accessibility testing encouraged me to evaluate the interface beyond its appearance under typical viewing conditions.',
      'Ultimately, the project strengthened my visual design skills and reinforced the value of studying existing design systems before making changes to them.',
    ],
  },
};
