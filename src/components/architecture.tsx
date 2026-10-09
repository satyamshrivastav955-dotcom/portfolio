'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react';
import type { ArchitectureNode, ProjectId } from '@/content/types';

export function Architecture({ nodes }: { nodes: ArchitectureNode[] }) {
  const [active, setActive] = useState(0);
  return <div className="architecture"><div className="architecture-top mono"><span>THE SYSTEM / STEP BY STEP</span><span>SELECT A STAGE TO INSPECT</span></div><div className="architecture-nodes" role="group" aria-label="Architecture stages">{nodes.map((node, index) => <div key={node.name} className="architecture-node-wrap"><button onClick={() => setActive(index)} aria-pressed={active === index} aria-controls="architecture-detail"><span className="mono">0{index + 1}</span><strong>{node.name}</strong><span className="architecture-node-dot" /></button>{index < nodes.length - 1 && <ArrowRight className="architecture-connector" size={20} />}</div>)}</div><div className="architecture-detail" id="architecture-detail" role="status"><span className="mono">0{active + 1} / {nodes[active].name.toUpperCase()}</span><p key={active}>{nodes[active].detail}</p></div><p className="architecture-caption mono">EXPLANATORY DIAGRAM BASED ON THE SUPPLIED PROJECT CATALOG</p></div>;
}

const queryExamples = [
  { label: 'Shallow operation', code: 'query Profile {\n  user(id: "example") {\n    name\n    posts {\n      title\n    }\n  }\n}', depth: 3, path: ['query', 'user', 'posts'] },
  { label: 'Deeply nested operation', code: 'query Nested {\n  user(id: "example") {\n    posts {\n      author {\n        posts {\n          author {\n            name\n          }\n        }\n      }\n    }\n  }\n}', depth: 6, path: ['query', 'user', 'posts', 'author', 'posts', 'author'] },
];

function QueryInspector() {
  const [example, setExample] = useState(0);
  const current = queryExamples[example];
  const exceeded = current.depth > 4;
  return <div className="query-inspector"><div className="demo-heading"><div><span className="eyebrow">INTERACTIVE EXPLANATION</span><h3>The shape changes the decision.</h3></div><span className="demo-badge mono">LOCAL ILLUSTRATION</span></div><div className="example-buttons" role="group" aria-label="Example GraphQL operation">{queryExamples.map((item,index) => <button key={item.label} aria-pressed={example===index} onClick={() => setExample(index)}>{item.label}</button>)}</div><div className="query-layout"><pre><code>{current.code}</code></pre><div className="query-output" aria-live="polite"><div className="query-depth"><span className="mono">SELECTION DEPTH</span><strong>{current.depth.toString().padStart(2,'0')}<span>/ 04</span></strong></div><div className="depth-track">{current.path.map((item,index) => <span key={index} className={index > 3 ? 'over-limit' : ''} title={item}>{index+1}</span>)}</div><p className={exceeded ? 'policy-exceeded' : 'policy-allowed'}>{exceeded ? 'Exceeds the example depth policy' : 'Within the example depth policy'}</p><p>The root selection set counts as depth 1. This example uses a maximum depth of 4; it illustrates one deterministic policy, not the repository’s complete security analysis.</p></div></div></div>;
}

const workflowSteps = ['Brief', 'Assigned', 'In progress', 'In review', 'Delivered'];
const workflowDetails = ['A client submits a project brief.', 'A manager assigns the task and checks scheduling.', 'The assignee prepares a versioned deliverable.', 'A reviewer can approve the submission or request a revision.', 'The approved deliverable completes this example lifecycle.'];
function WorkflowDemo() {
  const [stage, setStage] = useState(0);
  const [version, setVersion] = useState(1);
  return <div className="workflow-demo"><div className="demo-heading"><div><span className="eyebrow">INTERACTIVE EXPLANATION</span><h3>Follow a deliverable through the handoffs.</h3></div><span className="demo-badge mono">SAMPLE WORKFLOW</span></div><ol className="workflow-stages">{workflowSteps.map((step,index) => <li key={step} className={index<=stage?'reached':''} aria-current={stage===index?'step':undefined}><span className="mono">0{index+1}</span>{step}<ArrowDown size={14} /></li>)}</ol><div className="workflow-status" role="status"><span className="mono">EXAMPLE DELIVERABLE / VERSION {version}</span><h4>{workflowSteps[stage]}</h4><p>{workflowDetails[stage]}</p></div><div className="demo-controls">{stage<4 && <button className="small-button" onClick={() => setStage(stage+1)}>{stage===3?'Approve submission':'Advance example'}<ArrowRight size={16} /></button>}{stage===3 && <button className="small-button secondary" onClick={() => { setStage(2);setVersion(version+1); }}>Request revision</button>}<button className="text-link" onClick={() => { setStage(0);setVersion(1); }}><RotateCcw size={14} /> Reset example</button></div><p className="demo-note">A local illustration of explicit task states. No TaskOrbit backend is connected and no project data is submitted.</p></div>;
}

export function ProjectInteraction({ id }: { id: ProjectId }) {
  if (id === 'graphql-sentinel') return <QueryInspector />;
  if (id === 'taskorbit') return <WorkflowDemo />;
  return null;
}
