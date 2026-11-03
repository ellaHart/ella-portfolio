import type { Game, ImageAsset } from './types';

// Icons (32×32 pixel art, served 4× upscaled) and covers are Ella's own game
// art, prepared from assets-source/games by `npm run assets`.
const art = (slug: string, title: string, coverAlt: string, width: number, height: number, iconAlt: string) => ({
  icon: { src: `/images/games/${slug}-icon.png`, alt: iconAlt, width: 128, height: 128 } satisfies ImageAsset,
  cover: { src: `/images/games/${slug}-cover.webp`, alt: `${title} cover art: ${coverAlt}`, width, height } satisfies ImageAsset,
});
export const games: Game[] = [
  {
    slug: 'get-gator-back',
    title: 'Get Gator Back',
    description: 'A 2D platformer where you help Al the Alligator return to the Everglades, learning about invasive species along the way.',
    role: 'TODO: role',
    tools: ['Unity', 'C#'],
    context: 'Broward XP Boost Game Jam',
    award: '1st place',
    ...art('get-gator-back', 'Get Gator Back', 'the pixel-art title screen with a Play button above a desert landscape', 315, 250, 'Pixel-art green alligator in an orange shirt'),
    link: { label: 'View on itch.io', href: 'https://steinvisionstudios.itch.io/get-gator-back' },
  },
  {
    slug: 'transyl-mania',
    title: 'Transyl-Mania',
    description: 'A 2D top-down action-adventure. Cursed into a vampire, you must fight, feed, and escape the castle before the night claims you.',
    role: 'TODO: role',
    tools: ['Unity', 'C#', 'Pixel art'],
    context: 'NES Jam 2026',
    ...art('transyl-mania', 'Transyl-Mania', 'the title over a dark castle courtyard with a vampire holding a key', 960, 644, 'Pixel-art vampire in a black cape'),
    link: { label: 'Play on itch.io', href: 'https://1braincellgames.itch.io/transyl-mania' },
  },
  {
    slug: 'quantiny-control',
    title: 'QuanTINY Control',
    description: 'A three-button arcade game: inspect toys, fix what’s broken, and toss the trash on a chaotic factory line.',
    role: 'TODO: role',
    tools: ['Unity', 'C#', 'Pixel art'],
    context: '8 Bits to Infinity: Three Buttons Jam',
    ...art('quantiny-control', 'QuanTINY Control', 'a toy factory floor with conveyor belts beneath a QuanTINY Control sign', 315, 250, 'Pixel-art red couch'),
    link: { label: 'Play on itch.io', href: 'https://1braincellgames.itch.io/quantiny-control' },
  },
  {
    slug: 'answer-campus',
    title: 'Answer Campus',
    description: 'An episodic narrative game about first-year college life, identity, and the conversations that don’t have easy answers.',
    role: 'UI/UX Designer & Game Design Researcher',
    tools: ['Visual novel', 'Playtesting'],
    context: 'NERDLab',
    ...art('answer-campus', 'Answer Campus', 'three illustrated students in front of a sketched campus building', 630, 500, 'Pixel-art navy graduation cap'),
    link: { label: 'Play on itch.io', href: 'https://nerdlab.itch.io/answer-campus-first-semester' },
  },
  {
    slug: 'wide-receiving',
    title: 'Wide Receiving',
    description: 'Catch footballs, dodge bombs, and survive as long as you can. One hit and it’s game over.',
    role: 'Solo developer',
    tools: ['Unity', 'C#', 'Pixel art'],
    context: 'Solo project',
    ...art('wide-receiving', 'Wide Receiving', 'a receiver catching footballs between goalposts under the line “The catch is on! Go for gold!”', 960, 536, 'Pixel-art football'),
    link: { label: 'Play on itch.io', href: 'https://ellharts.itch.io/widereceiving' },
  },
  {
    slug: 'hoppy-harvester',
    title: 'Hoppy Harvester',
    description: 'A gentle farming game: till the soil, water your plants, and harvest your way through a wholesome day.',
    role: 'TODO: role',
    tools: ['Unity', 'C#'],
    context: 'TODO: context',
    ...art('hoppy-harvester', 'Hoppy Harvester', 'the title over a fenced garden with bunnies and sprouting vegetables', 960, 640, 'Pixel-art white bunny face'),
    link: { label: 'Play on itch.io', href: 'https://ellharts.itch.io/hoppy-harvester' },
  },
];
