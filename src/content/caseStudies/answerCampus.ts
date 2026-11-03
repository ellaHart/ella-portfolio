import type { CaseStudy, CaseVideoAsset, ImageAsset } from '../types';

/*
 * Answer Campus (NERDLab, University of Miami)
 *
 * Attribution rules for this page:
 * - Ella: Figma wireframes/mockups, phone interface and messaging interaction
 *   design, notification/navigation discussions, playtesting, research notes,
 *   design recommendations.
 * - Development team (Clay; lead developer Meredith): Unity implementation.
 * - Findings keep implemented changes, discussed ideas and open
 *   recommendations distinct. No participant counts or metrics are claimed.
 * Excerpts are quoted from Ella's "Answer Campus Playtest Notes".
 */

const base = '/images/projects/answer-campus';
const img = (file: string, alt: string, width: number, height: number, large?: string): ImageAsset => ({
  src: `${base}/${file}.webp`,
  alt,
  width,
  height,
  ...(large ? { large: `${base}/${large}.webp` } : {}),
});
const clip = (file: string, label: string, width: number, height: number, hasAudio = false): CaseVideoAsset => ({
  src: `/videos/answer-campus/${file}.mp4`,
  poster: `${base}/${file === 'answer-campus-prototype' ? 'prototype' : file}-poster.webp`,
  width,
  height,
  label,
  hasAudio,
});

export const ac = {
  board: img(
    'board',
    'Answer Campus Figma board: phone screens for contacts, conversations, response options, reactions and agenda, plus navigation and contact-card variants',
    2400,
    1257,
    'board-lg',
  ),
  friends: img('screen-friends', 'Figma mockup: friends list with character cards showing each contact’s portrait, name and location', 406, 860),
  conversation: img('screen-conversation', 'Figma mockup: conversation with Leilani, with her portrait and location in the header', 406, 860),
  responses: img('screen-responses', 'Figma mockup: two preset replies, “Sure I’ll go!” and “Sorry, I can’t.”, beneath an invitation', 406, 860),
  reactions: img('screen-reactions', 'Figma mockup: a “Choose a reaction” prompt with a row of emoji reactions', 406, 860),
  agenda: img('screen-agenda', 'Figma mockup: agenda listing this week’s and later events such as games and midterms', 406, 860),
  navigation: img('screen-navigation', 'Figma mockup: bottom navigation bar for Locations, Friends and Agenda, shown in several highlight states', 445, 562),
  gameFriends: img('game-friends', 'In-game Friends list showing Leilani’s card with an unread-message badge', 900, 783),
  gameReactions: img('game-reactions', 'In-game conversation with Leilani offering two emoji responses', 900, 783),
  gameAgenda: img('game-agenda', 'In-game Agenda showing Academic Life and Sentinel Football sections', 900, 783),

  prototype: clip('answer-campus-prototype', 'Answer Campus prototype: a tour of the in-game phone interface', 1920, 1080, true),
  messaging: clip('clip-messaging', 'Gameplay: a notification on the Friends list leads into Leilani’s message and an emoji response', 1600, 900),
  map: clip('clip-map', 'Gameplay: opening the campus map from the dorm and choosing a destination', 1600, 900),
  agendaClip: clip('clip-agenda', 'Gameplay: switching to the Agenda tab from the bottom navigation', 1600, 900),
};

export const answerCampusCaseStudy: CaseStudy = {
  organization: 'NERDLab, University of Miami',
  duration: 'Fall 2025 – present',
  tools: ['Figma', 'Unity (development team’s implementation)'],
  projectType: 'Narrative-driven educational game',
  meta: [
    { label: 'Organization', value: 'NERDLab, University of Miami' },
    { label: 'Focus', value: 'Interaction design, wireframing, narrative UX, playtesting, usability evaluation' },
  ],
  intro: [
    'Answer Campus is an episodic narrative-driven game developed at the University of Miami’s NERDLab. The experience explores college life through social interactions, academic challenges, and player-driven decisions.',
    'As a UI/UX Designer and Game Design Researcher, I contributed to the design of the game’s in-world phone interface, exploring how messaging, character relationships, notifications, and navigation could create an authentic and intuitive player experience. I also conducted playtesting and collaborated with the development team to identify usability challenges and improve the overall player experience.',
  ],
  links: [
    { label: 'Play the game', href: 'https://nerdlab.itch.io/answer-campus-first-semester' },
    { label: 'Official project website', href: 'https://games.nerdlab.miami/ac/' },
  ],
  heroVideo: ac.prototype,

  problem: {
    heading: 'Designing freedom within structure',
    question:
      'How might we create authentic, player-driven conversations while balancing narrative complexity, technical constraints, and usability?',
    body: [
      'Answer Campus aims to recreate the freedom and unpredictability of college life. Players navigate relationships, academic responsibilities, and social opportunities while making decisions that influence their experiences. However, creating meaningful player autonomy within a structured narrative presents unique design challenges.',
      'The game already incorporated a relationship system in which player interactions could positively or negatively influence relationships with different characters. Designing the phone’s messaging system required balancing the desire for authentic, expressive conversations with the practical limitations of existing game mechanics, development resources, and production timelines.',
      'My work focused on finding ways to make interactions feel personal and consequential without overwhelming players or introducing unnecessary technical complexity.',
    ],
    notes: [
      { label: 'Existing system', text: 'Relationships that rise or fall with each character based on player interactions.' },
      { label: 'Constraints', text: 'Established mechanics, development resources, and production timelines.' },
      { label: 'Goal', text: 'Conversations that feel personal and consequential, without unnecessary complexity.' },
    ],
  },

  // My contributions only; Unity implementation was the development team's.
  approach: [
    { title: 'Figma wireframes', body: 'Designed the in-game phone: contacts, conversations, preset responses, reactions, agenda, and navigation.' },
    { title: 'Messaging design', body: 'Evaluated freeform versus structured responses with the project lead, favoring choices that connect to the relationship system.' },
    { title: 'Notifications & navigation', body: 'Explored with the project lead when notifications appear and how conversations connect to the campus map.' },
    { title: 'Playtesting', body: 'Played through the game, documented usability issues, and identified patterns in player confusion.' },
    { title: 'Recommendations', body: 'Shared findings and proposed improvements with the project lead and development team.' },
  ],

  results: {
    statement:
      'A phone interface explored in Figma and carried into the playable game by the development team, plus playtest findings that informed changes to navigation and study feedback.',
    highlights: [
      'The development team implemented the phone in Unity, bringing messaging, reactions, agenda information, and navigation into the game’s illustrated world.',
      'Implemented from playtesting: responding to an invitation no longer automatically transports the player; players navigate using the map.',
      'Implemented from playtesting: distinct feedback for solo studying, group studying, and exams, including timers, streaks, and grade-related feedback.',
      'Discussed or shared as recommendations: minigame onboarding, more frequent character interactions, and message visibility in the conversation UI.',
    ],
    note: 'Changes are labelled as implemented, discussed, or recommended. No usability metrics are claimed.',
  },

  chapters: [
    {
      id: 'designing-the-phone',
      title: 'Designing the phone',
      blocks: [
        {
          kind: 'text',
          heading: 'Designing the in-game phone',
          body: [
            'I created wireframes and interface mockups in Figma to explore how the phone could function as a central point of interaction within the game. It needed to support multiple activities while maintaining a consistent visual language and intuitive navigation.',
            'My explorations included character contacts, messaging conversations, response options, notifications, and an agenda for upcoming activities. Rather than treating these as independent screens, I considered how the different features would work together to support the player’s daily experience.',
          ],
        },
        {
          kind: 'screens',
          items: [
            { title: 'Contacts & profiles', caption: 'Character cards show each contact’s portrait, name, and where they are on campus.', image: ac.friends },
            { title: 'Conversations', caption: 'The conversation header keeps who you’re talking to, and where they are, in view.', image: ac.conversation },
            { title: 'Preset responses', caption: 'Replies sit beneath the latest message so each choice can connect to the relationship system.', image: ac.responses },
            { title: 'Reactions', caption: 'Emoji reactions offer a lighter, quicker way to respond than a full reply.', image: ac.reactions },
            {
              title: 'Agenda',
              caption: 'Groups this week’s and later events, so players can keep track of things like final exams and important events.',
              image: ac.agenda,
            },
            { title: 'Persistent navigation', caption: 'A fixed bar for Locations, Friends, and Agenda; the variants explore how the active section is highlighted.', image: ac.navigation },
          ],
          board: { image: ac.board, label: 'The complete Figma board. Select to explore it at full resolution.' },
        },
      ],
    },
    {
      id: 'player-agency',
      title: 'Player agency',
      blocks: [
        {
          kind: 'text',
          heading: 'Balancing expression and feasibility',
          body: [
            'One of the most important interaction design decisions involved determining how players should respond to messages. We explored whether players should be able to compose their own messages or choose from predefined responses.',
            'Freeform messaging offered greater expressive freedom but introduced substantial complexity for a game with established narrative branches and relationship mechanics. Predefined responses offered a more feasible approach, allowing dialogue choices to connect to the existing relationship system while keeping interactions understandable and consistent.',
            'I worked closely with the project lead to evaluate these tradeoffs and explore how structured responses could still feel natural and meaningful.',
          ],
        },
        {
          kind: 'proscons',
          items: [
            {
              title: 'Freeform messaging',
              pros: ['Greater expressive freedom.', 'Potentially more personal conversations.', 'Increased sense of autonomy.'],
              cons: ['Difficult to integrate with existing relationship mechanics.', 'More complex narrative interpretation.', 'Greater development scope.'],
            },
            {
              title: 'Structured responses',
              pros: [
                'Compatible with existing relationship systems.',
                'Clearer interaction states.',
                'More manageable narrative branching.',
                'Feasible within project constraints.',
              ],
              cons: ['Less freedom of expression.', 'Requires thoughtful writing and interaction design to feel authentic.'],
            },
          ],
        },
        {
          kind: 'quote',
          text: 'Meaningful player agency doesn’t require unlimited choices. It requires choices that feel intentional and consequential.',
        },
      ],
    },
    {
      id: 'messaging-navigation',
      title: 'Messaging & navigation',
      blocks: [
        {
          kind: 'text',
          heading: 'Connecting conversations to exploration',
          body: [
            'The phone was designed to do more than facilitate conversations. It also needed to communicate opportunities, support character relationships, and help players navigate the campus.',
            'I collaborated with the project lead to explore when notifications should appear, how players should respond to invitations, and how conversations could connect to the game’s navigation system.',
          ],
        },
        { kind: 'video', video: ac.messaging, caption: 'Gameplay: a Friends-list notification leads into a message and an emoji response.' },
        {
          kind: 'flow',
          steps: ['Receive notification', 'Open conversation', 'Choose response', 'Check map', 'Navigate campus'],
          note: 'The intended interaction concept. Not every message follows this exact sequence.',
        },
        {
          kind: 'text',
          body: [
            'A central consideration was preserving the game’s intended sense of exploration. Rather than automatically directing players through every interaction, the experience needed to encourage independent decision-making while providing enough information to prevent confusion.',
          ],
        },
        { kind: 'video', video: ac.map, caption: 'Gameplay: from the dorm, the campus map lets players decide where to go next.' },
      ],
    },
    {
      id: 'figma-to-gameplay',
      title: 'From Figma to gameplay',
      blocks: [
        {
          kind: 'text',
          heading: 'Translating design into a playable experience',
          body: [
            'Throughout development, I worked closely with the project lead to align the phone’s interaction design with the game’s narrative goals and technical requirements. My responsibilities centered on Figma wireframes, interface mockups, interaction design, and usability evaluation.',
            'The development team, including Clay and lead developer Meredith, handled implementation in Unity. The resulting interface incorporated messaging, character interactions, reactions, agenda information, and navigation into the game’s illustrated world.',
          ],
        },
        {
          kind: 'pairs',
          label: 'Design exploration → In-game interface',
          items: [
            {
              title: 'Friends list',
              design: ac.friends,
              built: ac.gameFriends,
              caption: 'Contact cards explored in Figma, beside the in-game Friends list, where a badge flags unread messages.',
            },
            {
              title: 'Reactions',
              design: ac.reactions,
              built: ac.gameReactions,
              caption: 'Reaction-based replies explored in Figma, beside the emoji responses players choose in game.',
            },
            {
              title: 'Agenda',
              design: ac.agenda,
              built: ac.gameAgenda,
              caption: 'The agenda concept beside the in-game Agenda, which lists academic dates and Sentinel football games.',
            },
          ],
        },
        {
          kind: 'callout',
          text: 'These are design-to-gameplay comparisons showing how ideas evolved through collaboration, not a one-to-one handoff. Implementation was by the development team.',
        },
        { kind: 'video', video: ac.agendaClip, caption: 'Gameplay: moving between phone sections with the persistent bottom navigation.' },
      ],
    },
    {
      id: 'playtesting',
      title: 'Usability evaluation',
      blocks: [
        {
          kind: 'text',
          heading: 'Learning from the player experience',
          body: [
            'As development progressed, I participated in playtesting to evaluate how players understood and interacted with the game. I documented usability issues, identified patterns in player confusion, and proposed actionable improvements.',
            'My findings extended beyond the phone interface to include navigation, minigame learnability, progression feedback, character memory, and dialogue authenticity.',
          ],
        },
        {
          kind: 'findings',
          source: 'Excerpts are quoted from my playtest notes. Labels distinguish changes the team implemented from ideas discussed and recommendations still open.',
          items: [
            {
              title: 'Navigation & player guidance',
              observation: 'Players were sometimes uncertain about where to go, how to respond to messages, or what to do after completing activities.',
              recommendation: 'Improve contextual feedback and clarify how messages connect to the campus map.',
              response:
                'The team implemented a navigation change: responding to an invitation no longer automatically transports the player. Instead, players are encouraged to navigate using the map.',
              status: 'implemented',
              insight: 'Preserve exploration while making available actions easier to understand.',
              excerpt: 'The player was unsure how to respond to messages, could not remember where Brad was, and did not know when the library study session would end.',
            },
            {
              title: 'Minigame learnability',
              observation: 'The eraser-based studying minigame was initially confusing because its interaction differed from player expectations.',
              recommendation: 'Introduce clearer onboarding and provide stronger visual cues about the intended interaction.',
              response: 'A tutorial concept was discussed with the team.',
              status: 'discussed',
              insight: 'Unfamiliar mechanics need clear feedback and an understandable introduction.',
              excerpt: 'The eraser minigame was not intuitive because the player expected to collect/interact with objects rather than erase them.',
            },
            {
              title: 'Progression & pacing',
              observation: 'Studying activities sometimes felt repetitive, and players lacked clear indicators of progress or completion.',
              recommendation: 'Introduce clearer progress feedback and differentiate the experience of various studying methods.',
              response:
                'The development team implemented distinct feedback systems for solo studying, group studying, and exams, including timers, streaks, and grade-related feedback.',
              status: 'implemented',
              insight: 'Feedback can reinforce the purpose of an activity while making progression more understandable.',
              excerpt: 'The library study session repeatedly uses the same words, has no visible indication of when it will end, and lasts for eight rounds.',
            },
            {
              title: 'Character memory & engagement',
              observation: 'Long gaps between character interactions made it difficult to remember previous conversations and relationships.',
              recommendation: 'Introduce more incidental conversations and contextual reminders.',
              response: 'Additional message interactions were discussed with the team.',
              status: 'discussed',
              insight: 'Narrative continuity depends on maintaining a player’s connection to characters over time.',
              excerpt: 'Long gaps between texts also made the experience feel lonely.',
            },
            {
              title: 'Dialogue & conversation UI',
              observation: 'Some response options obscured previous messages, while certain dialogue felt unnatural for the game’s college setting.',
              recommendation: 'Improve message visibility and refine dialogue for authenticity.',
              response: 'Shared with the team as a recommendation.',
              status: 'recommended',
              insight: 'Conversational interfaces must support both readability and narrative immersion.',
              excerpt: 'Response options cover part of the existing conversation, making previous messages harder to see.',
            },
          ],
        },
      ],
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      blocks: [
        {
          kind: 'text',
          heading: 'Designing within a collaborative development process',
          body: [
            'Working on Answer Campus required balancing player feedback, design goals, narrative complexity, and production constraints. I collaborated with the project lead and development team to discuss usability findings, evaluate potential solutions, and prioritize improvements that could be implemented within the project’s scope.',
            'These conversations reinforced the importance of understanding technical constraints early and designing experiences that support both player needs and the broader goals of the game. The process also demonstrated how usability research can inform decisions beyond visual interface design, including gameplay progression, narrative interactions, and player guidance.',
          ],
        },
        { kind: 'flow', steps: ['Design exploration', 'Development collaboration', 'Playtesting & iteration'] },
      ],
    },
  ],

  reflection: {
    body: [
      'Answer Campus challenged me to think beyond individual screens and consider how interface design influences an entire interactive experience. Designing the phone system required understanding how player choices, narrative relationships, notifications, and navigation connect to one another.',
      'I learned that creating a sense of freedom requires careful structure behind the scenes. Even when a game encourages exploration and ambiguity, players still need clear feedback to understand their options.',
      'Working alongside developers also strengthened my ability to communicate design intentions, evaluate technical tradeoffs, and adapt ideas to an established production environment.',
      'Most importantly, the project reinforced the value of iterative, player-centered design: observing where players struggle, understanding why those difficulties occur, and using those insights to improve the experience.',
    ],
  },
};
