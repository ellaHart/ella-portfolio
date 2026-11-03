import { useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { getProject } from '../content/projects';
import type { ImageAsset } from '../content/types';
import { CaseStudyHero } from '../components/caseStudy/CaseStudyHero';
import { CloserLook } from '../components/caseStudy/CloserLook';
import { ApproachSection, ProblemSection, ReflectionSection, ResultsSection } from '../components/caseStudy/Overview';
import { ProjectNav } from '../components/caseStudy/ProjectNav';
import { placeholderCaseStudy } from '../components/caseStudy/placeholder';
import styles from '../components/caseStudy/CaseStudy.module.css';
import { Lightbox } from '../components/ui/Lightbox';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

/*
 * Every case study renders through this one template, in the same order:
 *   1. Hero  2. The problem → My approach → Results  3. A closer look
 *   4. Reflection  5. Next project / all work
 * Projects without a written case study get the same structure with
 * visible placeholders.
 */
export default function CaseStudy() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const [lightbox, setLightbox] = useState<{ image: ImageAsset; caption?: string } | null>(null);
  useDocumentTitle(project?.title);
  if (!project) return <Navigate to="/work" replace />;

  const cs = project.caseStudy ?? placeholderCaseStudy(project);

  return (
    <article className={styles.page}>
      <CaseStudyHero project={project} cs={cs} />

      <ProblemSection problem={cs.problem} />
      <ApproachSection steps={cs.approach} intro={cs.approachIntro} />
      <ResultsSection results={cs.results} project={project} />

      <CloserLook chapters={cs.chapters} onOpen={(image, caption) => setLightbox({ image, caption })} />

      <ReflectionSection reflection={cs.reflection} />

      <ProjectNav current={project} />

      <Lightbox image={lightbox?.image ?? null} caption={lightbox?.caption} onClose={() => setLightbox(null)} />
    </article>
  );
}
