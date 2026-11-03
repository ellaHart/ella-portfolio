import type { CaseStudy, CaseVideoAsset, ImageAsset } from '../types';

/*
 * Tipping, Reimagined
 * Sources: Ella's process board (Square reference, whiteboard sketch, Figma
 * frames), her original 2024 HTML/CSS/JS tipping screen (screen recording),
 * and her redesigned prototype recording (Fernwood Coffee, watercolor café).
 *
 * Rules for this page:
 * - Messaging is quoted exactly from the screens shown.
 * - No usability testing, validation or timing improvements are claimed.
 * - The interactive prototype isn't rebuilt here; its recording is shown
 *   instead, so no behaviour is invented.
 */

const base = '/images/projects/tipping';
const img = (file: string, alt: string, width: number, height: number): ImageAsset => ({
  src: `${base}/${file}.webp`,
  alt,
  width,
  height,
});
const screen = (file: string, alt: string) => img(file, alt, 520, 704);

export const tip = {
  prototype: {
    src: '/videos/tipping/tipping-prototype.mp4',
    poster: `${base}/tipping-prototype-poster.webp`,
    width: 1600,
    height: 900,
    label:
      'Tipping prototype on a tablet in a watercolor café: the customer slides to choose a tip, sees the dollar amount and percentage update, reviews the total, completes the transaction and sees a thank-you screen',
  } satisfies CaseVideoAsset,
  hero: img(
    'tipping-prototype-poster',
    'The redesigned Fernwood Coffee tipping screen on a tablet, set in a warm watercolor café with hanging lamps and plants',
    1400,
    788,
  ),
  squareReference: img(
    'iter-square-reference',
    'A typical digital tipping prompt: large 15%, 20% and 25% buttons with dollar amounts, above Custom Tip Amount and No Tip',
    1400,
    971,
  ),
  sketch: img('iter-whiteboard-sketch', 'Whiteboard sketch: subtotal and total above a minus-to-plus slider running from 0 to 25%, with a Next arrow', 1400, 980),
  figma: img(
    'iter-figma-hifi',
    'Early Figma version: subtotal and total, “Tips are welcome if you had a great experience. We appreciate you!”, a $15.00 / 15% slider and a yellow Complete Transaction button',
    1400,
    968,
  ),
  original: img(
    'original-coded',
    'Original coded version (2024): green “Thanks for visiting! Your support helps us keep going” heading above a Set Your Tip card with a $2.82 tip, a slider at 15% and Total: $21.62',
    1400,
    999,
  ),
  welcome: screen(
    'screen-2',
    'Redesigned screen: Fernwood Coffee header, “Thank you for visiting!”, “Your support helps us keep the coffee warm and the music playing. Tips are always optional.” and a slider waiting at 0% with “slide to choose”',
  ),
  choosing: screen(
    'screen-6',
    'Redesigned screen mid-choice: a $1.05 tip shown above the slider with a 2% badge, minus and plus buttons, and No tip and Custom buttons below',
  ),
  summary: screen(
    'screen-12-5',
    'Redesigned screen with a $4.95 tip at 20%, a summary of subtotal $24.75, tip $4.95 and total $29.70, and a yellow Complete transaction button',
  ),
  complete: screen(
    'screen-15-5',
    'Confirmation screen: a check mark, “Thank you!”, “Your payment to Fernwood Coffee is complete. We appreciate you” and a Start a new transaction button',
  ),
};

export const tippingCaseStudy: CaseStudy = {
  duration: '3 weeks',
  tools: ['Figma', 'HTML, CSS & JavaScript'],
  projectType: 'Interface Redesign',
  meta: [
    { label: 'Focus', value: 'Interaction Design, Human-Centered Design' },
    { label: 'Deliverable', value: 'Interactive Prototype' },
  ],
  intro: 'Designing a more thoughtful digital tipping experience.',
  heroImage: tip.hero,

  problem: {
    heading: 'When a simple transaction becomes a social interaction',
    question: 'How might we make digital tipping feel like a choice rather than an obligation?',
    body: [
      'Digital tipping has become an increasingly common part of everyday transactions. Payment interfaces like Square and Clover often present customers with large, prominent tipping options immediately before completing a purchase.',
      'While these interfaces make tipping convenient, they can also introduce an uncomfortable social dynamic.',
      'In quick-service environments like cafés, where customers order at a counter rather than receive traditional table service, suggested tip percentages may feel disproportionate to the interaction. Large preset amounts and visually dominant buttons can make declining or adjusting a tip feel more difficult than accepting the suggested options.',
      'The discomfort extends to both sides of the counter. Customers may feel pressured to tip while an employee waits nearby, while employees are placed in the awkward position of presenting a screen that asks for additional payment.',
      'I began questioning why a digital tipping experience needed to feel so transactional when something as simple as a handwritten tip jar could feel warm, casual, and inviting.',
    ],
  },

  approachIntro: {
    heading: 'Designing for choice, not pressure',
    body: [
      'I approached the redesign by evaluating common patterns in existing digital tipping interfaces and identifying moments where the experience could become uncomfortable.',
      'Rather than focusing solely on visual improvements, I wanted to reconsider how tipping options were presented, how customers interacted with them, and how the language of the interface influenced the experience. Three principles guided my redesign:',
    ],
  },
  approach: [
    { title: 'Empathy', body: 'Make tipping feel like a voluntary expression of appreciation rather than a social obligation.' },
    { title: 'Autonomy', body: 'Give customers flexibility in how they choose to tip, whether by percentage, dollar amount, or a quick adjustment.' },
    { title: 'Efficiency', body: 'Reduce unnecessary steps so customers can complete their transactions quickly and comfortably.' },
  ],

  results: {
    heading: 'A more approachable way to tip',
    statement: 'The redesigned interface reimagines tipping as a flexible, low-pressure interaction.',
    body: [
      'I replaced the emphasis on large preset percentages with a more approachable experience that allows customers to choose how they would like to contribute.',
      'The redesign introduces clearer language, a warmer color palette, and multiple ways to select a tip. Customers can choose between percentage-based and dollar-based tipping or use an interactive slider to adjust their contribution quickly.',
      'The slider became the defining feature of the redesign. Rather than requiring customers to navigate a series of prominent preset buttons, it provides a more fluid way to explore and select an amount.',
      'Together, these changes aim to reduce the perceived pressure of tipping while keeping the interaction simple and efficient. The result is an interactive prototype that explores how small design decisions can influence the emotional experience of an everyday transaction.',
    ],
    image: tip.summary,
    note: 'This is a design prototype. It wasn’t usability tested, and no improvements in transaction time or tipping behavior are claimed.',
  },

  chapters: [
    {
      id: 'empathy',
      title: 'Designing with empathy',
      blocks: [
        {
          kind: 'text',
          heading: 'Language matters',
          body: [
            'One of the most intentional changes I made was reconsidering how the interface communicates with customers.',
            'Traditional digital tipping screens often lead with a direct request for a tip, accompanied by prominent suggested percentages. In a face-to-face transaction, this can make the interaction feel more like an expectation than a choice.',
          ],
        },
        {
          kind: 'aside',
          body: [
            'Large preset buttons lead the screen, while adjusting or declining sits below them in smaller text.',
          ],
          image: tip.squareReference,
          reference: 'Reference · A typical tipping prompt',
          caption: 'The kind of prompt I set out to rethink. Not my design.',
        },
        {
          kind: 'text',
          body: [
            'Instead of opening with a request for additional payment, my redesigned interface begins with “Thank you for visiting!” and “Your support helps us keep the coffee warm and the music playing. Tips are always optional.” This shifts the tone of the experience from transactional to appreciative.',
            'Inspired by the warmth and simplicity of a traditional tip jar, I wanted the interface to acknowledge the customer before presenting tipping options. The intention wasn’t to discourage tipping, but to create an environment where customers could make that decision comfortably and without unnecessary pressure.',
          ],
        },
        { kind: 'figure', images: [tip.welcome], caption: 'The redesigned screen opens with thanks, and the tip starts at zero: “slide to choose.” Select to expand.', expandable: true },
      ],
    },
    {
      id: 'visual-language',
      title: 'A warmer visual language',
      blocks: [
        {
          kind: 'text',
          heading: 'Color influences emotion',
          body: [
            'I wanted the interface to feel more welcoming than the visually dominant tipping prompts commonly found on digital payment terminals.',
            'I introduced a softer color palette and reconsidered the visual hierarchy to create a calmer interaction. Rather than emphasizing a particular tip amount, the interface communicates that the customer has control over the decision.',
          ],
        },
        {
          kind: 'comparison',
          items: [
            {
              label: 'Original version (2024)',
              image: tip.original,
              points: ['Bright green headings and buttons', 'Tip, percentage and total all at the same heavy weight', 'Slider starts at 15%'],
            },
            {
              label: 'Redesign',
              image: tip.summary,
              points: ['Cream, linen and terracotta tones', 'One clear tip amount, with the total in a quiet summary', 'Slider starts at 0%'],
            },
          ],
          caption: 'My original coded tipping screen next to the redesign.',
        },
        {
          kind: 'palette',
          items: [
            { name: 'Cream', hex: '#FCF6F0', use: 'Screen background' },
            { name: 'Warm white', hex: '#FCFCF6', use: 'Cards and buttons' },
            { name: 'Linen', hex: '#EAE4D8', use: 'Slider track and dividers' },
            { name: 'Terracotta', hex: '#C07E60', use: 'Slider fill and handwritten accents' },
            { name: 'Butter', hex: '#EAD878', use: 'Complete transaction' },
            { name: 'Espresso', hex: '#30241E', use: 'Text' },
          ],
          note: 'Colors sampled from the redesigned prototype.',
        },
      ],
    },
    {
      id: 'choice',
      title: 'Giving customers more choice',
      blocks: [
        {
          kind: 'text',
          heading: 'Percentage or dollar amount?',
          body: [
            'Traditional tipping interfaces often prioritize preset percentages, even when those amounts may not reflect what a customer wants to contribute.',
            'My redesign introduces flexibility by allowing customers to choose between percentage-based and dollar-based tipping. This supports different preferences and makes it easier for customers to select an amount that feels appropriate to the transaction.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Dollar amount and percentage', caption: 'The tip shows in dollars, with the percentage in a small badge under the slider.', image: tip.choosing },
            { title: 'Review before paying', caption: 'Subtotal, tip and total appear together before completing the transaction.', image: tip.summary },
            { title: 'A warm finish', caption: '“Thank you!” and “We appreciate you” close the transaction.', image: tip.complete },
          ],
        },
      ],
    },
    {
      id: 'slider',
      title: 'Making the interaction effortless',
      blocks: [
        {
          kind: 'text',
          heading: 'The slider',
          body: [
            'The slider is the defining interaction in my redesign. Rather than relying exclusively on large preset buttons, I introduced a slider that allows customers to adjust their tip more fluidly.',
            'The goal was to make the interaction feel quicker, more flexible, and less socially uncomfortable. The slider complements the other tipping options, with minus and plus buttons for fine adjustments and No tip and Custom alongside, rather than requiring customers to use a single method.',
          ],
        },
        {
          kind: 'progression',
          title: 'From sketch to slider',
          body: 'The slider was there from the first whiteboard sketch. Each version refined how the amount, percentage and total are presented around it.',
          stages: [
            { label: 'Whiteboard sketch', image: tip.sketch },
            { label: 'Early Figma version', image: tip.figma },
            { label: 'Redesign', image: tip.choosing },
          ],
        },
        { kind: 'video', video: tip.prototype, caption: 'The redesigned prototype in use. Use the controls to play or pause.' },
      ],
    },
  ],

  reflection: {
    heading: 'Revisiting an old design with a new perspective',
    body: [
      'I originally explored this concept early in my design education. Returning to it later gave me an opportunity to evaluate the interface through a more developed understanding of user experience.',
      'What began as an exercise in designing a tipping screen evolved into a broader exploration of how interfaces influence social interactions.',
      'I became particularly interested in the relationship between visual hierarchy, language, and perceived pressure. Even small decisions, such as the prominence of a suggested percentage or the wording of a prompt, can influence how comfortable someone feels making a choice.',
      'This redesign reinforced an important lesson in my design process: a successful interface should do more than make an action easy to complete. It should also consider how that interaction makes people feel.',
      'Ultimately, I wanted to create an experience that made tipping feel less like an expectation and more like a genuine choice.',
    ],
  },
};
