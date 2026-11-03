import type { Certification, Experience } from './types';

// Roles, dates and outcomes are intentionally left as TODOs. Only areas of
// work named in the brief are filled in. Nothing here should be inferred.
export const experience: Experience[] = [
  {
    organization: 'University of Miami Hurricanettes',
    role: 'TODO: role title',
    period: 'TODO: dates',
    summary: 'Design leadership across visual branding, merchandise development, and creative initiatives.',
    highlights: ['TODO: outcome (e.g. merch line shipped, brand refresh scope)'],
  },
  {
    organization: 'NERDLab',
    role: 'TODO: role title',
    period: 'TODO: dates',
    summary: 'Game design and interactive media research in a collaborative development team, including Answer Campus.',
    highlights: ['TODO: outcome'],
  },
  {
    organization: 'VESL',
    role: 'TODO: role title',
    period: 'TODO: dates',
    summary: 'UX research and interactive experience development.',
    highlights: ['TODO: outcome'],
  },
];

// Titles, dates and verify links are taken from the certificate PDFs
// (public/certifications). Images are page 1 of each PDF, unaltered.
const cert = (slug: string, name: string, date: string, id: string): Certification => ({
  slug,
  name,
  issuer: 'Google · Coursera',
  date,
  credentialUrl: `https://coursera.org/verify/${id}`,
  pdf: `/certifications/${slug}.pdf`,
  thumbnail: {
    src: `/images/desktop/certifications/${slug}-thumb.webp`,
    alt: '',
    width: 480,
    height: 371,
  },
  preview: {
    src: `/images/desktop/certifications/${slug}.webp`,
    alt: `Coursera course certificate awarded to Ella Hartsell for ${name}, an online course authorized by Google, completed ${date}`,
    width: 1800,
    height: 1391,
  },
});

export const certifications: Certification[] = [
  cert('google-foundations-of-ux-design', 'Foundations of User Experience (UX) Design', 'Jun 5, 2026', '287BBXGOG91A'),
  cert('google-start-the-ux-design-process', 'Start the UX Design Process: Empathize, Define, and Ideate', 'Jun 21, 2026', '6AMJ2WPJLV3N'),
  cert('google-build-wireframes-and-low-fidelity-prototypes', 'Build Wireframes and Low-Fidelity Prototypes', 'Jul 13, 2026', 'REDM7JO0AH66'),
  cert('google-conduct-ux-research-and-test-early-concepts', 'Conduct UX Research and Test Early Concepts', 'Oct 22, 2026', '30M7SQV39W06'),
];
