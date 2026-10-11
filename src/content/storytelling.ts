import type { ProjectId } from './types';

export interface DiagramNode { label: string; x: number; y: number; stage: number; }
export interface DiagramEdge { from: number; to: number; stage: number; label?: string; }
interface SystemDiagram { caption: string; nodes: DiagramNode[]; edges: DiagramEdge[]; }
const chain = (labels: string[]): DiagramNode[] => labels.map((label, stage) => ({ label, stage, x: 180, y: 45 + stage * 72 }));
const linear: DiagramEdge[] = Array.from({length: 4}, (_, i) => ({ from: i, to: i + 1, stage: i + 1 }));

// Explanatory topology derived from projects.ts. No live data or measured values.
export const systemDiagrams: Record<ProjectId, SystemDiagram> = {
  argus: {
    caption: 'Perception continues while the separate reasoning path works.',
    nodes: [{label:'VIDEO INPUT',x:180,y:36,stage:0},{label:'YOLO + BYTETRACK',x:97,y:118,stage:1},{label:'POSE / EVENTS',x:97,y:199,stage:1},{label:'QWEN2.5-VL',x:283,y:158,stage:2},{label:'LOG / PRIORITIZE',x:180,y:279,stage:3},{label:'BITCHAT ALERT',x:180,y:359,stage:4}],
    edges: [{from:0,to:1,stage:1},{from:1,to:2,stage:1},{from:0,to:3,stage:2,label:'SEPARATE PATH'},{from:2,to:4,stage:3},{from:3,to:4,stage:3},{from:4,to:5,stage:4}],
  },
  callshield: {
    caption: 'Available signals route conditionally; an explanation precedes any response.',
    nodes: [{label:'AVAILABLE INPUTS',x:190,y:35,stage:0},{label:'AUDIO / SPEAKER',x:93,y:115,stage:1},{label:'TEXT / VIDEO',x:287,y:115,stage:1},{label:'LANGGRAPH',x:190,y:202,stage:2},{label:'RISK EXPLANATION',x:190,y:282,stage:3},{label:'CLIENT INTERFACE',x:190,y:359,stage:4}],
    edges: [{from:0,to:1,stage:1},{from:0,to:2,stage:1},{from:1,to:3,stage:2},{from:2,to:3,stage:2},{from:3,to:4,stage:3},{from:4,to:5,stage:4}],
  },
  'graphql-sentinel': { caption:'Inspect the operation before interpreting the policy decision.', nodes:chain(['OPERATION','QUERY STRUCTURE','POLICY RULES','DECISION','INSPECTABLE TRACE']), edges:linear },
  'hybrid-ai-nids': {
    caption:'Four model perspectives feed a shared risk interpretation. Drift adds context.',
    nodes:[{label:'PREPARED FLOWS',x:190,y:32,stage:0},{label:'RANDOM FOREST',x:91,y:106,stage:1},{label:'AUTOENCODER',x:288,y:106,stage:1},{label:'ISOLATION FOREST',x:91,y:178,stage:1},{label:'LSTM',x:288,y:178,stage:1},{label:'DECISION FUSION',x:190,y:250,stage:2},{label:'SOC / TRIAGE',x:94,y:347,stage:3},{label:'PSI / DRIFT',x:286,y:347,stage:4}],
    edges:[{from:0,to:1,stage:1},{from:0,to:2,stage:1},{from:0,to:3,stage:1},{from:0,to:4,stage:1},{from:1,to:5,stage:2},{from:2,to:5,stage:2},{from:3,to:5,stage:2},{from:4,to:5,stage:2},{from:5,to:6,stage:3},{from:0,to:7,stage:4}],
  },
  'nexus-1': { caption:'Verification reads simulation state; measured error informs a retry.', nodes:chain(['LANGUAGE INTENT','LOCAL LLM PLAN','IK → MUJOCO','VERIFY STATE','ERROR / RECOVERY']), edges:[...linear,{from:4,to:2,stage:4,label:'RETRY'}] },
  'face-blockchain': { caption:'The digest anchors evidence integrity. It does not establish identity.', nodes:chain(['YUNET / SFACE','CANDIDATE SEARCH','INDEPENDENT MATCH','JCS → SHA-256','BASE SEPOLIA']), edges:linear },
  taskorbit: { caption:'Explicit responsibilities connect each handoff. Review can return a revision.', nodes:chain(['CLIENT / BRIEF','MANAGER / ALLOCATE','ASSIGNEE / SUBMIT','REVIEWER / REVIEW','APPROVED DELIVERY']), edges:[...linear,{from:3,to:2,stage:3,label:'REVISE'}] },
  'student-intelligence': { caption:'Explanations and counterfactuals support human judgment, with protected attributes fixed.', nodes:chain(['PREPARE INPUTS','MODEL PREDICTION','TREESHAP','DICE SCENARIOS','FAIRNESS / AUDIT']), edges:linear },
};

export const signalDescriptions = [
  { name:'Audio', detail:'Synthetic-voice analysis inspects the available speech signal.' },
  { name:'Speaker', detail:'Speaker-verification signals examine the claimed speaker.' },
  { name:'Language', detail:'Scam language, urgency, and financial intent provide contextual signals.' },
  { name:'Video', detail:'Video-deepfake analysis is an additional path when video is available.' },
];
export const explanationFactors = [
  { name:'Participation', before:'Lower recorded participation', after:'More opportunities to participate', detail:'A behavioral feature can influence the model’s category. Changing it in a hypothetical scenario does not establish a causal improvement in performance.' },
  { name:'Absences', before:'More recorded absences', after:'Additional attendance support', detail:'Absence patterns are present in the repository attribution figure. Their association is model- and dataset-specific; individual circumstances require human interpretation.' },
  { name:'Learning resources', before:'Limited access to learning resources', after:'Improved resource access', detail:'Resource access can provide context for a prediction. Scenario exploration should support a student, rather than treat a prediction as a fixed judgment.' },
];
