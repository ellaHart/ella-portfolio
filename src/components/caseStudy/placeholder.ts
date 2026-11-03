import type { CaseStudy, Project } from '../../content/types';

/**
 * The standard structure with clearly marked gaps, for projects whose case
 * study hasn't been written yet (e.g. Tiny Tempo). Every "TODO:" renders as a
 * visible placeholder, so the page shape matches finished case studies.
 */
export function placeholderCaseStudy(project: Project): CaseStudy {
  return {
    duration: project.duration ?? 'TODO: duration',
    tools: ['TODO: tools'],
    projectType: 'TODO: project type',
    problem: {
      question: 'TODO: the challenge, user need, or design problem this project addressed',
      body: ['TODO: why it mattered, and for whom'],
    },
    approach: [
      { title: 'TODO: step', body: 'TODO: what I did and why' },
      { title: 'TODO: step', body: 'TODO: what I did and why' },
      { title: 'TODO: step', body: 'TODO: what I did and why' },
    ],
    results: { statement: 'TODO: outcomes, deliverables, and key takeaways (no invented metrics)' },
    chapters: [
      { id: 'process', title: 'Process', blocks: [{ kind: 'text', body: ['TODO: project-specific detail'] }] },
      { id: 'solution', title: 'Solution', blocks: [{ kind: 'text', body: ['TODO: project-specific detail'] }] },
    ],
    reflection: { body: ['TODO: a concise, project-specific reflection'] },
  };
}
