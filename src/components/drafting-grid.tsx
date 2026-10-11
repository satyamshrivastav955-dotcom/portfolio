/** A quiet architectural drawing: nested frames descend into a bottom fade. */
export function DraftingGrid() {
  return (
    <div className="hero-grid" aria-hidden="true">
      <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" className="drafting-grid">
        <defs>
          <pattern id="draft-small-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
          <pattern id="draft-large-grid" width="320" height="320" patternUnits="userSpaceOnUse">
            <rect width="320" height="320" fill="url(#draft-small-grid)" />
            <path d="M320 0H0V320" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="draft-downward-fade" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.6" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="draft-mask"><rect width="1440" height="1000" fill="url(#draft-downward-fade)" /></mask>
        </defs>
        <g mask="url(#draft-mask)">
          <rect width="1440" height="1000" fill="url(#draft-large-grid)" opacity="0.18" />
          <g className="drafting-frames" fill="none" stroke="currentColor" strokeWidth="0.7">
            {[0, 1, 2, 3, 4].map((layer) => <rect key={layer} x={770 + layer * 27} y={90 + layer * 42} width={510 - layer * 12} height={520 - layer * 5} opacity={0.24 - layer * 0.033} pathLength="1" />)}
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.38">
            <path d="M74 240h12m-6-6v12M714 160h12m-6-6v12M1274 720h12m-6-6v12M154 720h12m-6-6v12" />
            <path d="M70 110V90h20m1250 0h20v20M70 790v20h20m1250 0h20v-20" />
          </g>
        </g>
      </svg>
    </div>
  );
}
