import type { Profile } from './types';

export const profile: Profile = {
  name: 'Satyam Shrivastav',
  initials: 'SS',
  headline: 'Engineering intelligent systems for real-world problems.',
  introduction: 'I build AI systems, security tools, and full-stack products that connect intelligent reasoning with practical software engineering.',
  about: 'My work spans computer vision, efficient multimodal inference, cybersecurity, robotics simulation, explainable machine learning, and workflow automation.',
  email: null, // REPLACE_ME: your public contact email.
  location: null, // REPLACE_ME: optional city / country.
  availability: null, // REPLACE_ME: your actual availability, if you want it shown.
  resume: null, // REPLACE_ME: local PDF path or verified public résumé URL.
  siteUrl: null, // REPLACE_ME: final HTTPS production origin, without trailing slash.
  links: [
    { label: 'GitHub', url: 'https://github.com/satyamshrivastav955-dotcom' },
    // REPLACE_ME: append verified LinkedIn / other professional profile URLs.
  ],
  experience: [], // REPLACE_ME: real experience entries. Empty sections are hidden.
  education: [], // REPLACE_ME: real education entries.
  achievements: [], // REPLACE_ME: documented achievements.
};

export const editorial = {
  hero: { first: 'ENGINEERING', second: 'THE UNSEEN.', eyebrow: 'AI SYSTEMS / SECURITY / CREATIVE ENGINEERING', note: 'Turning complex problems into systems that see, reason, and act.' },
  about: { heading: 'Curiosity is the input.\nEngineering is the output.', label: 'THE ENGINEER BEHIND THE SYSTEMS' },
  philosophy: {
    heading: 'The build is only\nhalf the story.',
    introduction: 'Every project should tell a technical story: the problem, the system I designed, the engineering decisions behind it, and the evidence that demonstrates what works.',
    // Editorial chapter labels derived from the supplied portfolio philosophy.
    steps: [
      { number: '01', title: 'Understand the problem', text: 'Start with the real-world problem and the constraints that make it worth solving.' },
      { number: '02', title: 'Design the system', text: 'Connect the components. Make the engineering decisions and trade-offs visible.' },
      { number: '03', title: 'Follow the evidence', text: 'Explain what works, how it was evaluated, and where the limitations remain.' },
    ],
  },
  contact: { heading: 'Great systems start\nwith a conversation.', text: 'Explore the code, follow the experiments, or get in touch through my configured professional links.' },
  seo: { title: 'Satyam Shrivastav — Engineering the Unseen', description: 'AI systems, security tools, and full-stack products by Satyam Shrivastav. Explore eight engineering case studies in perception, reasoning, security, robotics, and explainable machine learning.' },
};

export const capabilities = [
  { id: 'intelligence', number: '01', name: 'Intelligent systems', description: 'From pixels and language to grounded, interpretable decisions.', tools: ['Python', 'PyTorch', 'scikit-learn', 'YOLO', 'Qwen2.5-VL', 'LangGraph'], projects: ['argus', 'callshield', 'student-intelligence'] },
  { id: 'security', number: '02', name: 'Security & trust', description: 'Inspect the signals. Explain the risk. Preserve the evidence.', tools: ['GraphQL', 'Anomaly detection', 'SHA-256', 'Solidity', 'Web3.py', 'Fairlearn'], projects: ['graphql-sentinel', 'hybrid-ai-nids', 'face-blockchain'] },
  { id: 'software', number: '03', name: 'Connected software', description: 'Interfaces, services, and workflows that make systems usable.', tools: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'WebSockets', 'Firebase'], projects: ['taskorbit', 'callshield', 'hybrid-ai-nids'] },
  { id: 'physical', number: '04', name: 'Grounded execution', description: 'Connect high-level intent to measurable outcomes and feedback.', tools: ['MuJoCo', 'Ollama', 'Inverse kinematics', 'Gradio', 'SQLite', 'Docker'], projects: ['nexus-1', 'argus', 'graphql-sentinel'] },
] as const;
