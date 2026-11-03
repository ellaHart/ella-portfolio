import { ac, answerCampusCaseStudy } from './caseStudies/answerCampus';
import { fn, fortniteCaseStudy } from './caseStudies/fortnite';
import { md, minecraftDungeonsCaseStudy } from './caseStudies/minecraftDungeons';
import { tinyTempoCaseStudy, tt } from './caseStudies/tinyTempo';
import { tip, tippingCaseStudy } from './caseStudies/tipping';
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'answer-campus',
    title: 'Answer Campus',
    headline: 'Designing meaningful player choice in a narrative-driven college experience',
    summary:
      'Designing the in-world phone for NERDLab’s episodic college game (messaging, relationships, notifications, and navigation) and using playtesting to improve the player experience.',
    role: 'UI/UX Designer & Game Design Researcher',
    industry: 'Education · Interactive narrative',
    category: 'Narrative game UX',
    duration: 'Fall 2025 – present',
    year: '2025',
    tags: ['Figma', 'Interaction design', 'Wireframing', 'Narrative UX', 'Playtesting'],
    cover: { src: ac.prototype.poster, alt: ac.prototype.label, width: 1600, height: 900 },
    video: { src: ac.prototype.src, width: ac.prototype.width, height: ac.prototype.height },
    featured: true,
    accent: '#15132b',
    externalLink: { label: 'Play on itch.io', href: 'https://nerdlab.itch.io/answer-campus-first-semester' },
    caseStudy: answerCampusCaseStudy,
  },
  {
    slug: 'minecraft-dungeons',
    title: 'Minecraft Dungeons: UI/UX Redesign',
    headline: 'Exploring player-centered game design through research, usability testing, and iterative interface development.',
    summary:
      'An independent educational redesign of three Minecraft Dungeons interfaces (character selection, the in-game HUD, and inventory & enchantments), shaped by player research and usability testing.',
    role: 'UI/UX Designer',
    industry: 'Gaming / Interactive Entertainment',
    year: '2026',
    tags: ['Figma', 'Photoshop', 'Player research', 'Usability testing', 'Game UI'],
    cover: md.inventoryFinal,
    video: { src: '/videos/minecraft-dungeons-preview.mp4', width: 1920, height: 1080 },
    metrics: [
      { value: '3', label: 'Redesigned interfaces' },
      { value: '2', label: 'Usability testing participants' },
      { value: '3', label: 'Usability tasks' },
    ],
    featured: true,
    accent: '#1e1c22',
    externalLink: { label: 'About the ELVTR course', href: 'https://elvtr.com/course/ux-ui-for-gaming' },
    caseStudy: minecraftDungeonsCaseStudy,
  },
  {
    slug: 'tipping-reimagined',
    title: 'Tipping, Reimagined',
    headline: 'Designing a more thoughtful digital tipping experience.',
    summary:
      'A redesign of my first coded tipping screen that makes digital tipping feel like a choice rather than an obligation, built around warmer language, a softer palette, and a slider.',
    role: 'UI/UX Designer',
    industry: 'Retail · Point of sale',
    category: 'Interaction design',
    duration: '3 weeks',
    year: '2026',
    tags: ['Figma', 'Interaction design', 'Human-centered design', 'Prototyping'],
    cover: { src: tip.prototype.poster, alt: tip.hero.alt, width: 1400, height: 788 },
    video: { src: tip.prototype.src, width: tip.prototype.width, height: tip.prototype.height },
    featured: true,
    accent: '#5b3a2a',
    caseStudy: tippingCaseStudy,
  },  {
    slug: 'fortnite',
    title: 'Fortnite',
    headline: 'Exploring game UI through visual design & accessibility',
    summary: 'Exploring Fortnite’s visual language through interface design, style guide development, and accessibility testing.',
    role: 'UI Designer',
    industry: 'Gaming / Interactive Entertainment',
    category: 'Game UI Design',
    duration: '2 weeks',
    year: '2026',
    tags: ['Photoshop', 'Visual design', 'Style guide', 'Color-vision simulation', 'Game UI'],
    cover: fn.refined,
    video: { src: '/videos/fortnite-preview.mp4', width: 1920, height: 1080 },
    featured: true,
    accent: '#0b3fb3',
    caseStudy: fortniteCaseStudy,
  },
  {
    slug: 'tiny-tempo',
    title: 'Tiny Tempo',
    headline: 'Designing a Connected Maternal Health Experience',
    summary:
      'A conceptual maternal health monitoring system connecting an envisioned wearable belly band, a parent app, and a provider dashboard. My focus within the three-person team was the UI/UX design and interactive prototype.',
    role: 'UI/UX Design, Prototyping & System Planning',
    industry: 'Healthcare',
    category: 'Connected health · System design',
    duration: 'Spring 2026',
    year: '2026',
    tags: ['Figma', 'Google Stitch', 'UML', 'Requirements (SRS)', 'Architecture (SAS)'],
    cover: { src: tt.preview.poster, alt: tt.preview.label, width: 1600, height: 900 },
    video: { src: tt.preview.src, width: tt.preview.width, height: tt.preview.height },
    featured: true,
    accent: '#14204a',
    caseStudy: tinyTempoCaseStudy,
  },

];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
