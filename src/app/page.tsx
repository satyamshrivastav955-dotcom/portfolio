import { Hero } from '@/components/hero';
import { ProjectGallery } from '@/components/project-gallery';
import { About, BackgroundSections, Philosophy } from '@/components/editorial-sections';
import { Capabilities } from '@/components/capabilities';
import { Contact, Footer } from '@/components/contact';
import { Mark } from '@/components/ui';

export default function Home() {
  return <><main id="main"><Hero /><div className="discipline-strip" aria-hidden="true"><div><span>INTELLIGENT PERCEPTION</span><Mark /><span>TRUSTWORTHY SYSTEMS</span><Mark /><span>GROUNDED EXECUTION</span><Mark /><span>EXPLAINABLE DECISIONS</span><Mark /></div></div><ProjectGallery /><About /><Capabilities /><BackgroundSections /><Philosophy /><Contact /></main><Footer /></>;
}
