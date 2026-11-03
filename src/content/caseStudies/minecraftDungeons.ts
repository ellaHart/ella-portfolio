import type { CaseStudy, ImageAsset } from '../types';

/*
 * Minecraft Dungeons: UI/UX Redesign
 * Source: Ella's ELVTR "UX/UI for Gaming" project files and brief.
 * Keep claims to what the project actually did: two participants, three tasks,
 * three interfaces. No measured usability improvements are claimed.
 */

const img = (file: string, alt: string, width: number, height: number, large = false): ImageAsset => ({
  src: `/images/projects/elvtr/${file}.webp`,
  alt,
  width,
  height,
  ...(large ? { large: `/images/projects/elvtr/${file}-lg.webp` } : {}),
});

export const md = {
  journey: img('assignment-01-player-journey-ux-design', 'Player journey map documenting player actions, motivations, emotions and opportunities across a play session', 1800, 1142, true),
  flowchart: img('assignment-02-paper-flow-chart-ux-design', 'Paper flowchart connecting the character selection, gameplay HUD and inventory screens', 1800, 758, true),
  paperPrototype: img('assignment-02-paper-prototype-ux-design', 'Paper prototype sketches of the three interfaces', 1800, 1185, true),
  usabilityTest: img('assignment-03-usability-test-ux-design', 'Usability test documentation with tasks, participant observations and findings', 1800, 1108, true),

  characterLo: img('minecraft-dungeons-character-selection-lo-fi-wireframe-1', 'Low-fidelity wireframe of the character selection screen', 1300, 850),
  characterHi: img('minecraft-dungeons-character-selection-hi-fi-wireframe', 'High-fidelity wireframe of the character selection screen', 1300, 850),
  characterFinal: img('minecraft-dungeons-character-skin-selection-hi-fi-prototype', 'Final character skin selection screen with a large character preview, skin grid and confirm button', 1340, 966),

  hudLo: img('minecraft-dungeons-in-game-hud-lo-fi-wireframe', 'Low-fidelity wireframe of the in-game HUD', 1300, 850),
  hudHi: img('minecraft-dungeons-in-game-hud-hi-fi-wireframe', 'High-fidelity wireframe of the in-game HUD', 1300, 850),
  hudFinal: img('minecraft-dungeons-in-game-playing-hud-hi-fi-prototype', 'Final in-game HUD with objective tracker, player status and equipment', 1340, 978),

  inventoryLo: img('minecraft-dungeons-inventory-enchantment-lo-fi-wireframe', 'Low-fidelity wireframe of the inventory and enchantment screen', 1300, 850),
  inventoryHi: img('minecraft-dungeons-inventory-enchantment-hi-fi-wireframe', 'High-fidelity wireframe of the inventory and enchantment screen', 1300, 850),
  inventoryFinal: img('minecraft-dungeons-inventory-enchantment-hi-fi-prototype', 'Final inventory and enchantment screen with equipped loadout, item grid, item details and enchantment options', 1340, 966),
};

const stages = (lo: ImageAsset, hi: ImageAsset, final: ImageAsset) => [
  { label: 'Lo-fi wireframe', image: lo },
  { label: 'Hi-fi wireframe', image: hi },
  { label: 'Final design', image: final },
];

export const minecraftDungeonsCaseStudy: CaseStudy = {
  organization: 'ELVTR: UX/UI for Gaming',
  projectType: 'Independent educational redesign',
  duration: '4 weeks (of a 7-week program)',
  meta: [
    { label: 'Organization', value: 'ELVTR: UX/UI for Gaming' },
    { label: 'Industry', value: 'Gaming / Interactive Entertainment' },
    { label: 'Completed', value: 'September 28, 2026' },
    { label: 'Scope', value: 'Character Selection, In-Game HUD, Inventory & Enchantments' },
  ],
  responsibilities: ['Player journey mapping', 'Interaction design', 'Wireframing', 'Usability testing', 'Prototyping', 'Visual UI design'],
  tools: ['Figma', 'Adobe Photoshop'],
  disclaimer:
    'An independent educational project completed for ELVTR’s UX/UI for Gaming course. Not affiliated with, endorsed by, or commissioned by Mojang Studios or Microsoft.',
  heroImage: md.inventoryFinal,

  problem: {
    question: 'How can familiar game interfaces better communicate player choices, objectives, and equipment interactions?',
    body: [
      'Minecraft Dungeons asks players to customize characters, navigate objectives during combat, and manage equipment and enchantments. Each of these interactions presents distinct information and usability challenges.',
      'This educational redesign explored how player-centered UX methods could make those interactions clearer while preserving the established game’s identity.',
    ],
  },

  approach: [
    { title: 'Player research', body: 'Mapped the player journey and identified opportunities for clearer interaction.' },
    { title: 'Interaction mapping', body: 'Created flowcharts and paper prototypes to explore navigation and gameplay decisions.' },
    { title: 'Wireframing', body: 'Developed low- and high-fidelity layouts for three interfaces.' },
    { title: 'Usability testing', body: 'Tested three tasks with two participants and identified areas for improvement.' },
    { title: 'Visual design & iteration', body: 'Revised the designs based on feedback and developed final high-fidelity interfaces.' },
  ],

  results: {
    statement: 'Three redesigned game interfaces, informed by player research, usability testing, and iterative design.',
    metrics: [
      { value: '3', label: 'Redesigned interfaces' },
      { value: '2', label: 'Usability testing participants' },
      { value: '3', label: 'Usability tasks' },
    ],
    note: 'These figures describe the project’s deliverables and research activities, not measured improvements in usability.',
  },

  chapters: [
    {
      id: 'research',
      title: 'Research',
      blocks: [
        {
          kind: 'text',
          body: [
            'I started by mapping the player journey: what players do, why they do it, and how they feel at each stage of play. The map documented player actions, motivations, emotions, and opportunities across gameplay, and gave the rest of the project a shared reference point.',
          ],
        },
        { kind: 'figure', images: [md.journey], caption: 'Player journey map. Select to expand.', expandable: true },
      ],
    },
    {
      id: 'opportunity',
      title: 'Opportunity',
      blocks: [
        { kind: 'text', body: ['The journey surfaced three moments where the interface could do more to support the player:'] },
        {
          kind: 'cards',
          items: [
            { title: 'Character Selection', body: 'Clearer customization and selection feedback.' },
            { title: 'In-Game HUD', body: 'More informative objective tracking and gameplay information.' },
            { title: 'Inventory & Enchantments', body: 'Clearer equipment organization and enchantment states.' },
          ],
        },
        {
          kind: 'figure',
          images: [md.flowchart, md.paperPrototype],
          caption: 'Flowchart and paper prototype mapping how players move between the three interfaces. Select to expand.',
          expandable: true,
        },
      ],
    },
    {
      id: 'challenges',
      title: 'Challenges',
      blocks: [
        {
          kind: 'text',
          body: [
            'Each interface lives in a different gameplay context. Character selection is calm and deliberate, the HUD has to be read mid-combat, and the inventory is dense with items, stats, and enchantments.',
            'The challenge was designing for all three while keeping them consistent with each other and with the existing game, so the redesign still reads unmistakably as Minecraft Dungeons.',
          ],
        },
      ],
    },
    {
      id: 'problem-reframe',
      title: 'Problem reframe',
      blocks: [
        {
          kind: 'text',
          body: [
            'Two participants completed tasks covering character selection, interpreting the gameplay HUD, and managing inventory and enchantments.',
            'Their feedback pointed to three opportunities: clearer skin availability, more informative objective tracking, and more distinguishable enchantment states. Rather than treating the screens as finished, I used these findings to guide the next round of revisions on each interface.',
          ],
        },
        { kind: 'figure', images: [md.usabilityTest], caption: 'Usability test documentation. Select to expand.', expandable: true },
      ],
    },
    {
      id: 'design-decisions',
      title: 'Design decisions',
      blocks: [
        {
          kind: 'progression',
          title: 'Character Selection',
          body: 'The screen is built around a large character preview, so players can see their choice before committing to it.',
          points: [
            'A selection grid shows the available skins at a glance.',
            'Highlighted states make the current selection unambiguous.',
            'A dedicated confirmation button separates browsing from committing.',
          ],
          stages: stages(md.characterLo, md.characterHi, md.characterFinal),
        },
        {
          kind: 'progression',
          title: 'In-Game HUD',
          body: 'The HUD has to be readable at a glance during combat, so the work focused on information hierarchy.',
          points: [
            'An objective tracker keeps the current goal visible.',
            'Player status is grouped so health and abilities can be checked quickly.',
            'Equipment sits in a consistent, predictable layout.',
          ],
          stages: stages(md.hudLo, md.hudHi, md.hudFinal),
        },
        {
          kind: 'progression',
          title: 'Inventory & Enchantments',
          body: 'The inventory holds the most information of the three, so the layout separates it into distinct zones.',
          points: [
            'Equipped items are separated from the wider inventory.',
            'Item details sit in their own panel alongside the grid.',
            'Enchantment options and their states are grouped together.',
          ],
          stages: stages(md.inventoryLo, md.inventoryHi, md.inventoryFinal),
        },
      ],
    },
    {
      id: 'trade-offs',
      title: 'Trade-offs',
      blocks: [
        { kind: 'text', body: ['Throughout the project, a few tensions shaped how each screen came together:'] },
        {
          kind: 'tradeoffs',
          items: [
            { a: 'Information density', b: 'Readability' },
            { a: 'Visual clarity', b: 'Gameplay immersion' },
            { a: 'More customization options', b: 'Space for the character preview' },
            { a: 'Consolidated inventory information', b: 'Avoiding overwhelming layouts' },
          ],
        },
      ],
    },
    {
      id: 'result',
      title: 'Result',
      blocks: [
        {
          kind: 'text',
          body: [
            'The final designs incorporate the feedback from testing while preserving the established Minecraft Dungeons visual language.',
          ],
        },
        { kind: 'figure', images: [md.characterFinal], caption: 'Character Selection', expandable: true },
        { kind: 'figure', images: [md.hudFinal], caption: 'In-Game HUD', expandable: true },
        { kind: 'figure', images: [md.inventoryFinal], caption: 'Inventory & Enchantments', expandable: true },
      ],
    },
  ],

  reflection: {
    quote: 'The most useful feedback came from people who had never seen my design process.',
    body: [
      'Testing with people unfamiliar with the design process showed me what the screens actually communicated, rather than what I intended them to.',
      'The project strengthened my understanding of player-centered game UX, iteration, interaction design, and visual communication.',
    ],
  },
};
