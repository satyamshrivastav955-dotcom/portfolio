'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main id="main" className="not-found container"><span className="mono">AN UNEXPECTED INTERRUPTION</span><h1>LET’S<br />RECONNECT.</h1><p>Something interrupted this view. Try loading it again.</p><button className="small-button" onClick={reset}>Try again</button></main>;
}
