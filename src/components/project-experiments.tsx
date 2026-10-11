'use client';

import Image from 'next/image';
import { useState } from 'react';
import { signalDescriptions, explanationFactors } from '@/content/storytelling';
import type { ProjectId } from '@/content/types';

function SignalWorkbench() {
  const [signals, setSignals] = useState(['Audio', 'Language']);
  return <div className="signal-workbench local-experiment"><div className="demo-heading"><div><span className="eyebrow">CONDITIONAL ANALYSIS</span><h3>Only the available signals enter.</h3></div><span className="demo-badge mono">LOCAL ILLUSTRATION</span></div><p className="experiment-intro">Choose the evidence available in this hypothetical communication. The diagram shows the selected analysis paths; it does not run CallShield or calculate risk.</p><div className="signal-options" role="group" aria-label="Available communication signals">{signalDescriptions.map(signal => <button key={signal.name} aria-pressed={signals.includes(signal.name)} onClick={() => setSignals(current => current.includes(signal.name) ? current.filter(item => item !== signal.name) : [...current, signal.name])}><span>{signals.includes(signal.name) ? '−' : '+'}</span>{signal.name}</button>)}</div><div className="signal-paths" aria-live="polite">{signalDescriptions.filter(signal => signals.includes(signal.name)).map(signal => <div className="signal-path" key={signal.name}><strong>{signal.name}</strong><span>{signal.detail}</span><i aria-hidden="true">→</i></div>)}{!signals.length && <p>No signals selected. Select a signal to trace its analysis path.</p>}<div className="signal-destination"><span className="mono">CONDITIONAL LANGGRAPH WORKFLOW</span><p>{signals.length ? `${signals.length} selected paths → combine available evidence → present an explanation.` : 'Waiting for a selected input.'}</p></div></div><p className="demo-note">Signal detection, risk interpretation, and protective action are separate. No calls are analyzed or blocked here.</p></div>;
}

function ExplanationWorkbench() {
  const [factor, setFactor] = useState(0);
  const [alternative, setAlternative] = useState(false);
  const current = explanationFactors[factor];
  return <div className="explanation-workbench local-experiment"><div className="demo-heading"><div><span className="eyebrow">EXPLANATION / COUNTERFACTUAL</span><h3>A prediction should invite questions.</h3></div><span className="demo-badge mono">HYPOTHETICAL SCENARIO</span></div><p className="experiment-intro">Inspect an actionable feature, then explore a possible support scenario. The repository attribution figure below is actual media; this interaction does not recalculate SHAP values or rerun a model.</p><div className="example-buttons" role="group" aria-label="Inspect an explanatory factor">{explanationFactors.map((item,index) => <button key={item.name} aria-pressed={factor === index} onClick={() => { setFactor(index); setAlternative(false); }}>{item.name}</button>)}</div><div className="explanation-comparison" aria-live="polite"><div><span className="mono">{alternative ? 'ALTERNATIVE SUPPORT SCENARIO' : 'HYPOTHETICAL INPUT'}</span><h4>{alternative ? current.after : current.before}</h4><p>{current.detail}</p></div><div><span className="mono">PREDICTION</span><strong>UNDETERMINED</strong><p>A verified model run would be required to estimate any change. Protected attributes remain fixed.</p></div></div><button className="small-button" aria-pressed={alternative} onClick={() => setAlternative(!alternative)}>{alternative ? 'Return to the input' : 'Explore a support scenario'} <span aria-hidden="true">↗</span></button></div>;
}

function IntegrityWorkbench() {
  const [text, setText] = useState('Example evidence note: independently review the candidate image.');
  const [digest, setDigest] = useState('');
  const [digestInput, setDigestInput] = useState('');
  const [status, setStatus] = useState('');
  const calculate = async () => {
    const input = text;
    try {
      const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
      setDigest(Array.from(new Uint8Array(buffer), byte => byte.toString(16).padStart(2,'0')).join(''));
      setDigestInput(input); setStatus('SHA-256 calculated locally for the exact text above.');
    } catch { setStatus('Local hashing is unavailable in this browser context. Try a secure HTTPS connection.'); }
  };
  return <div className="integrity-workbench local-experiment"><div className="demo-heading"><div><span className="eyebrow">CRYPTOGRAPHIC INTEGRITY</span><h3>Change the evidence. Change the digest.</h3></div><span className="demo-badge mono">REAL LOCAL SHA-256</span></div><p className="experiment-intro">Hash an example text note in your browser. This demonstrates byte-level integrity, not the repository’s full canonical evidence pipeline or a blockchain transaction.</p><label htmlFor="evidence-note">Example evidence note</label><textarea id="evidence-note" value={text} maxLength={2000} onChange={event => setText(event.target.value)} rows={3} /><button className="small-button" onClick={calculate}>Calculate SHA-256 <span aria-hidden="true">→</span></button><div className="digest-result" role="status">{digest && <><span className="mono">{text === digestInput ? 'DIGEST OF THE CURRENT NOTE' : 'NOTE CHANGED / RECALCULATE THE DIGEST'}</span><code>{digest}</code></>}<p>{status}</p></div><p className="demo-note">No content leaves this browser. No wallet, transaction, identity verification, or authorship claim is involved.</p></div>;
}

function ExecutionPhases() {
  const [phase, setPhase] = useState(0);
  const phases = ['ALIGN', 'LIFT', 'LOWER', 'RELEASE'];
  const [failed, setFailed] = useState(false);
  return <div className="execution-phases local-experiment"><div className="demo-heading"><div><span className="eyebrow">SIMULATION / EXECUTION RECORD</span><h3>Inspect the movement in four phases.</h3></div><span className="demo-badge mono">REPOSITORY FRAMES</span></div><div className="phase-crop">{failed ? <p>Execution frames could not be loaded.</p> : <Image src="/projects/nexus-execution.webp" width={1280} height={240} alt={`Repository simulation frame: ${phases[phase].toLowerCase()}.`} onError={() => setFailed(true)} style={{ transform: `translateX(-${phase * 25}%)` }} />}</div><div className="example-buttons" role="group" aria-label="Simulation execution phase">{phases.map((item,index) => <button key={item} aria-pressed={phase === index} onClick={() => setPhase(index)}>{item}</button>)}</div><p className="demo-note">Four source frames, selected manually. These controls do not claim telemetry synchronization with the video. The repository discloses carry assist, then physics-based release and settling.</p></div>;
}

export function ProjectExperiments({ id }: { id: ProjectId }) {
  if (id === 'callshield') return <SignalWorkbench />;
  if (id === 'student-intelligence') return <ExplanationWorkbench />;
  if (id === 'face-blockchain') return <IntegrityWorkbench />;
  if (id === 'nexus-1') return <ExecutionPhases />;
  return null;
}
