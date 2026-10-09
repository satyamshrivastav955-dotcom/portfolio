import { ActionLink, Mark } from '@/components/ui';
import { Footer } from '@/components/contact';

export default function NotFound() {
  return <><main id="main" className="not-found container"><Mark /><span className="mono">404 / SIGNAL NOT FOUND</span><h1>OFF THE<br /><span>KNOWN PATH.</span></h1><p>This page isn’t part of the system. There are eight other worlds worth exploring.</p><ActionLink href="/#work">Back to the work</ActionLink></main><Footer /></>;
}
