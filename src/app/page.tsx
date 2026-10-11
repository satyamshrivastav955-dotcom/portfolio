import { Hero } from '@/components/hero';
import { ProjectGallery } from '@/components/project-gallery';
import { About, BackgroundSections, Journey } from '@/components/editorial-sections';
import { Capabilities } from '@/components/capabilities';
import { Contact, Footer } from '@/components/contact';

export default function Home() {
  return <><main id="main"><Hero /><ProjectGallery /><About /><Capabilities /><BackgroundSections /><Journey /><Contact /></main><Footer /></>;
}
