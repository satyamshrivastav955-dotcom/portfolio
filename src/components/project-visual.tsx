import { useId } from 'react';
import type { ProjectId } from '@/content/types';

function Perception() {
  return <>
    <g stroke="currentColor" fill="none" opacity=".2" strokeWidth=".8"><path d="M40 300 210 150H430L590 300M210 150V65H430V150M210 150 210 300M430 150 430 300M40 300H590M90 265H540M137 233H493M178 204H452M210 178H430" /><path d="M260 150 238 300M320 150V300M380 150 402 300M60 65H570V300H60Z" /><path d="M75 80h85v100H75zM480 80h70v115h-70z" /></g>
    <g className="detected-person" fill="none" stroke="currentColor"><rect x="251" y="92" width="88" height="173" strokeDasharray="5 3" opacity=".65" /><path d="M250 109V92h17m55 0h17v17M250 249v17h17m55 0h17v-17" strokeWidth="2" /><circle cx="295" cy="122" r="12" strokeWidth="2" /><path d="M295 134v58m-26-36 26-11 26 11m-26 36-20 50m20-50 20 50m-46-86-8 34m60-34 8 34" strokeWidth="2" /><g fill="currentColor">{[[295,145],[269,156],[321,156],[295,192],[275,242],[315,242],[261,190],[329,190]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="3" />)}</g></g>
    <g className="detection-secondary" fill="none" stroke="currentColor" opacity=".45"><rect x="386" y="139" width="53" height="108" strokeDasharray="4 3" /><circle cx="411" cy="155" r="7" /><path d="M411 162v37l-13 35m13-35 15 35m-29-55 14-12 15 12" /></g>
    <g fill="currentColor" fontFamily="monospace" fontSize="9"><text x="251" y="82">PERSON / TRACK 01</text><text x="386" y="130">TRACK 02</text><text x="80" y="287" opacity=".6">PERCEPTION → REASONING</text></g>
    <path className="scan-beam" d="M61 150H569" stroke="currentColor" opacity=".45" />
    <g stroke="currentColor" fill="none"><circle cx="98" cy="112" r="18" opacity=".4" /><path d="M98 90v44m-22-22h44" opacity=".5" /></g>
  </>;
}

function SignalFusion() {
  return <>
    <g fill="none" stroke="currentColor" opacity=".2"><circle cx="320" cy="180" r="97" /><circle cx="320" cy="180" r="119" strokeDasharray="2 8" /><path d="M50 180h540M320 30v300" /></g>
    <g className="signal-rings" fill="none" stroke="currentColor"><circle cx="320" cy="180" r="68" opacity=".3" /><circle cx="320" cy="180" r="78" opacity=".15" /></g>
    <path d="m320 131 35 14v35c0 23-15 40-35 48-20-8-35-25-35-48v-35z" fill="currentColor" fillOpacity=".06" stroke="currentColor" strokeWidth="1.5" /><path d="m304 177 11 12 23-25" fill="none" stroke="currentColor" strokeWidth="2" />
    {[0,1,2,3].map((n) => <g key={n} transform={`translate(${n < 2 ? 105 : 455},${n % 2 ? 232 : 97})`}><rect width="80" height="40" rx="3" fill="#101718" stroke="currentColor" strokeOpacity=".4" /><path d="M10 20h5l4-9 5 19 4-24 5 23 5-14 4 8h28" fill="none" stroke="currentColor" strokeWidth="1.2" className="wave-path" /><text x="40" y="57" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">{['VOICE','IDENTITY','LANGUAGE','VIDEO'][n]}</text></g>)}
    <g className="flow-lines" stroke="currentColor" fill="none" strokeDasharray="4 8" opacity=".6"><path d="M185 117h40l28 34m-68 101h40l28-38M455 117h-40l-28 34m68 101h-40l-28-38" /></g>
  </>;
}

function QueryTree() {
  return <>
    <g stroke="currentColor" fill="none" strokeOpacity=".35"><path d="M95 85h140v85h120v80h125M235 85h140M235 170v85H115M355 170h145M355 250v45" /></g>
    {[[95,85,'QUERY'],[235,85,'USER'],[375,85,'NAME'],[235,170,'POSTS'],[115,255,'TITLE'],[355,170,'AUTHOR'],[500,170,'ID'],[480,250,'POSTS'],[355,295,'…']].map(([x,y,label], index) => <g key={label} className="tree-node" style={{ animationDelay: `${index * 0.13}s` }}><rect x={Number(x)-31} y={Number(y)-14} width="62" height="28" rx="2" fill="#151411" stroke="currentColor" strokeOpacity=".6" /><text x={x} y={Number(y)+3} textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor">{label}</text></g>)}
    <text x="460" y="65" fontSize="9" fontFamily="monospace" fill="currentColor" opacity=".65">OPERATION INSPECTION</text>
  </>;
}

function ModelFusion() {
  return <>
    <g stroke="currentColor" fill="none" opacity=".18">{[70,110,150,190,230,270].map((y) => <path key={y} d={`M55 ${y}H585`} />)}{[100,180,260,340,420,500].map((x) => <path key={x} d={`M${x} 55V290`} />)}</g>
    <g stroke="currentColor" fill="none" strokeWidth="1.4">{[0,1,2,3].map((n) => <path key={n} opacity={1-n*.16} className="wave-path" d={`M65 ${95+n*55}l25-3 15 5 20-15 15 24 20-42 15 43 20-17 30 5h75l40 ${170-(95+n*55)}h85`} />)}</g>
    <circle cx="485" cy="170" r="50" stroke="currentColor" fill="#11171d" /><circle cx="485" cy="170" r="39" stroke="currentColor" strokeDasharray="2 5" fill="none" opacity=".5" /><text x="485" y="168" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontSize="11">FUSION</text><text x="485" y="185" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontSize="7" opacity=".6">RISK SIGNAL</text>
    {['RANDOM FOREST','AUTOENCODER','ISOLATION FOREST','LSTM'].map((text,n) => <text key={text} x="68" y={80+n*55} fill="currentColor" fontFamily="monospace" fontSize="7" opacity=".7">{text}</text>)}
  </>;
}

function Robot() {
  return <>
    <g stroke="currentColor" strokeOpacity=".17" fill="none"><path d="M100 263 300 180 540 263 340 345ZM150 283l200-85m-150 107 200-86m-150 108 200-85M150 242l240 83m-190-104 240 83m-190-104 240 83" /></g>
    <ellipse cx="282" cy="273" rx="48" ry="16" fill="currentColor" opacity=".08" /><path d="m245 245 37-16 37 16v22l-37 16-37-16z" fill="#241f2c" stroke="currentColor" strokeOpacity=".5" /><path d="m245 245 37 16 37-16m-37 16v22" stroke="currentColor" opacity=".5" />
    <g className="robot-arm" stroke="currentColor" strokeWidth="1.5" fill="#28212f"><path d="m270 240-7-63 20-8 18 63z" /><circle cx="274" cy="170" r="17" /><path d="m261 157 65-71 19 15-57 79z" /><circle cx="339" cy="92" r="18" /><path d="m345 77 64 47-9 16-72-34z" /><circle cx="408" cy="131" r="11" /><path d="m408 141 3 20m-10-2h20m-20 0v15l5 6m15-22v15l-5 6" fill="none" /></g>
    <g stroke="currentColor" fill="none"><path d="m413 225 18-8 18 8v22l-18 8-18-8zm0 0 18 8 18-8m-18 8v22" /><ellipse cx="431" cy="260" rx="28" ry="12" strokeDasharray="3 4" opacity=".55" /></g>
    <g fill="currentColor" fontFamily="monospace" fontSize="8"><text x="113" y="76">INTENT → ACTION → VERIFICATION</text><text x="467" y="262" opacity=".7">TARGET</text><text x="198" y="290" opacity=".6">6-DOF</text></g>
    <path className="flow-lines" d="M431 212v-35" stroke="currentColor" strokeDasharray="3 5" opacity=".5" />
  </>;
}

function Provenance() {
  return <>
    <g stroke="currentColor" fill="none"><rect x="80" y="90" width="135" height="167" rx="2" strokeOpacity=".4" /><path d="M95 121V105h16m73 0h16v16M95 226v16h16m73 0h16v-16" /><ellipse cx="148" cy="154" rx="28" ry="34" opacity=".6" /><path d="M108 223c0-48 80-48 80 0" opacity=".6" /><path d="m127 144 20-5 20 5m-29 35 10 4 10-4m-10-34v19" opacity=".5" /><path className="flow-lines" d="M230 175h175" strokeDasharray="3 6" opacity=".6" /></g>
    <g fill="currentColor" fontFamily="monospace" fontSize="8"><text x="245" y="157">CANONICAL EVIDENCE</text><text x="255" y="199" opacity=".6">SHA-256 DIGEST</text></g>
    <g className="provenance-block" stroke="currentColor" fill="#201c17"><path d="m419 145 47-28 47 28v57l-47 28-47-28z" /><path d="m419 145 47 28 47-28m-47 28v57" fill="none" /><path d="m435 154 31-18 30 18m-30-18v23" opacity=".4" /></g><text x="466" y="257" textAnchor="middle" fill="currentColor" fontSize="8" fontFamily="monospace">TESTNET ANCHOR</text>
  </>;
}

function Workflow() {
  return <>
    {['EXECUTION','REVIEW','DELIVERED'].map((title, n) => <g key={title}><rect x={67+n*175} y="85" width="157" height="204" rx="3" stroke="currentColor" strokeOpacity=".2" fill="currentColor" fillOpacity=".025" /><circle cx={81+n*175} cy="106" r="3" fill="currentColor" opacity={.4+n*.25} /><text x={92+n*175} y="109" fill="currentColor" fontFamily="monospace" fontSize="8">{title}</text><path d={`M${77+n*175} 123h137`} stroke="currentColor" opacity=".15" />{Array.from({length:n===1?1:2},(_,i) => <g key={i} className="workflow-card" style={{animationDelay:`${n*.3}s`}}><rect x={77+n*175} y={137+i*68} width="137" height="55" rx="2" stroke="currentColor" strokeOpacity=".3" fill="#171723" /><rect x={88+n*175} y={149+i*68} width={52+i*12} height="4" rx="2" fill="currentColor" opacity=".6" /><rect x={88+n*175} y={160+i*68} width="95" height="3" rx="1" fill="currentColor" opacity=".17" /><circle cx={94+n*175} cy={180+i*68} r="4" fill="currentColor" opacity=".4" /></g>)}</g>)}
    <text x="68" y="63" fill="currentColor" fontSize="8" fontFamily="monospace">ONE WORKSPACE. EXPLICIT HANDOFFS.</text>
  </>;
}

function Explanations() {
  return <>
    <g fontFamily="monospace" fontSize="8" fill="currentColor"><text x="85" y="79">UNDERSTAND THE PREDICTION</text><text x="440" y="80" opacity=".6">ATTRIBUTION</text></g>
    <path d="M315 103v176" stroke="currentColor" opacity=".4" />
    {['Engagement','Attendance','Participation','Study behavior','Resources'].map((label,n) => <g key={label} className="attribution-bar" style={{animationDelay:`${n*.15}s`}}><text x="80" y={128+n*31} fill="currentColor" fontSize="9" fontFamily="monospace" opacity=".7">{label}</text><rect x={n%3===0?315-35-n*7:315} y={115+n*31} width={n%3===0?35+n*7:160-n*21} height="18" rx="1" fill="currentColor" opacity={n%3===0?.3:.7-n*.09} /></g>)}
    <text x="315" y="305" textAnchor="middle" fill="currentColor" opacity=".6" fontFamily="monospace" fontSize="8">ILLUSTRATIVE FACTORS · NOT MODEL OUTPUT</text>
  </>;
}

const visuals = { argus: Perception, callshield: SignalFusion, 'graphql-sentinel': QueryTree, 'hybrid-ai-nids': ModelFusion, 'nexus-1': Robot, 'face-blockchain': Provenance, taskorbit: Workflow, 'student-intelligence': Explanations };

export function ProjectVisual({ id, className = '' }: { id: ProjectId; className?: string }) {
  const Visual = visuals[id];
  const uid = useId().replaceAll(':', '');
  return <div className={`project-visual visual-${id} ${className}`} aria-hidden="true"><div className="visual-grain" /><svg viewBox="0 0 640 360" className="project-svg"><defs><radialGradient id={uid}><stop stopColor="currentColor" stopOpacity=".09" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient></defs><ellipse cx="320" cy="180" rx="290" ry="180" fill={`url(#${uid})`} /><Visual /></svg></div>;
}
