import type { SocialLink } from './types';

export const site = {
  name: 'Ella Hartsell',
  title: 'UI/UX Designer & Developer',
  email: 'ella.hartsell@gmail.com',
  resumeHref: '/resume/Ella-Hartsell-Resume.pdf',

  hero: {
    greeting: "Hi, I'm",
    name: 'Ella.',
    statement:
      'I design and develop thoughtful digital experiences that balance usability, functionality, and creativity.',
  },

  disciplines: [
    'UI/UX Design',
    'UX Research',
    'Front-end Development',
    'Interaction Design',
    'Game Development',
    'Creative Technology',
  ],

  about: {
    heading: 'Where systems thinking meets a designer’s eye',
    bio: [
      'I’m a multidisciplinary designer and developer working across computer science and interactive media. I like problems that need both halves of that background: understanding how something works under the hood, then shaping how it feels to the person using it.',
      'My work spans product UI, UX research, front-end development, and game development. That range shows up in how I design: I prototype early, test with real people, and care about the details that make an interface feel considered.',
    ],
    // Draft copy: edit freely.
    approach: [
      { title: 'Understand first', body: 'Start with the people and the problem: research, journeys, and the questions worth testing.' },
      { title: 'Prototype early', body: 'Get ideas into people’s hands quickly, from paper sketches to interactive builds, and let feedback steer.' },
      { title: 'Build it right', body: 'Carry the design into code with care for accessibility, performance, and the small interactions that make it feel finished.' },
    ],
    philosophy:
      'Good design is invisible until it’s missing. I aim for interfaces that feel obvious in hindsight: clear structure, honest feedback, and a little delight where it earns its place.',
    interests: ['Design systems', 'Interaction & motion', 'Player experience', 'Accessible front-ends', 'Creative coding'],
  },

  contact: {
    heading: 'Let’s create something together.',
    blurb: 'Hiring, collaborating, or just curious about the work? My inbox is open.',
  },
} as const;

export const socials: SocialLink[] = [
  { label: 'Email', handle: 'ella.hartsell@gmail.com', href: 'mailto:ella.hartsell@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', handle: 'in/ella-hartsell', href: 'https://www.linkedin.com/in/ella-hartsell', icon: 'linkedin' },
  { label: 'GitHub', handle: 'ellaHart', href: 'https://github.com/ellaHart', icon: 'github' },
  { label: 'itch.io', handle: 'ellharts', href: 'https://ellharts.itch.io/', icon: 'itch' },
];
