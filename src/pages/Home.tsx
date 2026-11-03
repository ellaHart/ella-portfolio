import { ContactSection } from '../components/home/ContactSection';
import { Hero } from '../components/home/Hero';
import { Marquee } from '../components/home/Marquee';
import { SelectedWork } from '../components/home/SelectedWork';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <ContactSection />
    </>
  );
}
