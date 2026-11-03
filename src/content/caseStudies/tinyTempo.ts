import type { CaseStudy, CaseVideoAsset, ImageAsset } from '../types';

/*
 * Tiny Tempo (CSC 431, Introduction to Software Engineering, University of Miami)
 * Sources: the team's Final SRS and SAS, and Ella's course reflection.
 *
 * Attribution rules for this page:
 * - Team (Sloan Atkins, Kate Brykalova, Ella Hartsell): SRS, SAS, system models.
 *   Sloan led the functional/non-functional requirements, class diagrams and
 *   behavioral design; Kate the constraints and evolutionary requirements.
 * - Ella: UI/UX design, Figma mockups and prototype, system planning, feature
 *   prioritization, documentation and diagram contributions, presentation.
 * - Conceptual only: the belly band and backend were never built, and nothing
 *   was clinically validated or certified. No metrics or outcomes are claimed.
 */

const base = '/images/projects/tiny-tempo';
const img = (file: string, alt: string, width: number, height: number, large?: string): ImageAsset => ({
  src: `${base}/${file}.webp`,
  alt,
  width,
  height,
  ...(large ? { large: `${base}/${large}.webp` } : {}),
});
const clip = (file: string, label: string, width: number, height: number): CaseVideoAsset => ({
  src: `/videos/tiny-tempo/${file}.mp4`,
  poster: `${base}/${file}-poster.webp`,
  width,
  height,
  label,
});
const screen = (file: string, alt: string, height: number) => img(file, alt, 386, height);

export const tt = {
  board: img(
    'board',
    'Tiny Tempo Figma board: ten mobile screens covering login, wearable pairing, the parent dashboard, specialists, messaging, labor alerts, profile, and the provider patient directory, patient detail and device verification',
    2400,
    1611,
    'board-lg',
  ),
  architecture: img(
    'system-architecture',
    'Three-tier architecture from the SAS: a React mobile frontend (parent dashboard, provider dashboard, admin portal, contraction timer, kick counter, alert notifications), a Flask/FastAPI Python backend (sensor processing, alert generation, auth and role management, heart rate analysis, contraction detection, data validation, movement tracking, REST API routing, Bluetooth ingestion), and a Firebase data layer (fetal health records, user profiles and sessions, authentication tokens, monitoring history, device registry, alert logs)',
    1200,
    880,
    'system-architecture-lg',
  ),
  login: screen('screen-login', 'Login screen: “Welcome Back” with email and password fields, a Login button, and Google and Apple sign-in', 883),
  pairing: screen('screen-pairing', '“Connect your Guardian” pairing screen with two numbered steps, a discovered Guardian v2.4 device with a Connect button, and Start Searching Again', 923),
  deviceStatus: screen('screen-device-status', 'Profile screen showing the parent’s week of pregnancy and a Belly Band V2 card reading 88%, connected and monitoring, with a Sync Device button', 894),
  dashboard: screen('screen-dashboard', 'Parent dashboard: heart-rate line with status, a fetal movement card with a daily kick count and weekly bar chart, and a contractions card with recent timings and a Start Timer button', 957),
  wellness: screen('screen-wellness-insight', 'Daily Wellness Insight card suggesting a calm activity based on movement patterns, above the bottom navigation', 703),
  specialists: screen('screen-specialists', '“Our Specialists” directory with search, filters, and a provider card showing specialty, rating, and Contact and Request Care buttons', 872),
  messaging: screen('screen-messaging', 'Secure conversation with a doctor: messages, a shared movement clip, a clinical insight note, and a message field', 1053),
  laborAlert: screen('screen-labor-alert', '“Potential Labor Detected” alert explaining the contraction threshold, with Contact Hospital and Start Timer buttons, followed by contraction frequency, duration and intensity trend', 1042),
  patientDirectory: screen('screen-patient-directory', 'Provider patient directory: totals for patients, active alerts, monitoring required and stable status, above a patient list with gestation', 978),
  patientDetail: screen('screen-patient-detail', 'Provider view of one patient: fetal heart rate trace, uterine activity and oxygen saturation, with Export Report and Start Session actions', 1085),
  deviceApproval: screen('screen-device-approval', 'Device verification: real-time calibration baseline and sensor metrics, then a Clinical Verification panel with Reject Connectivity and Approve Device buttons', 955),
  prototype: clip(
    'tiny-tempo-prototype',
    'Tiny Tempo prototype walkthrough: logging in, pairing the wearable, the parent dashboard and contraction timer, browsing specialists, the profile and device status, messaging a provider, a labor alert, and the provider’s device verification and patient directory',
    1920,
    1080,
  ),
  preview: clip(
    'tiny-tempo-preview',
    'Tiny Tempo prototype highlights: wearable pairing, the parent dashboard, the specialist directory, messaging, and the provider’s device verification and patient directory',
    1600,
    900,
  ),
};

export const tinyTempoCaseStudy: CaseStudy = {
  organization: 'CSC 431, University of Miami',
  duration: 'Spring 2026',
  tools: ['Figma', 'Google Stitch', 'UML', 'Software Requirements Specification (SRS)', 'System Architecture Specification (SAS)'],
  projectType: 'Collaborative Academic Project',
  meta: [
    { label: 'Course', value: 'CSC 431, Introduction to Software Engineering, University of Miami' },
    { label: 'Team', value: 'Sloan Atkins, Kate Brykalova, Ella Hartsell' },
  ],
  intro: [
    'Tiny Tempo is a conceptual maternal health monitoring system connecting an envisioned wearable belly band, a companion mobile application, and a healthcare-provider dashboard.',
    'The proposed system explores how wearable technology could help expecting parents access understandable health information between prenatal appointments while supporting communication with their healthcare providers.',
    'The project was developed by a three-person team as part of a software engineering course. Our deliverables included comprehensive requirements documentation, architectural models, and an interactive interface prototype.',
  ],
  heroVideo: tt.prototype,
  disclaimer:
    'A conceptual software engineering project. The wearable device and backend were not built, and the design was not clinically validated, certified, or deployed. All names and readings in the prototype are illustrative.',

  problem: {
    question:
      'How might wearable technology make health monitoring between prenatal appointments more accessible and reassuring, without encouraging excessive tracking or unnecessary anxiety?',
    body: [
      'Pregnancy can involve long periods between prenatal appointments, leaving expecting parents with limited access to information about their pregnancy.',
      'We wanted to explore how wearable technology could make health monitoring more accessible and reassuring without encouraging excessive tracking or unnecessary anxiety.',
      'The challenge was to design a connected experience that could present complex health information clearly while accounting for the privacy, security, reliability, and technical requirements of a healthcare-related system.',
    ],
  },

  approach: [
    { title: 'UI/UX design', body: 'Developed interface mockups exploring how expecting parents and healthcare providers would interact with the proposed system.' },
    { title: 'Prototyping', body: 'Built an interactive Figma prototype of the parent-facing app and the provider experience.' },
    { title: 'System planning', body: 'Contributed to system modeling and feature prioritization, deciding which features were essential and which were optional.' },
    { title: 'Requirements to journeys', body: 'Worked with my teammates to translate functional requirements and architectural considerations into understandable user journeys.' },
    { title: 'Presentation', body: 'Helped present our technical specifications in a clear, visual way.' },
  ],

  results: {
    statement: 'A comprehensive conceptual system design, supported by three primary team deliverables.',
    highlights: [
      'Software Requirements Specification (SRS): functional requirements, non-functional requirements, constraints, and use cases.',
      'System Architecture Specification (SAS): the proposed architecture, system components, interactions, and behavioral models.',
      'Interactive Figma prototype: the parent-facing application and the healthcare-provider experience, covering device connectivity, health monitoring, provider discovery, messaging, alerts, and patient data review.',
    ],
    note: 'This was a conceptual software engineering project. The wearable device and backend were not developed into a clinically validated or deployed healthcare product.',
  },

  chapters: [
    {
      id: 'understanding-the-system',
      title: 'Understanding the system',
      blocks: [
        {
          kind: 'text',
          heading: 'One experience, multiple perspectives',
          body: [
            'Tiny Tempo was designed around three primary user roles. Each role only sees the data and actions it is permitted to, so the same monitoring information reaches parents and providers in very different forms.',
          ],
        },
        {
          kind: 'cards',
          items: [
            { title: 'Expecting parents', body: 'Access monitoring information, connect their wearable, communicate with providers, and review alerts.' },
            { title: 'Healthcare providers', body: 'Review patient monitoring data, communicate with patients, and manage device-related workflows.' },
            { title: 'Hospital administrators', body: 'Support organizational registration and provider onboarding.' },
          ],
        },
        {
          kind: 'flow',
          steps: ['Wearable belly band', 'Application & data services', 'Parent experience · Provider experience'],
          note: 'Conceptual architecture, not a functioning deployed system. The belly band was specified as conceptual hardware.',
        },
      ],
    },
    {
      id: 'requirements',
      title: 'Translating requirements into design',
      blocks: [
        {
          kind: 'text',
          heading: 'Designing with technical constraints in mind',
          body: ['The project’s software engineering requirements shaped the proposed user experience. Important considerations included:'],
        },
        {
          kind: 'bullets',
          items: [
            'Secure authentication and role-based access.',
            'Wearable device pairing and authorization.',
            'Real-time and historical monitoring information.',
            'Communication between parents and providers.',
            'Notifications and alert handling.',
            'Reliability, performance, and scalability.',
            'Sensitive health data and privacy.',
          ],
        },
        {
          kind: 'text',
          body: [
            'The team proposed a three-tier architecture: a React Native frontend, a Python Flask/FastAPI backend, and a Firebase data layer. It also incorporated an Observer pattern, so new sensor data could update the parent dashboard, the provider dashboard, and the alert system at the same time instead of each polling separately.',
            'For the interface, this meant every screen could assume live data from a shared source. The dashboards, contraction timer, and alerts were designed as views of the same information, and device status is surfaced wherever a reading depends on the wearable being connected.',
          ],
        },
        { kind: 'figure', images: [tt.architecture], caption: 'Proposed three-tier architecture, from the team’s SAS. Select to expand.', expandable: true },
      ],
    },
    {
      id: 'parent-experience',
      title: 'Designing the parent experience',
      blocks: [
        {
          kind: 'text',
          heading: 'Making complex information approachable',
          body: ['I organized the parent-facing prototype around three journeys, each answering a different question a parent might have.'],
        },
        {
          kind: 'text',
          heading: 'Journey 1: Getting connected',
          body: [
            'Pairing hardware is often where a connected product first loses people. The flow breaks it into short, numbered steps with plain instructions, shows the discovered device with a single Connect action, and offers a way to search again. Once paired, the device and its connection status stay visible on the parent’s profile.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Login', caption: 'A calm, familiar entry point with email or Google and Apple sign-in.', image: tt.login },
            { title: 'Device discovery & pairing', caption: 'Numbered steps, a discovered device, and one Connect action.', image: tt.pairing },
            { title: 'Connection status', caption: 'The belly band’s connection and sync state, always visible.', image: tt.deviceStatus },
          ],
        },
        {
          kind: 'text',
          heading: 'Journey 2: Understanding health information',
          body: [
            'The dashboard leads with one clear status, then breaks monitoring into separate cards for heart rate, fetal movement, and contractions. Each card pairs a single large figure with a short plain-language sentence and a simple chart, so the meaning comes before the detail. Supportive summaries like the daily wellness insight turn the data into something a parent can act on.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Parent dashboard', caption: 'Heart rate, fetal movement, and contraction tracking in readable cards.', image: tt.dashboard },
            { title: 'Monitoring summary', caption: 'A gentle daily insight instead of more numbers.', image: tt.wellness },
          ],
        },
        {
          kind: 'text',
          heading: 'Journey 3: Staying connected to care',
          body: [
            'These features were intended to support communication between appointments. Parents can browse specialists with clear profiles, message their provider securely and share a recording, and receive alerts that explain what is happening and point to the next step.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Provider directory & profiles', caption: 'Specialties, ratings, and direct Contact and Request Care actions.', image: tt.specialists },
            { title: 'Messaging', caption: 'Secure conversation with a provider, including shared clips.', image: tt.messaging },
            { title: 'Alerts', caption: 'An alert that explains itself and offers clear next steps.', image: tt.laborAlert },
          ],
          board: { image: tt.board, label: 'Full prototype overview, parent and provider screens. Select to expand.' },
        },
      ],
    },
    {
      id: 'provider-experience',
      title: 'Designing for healthcare providers',
      blocks: [
        {
          kind: 'text',
          heading: 'Supporting both sides of care',
          body: [
            'The system also required an experience for healthcare professionals. The provider-facing prototype explores patient monitoring, alert summaries, individual patient data, and device verification workflows.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Patient directory', caption: 'Alert and monitoring counts across the provider’s assigned patients.', image: tt.patientDirectory },
            { title: 'Patient detail', caption: 'Structured readings and history for one patient.', image: tt.patientDetail },
            { title: 'Device approval', caption: 'Calibration data and an explicit approve or reject decision.', image: tt.deviceApproval },
          ],
        },
        {
          kind: 'tradeoffs',
          items: [
            { a: 'Parents need understandable, supportive information', b: 'Providers need structured data, history, and actionable status', body: 'The same readings appear in both experiences, presented for very different needs.' },
          ],
        },
        {
          kind: 'callout',
          text: 'Designing for two audiences showed me that the same data can need two very different interfaces. Parents need reassurance and plain language; providers need density, history, and clear signals for what needs attention.',
        },
      ],
    },
    {
      id: 'trust',
      title: 'Designing for trust',
      blocks: [
        {
          kind: 'text',
          heading: 'Balancing reassurance and responsibility',
          body: [
            'Healthcare-related interfaces require particular attention to how information is communicated. Tiny Tempo explored ways to make monitoring feel approachable without encouraging obsessive engagement.',
            'The proposed system also needed to consider security, data access, alerts, and the limitations of a conceptual monitoring device. The requirements called for a non-diagnostic disclaimer during onboarding, making clear the app does not replace professional prenatal care.',
          ],
        },
        {
          kind: 'bullets',
          heading: 'Principles we designed around',
          items: [
            'Clear visual hierarchy.',
            'Understandable monitoring information.',
            'Appropriate alert presentation.',
            'Privacy and role-based access.',
            'Transparency about device status.',
            'Distinguishing informational monitoring from clinical diagnosis.',
          ],
        },
      ],
    },
  ],

  reflection: {
    heading: 'Designing beyond the screen',
    body: [
      'Tiny Tempo helped me connect my interests in user experience design and software engineering.',
      'Developing the prototype alongside the SRS and SAS documentation challenged me to think beyond individual interfaces and consider the systems supporting them.',
      'I gained experience translating requirements into user-facing interactions, evaluating which features were essential, and communicating technical ideas through visual design.',
      'The project also reinforced the importance of collaboration. Working closely with my teammates helped me understand how system architecture, product requirements, and interface design influence one another.',
      'Most importantly, Tiny Tempo demonstrated how thoughtful UX design can make complex technical concepts more understandable and approachable.',
    ],
  },
};
