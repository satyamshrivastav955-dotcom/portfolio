# Satyam Shrivastav — Engineering the Unseen

<p align="center">
  <strong>Personal engineering observatory and portfolio showcasing intelligent systems, cybersecurity tools, and full-stack software.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## 🧭 Overview

**"Engineering the Unseen"** is an editorial, statically-generated portfolio designed around eight comprehensive engineering projects across artificial intelligence, cybersecurity, robotics simulation, and distributed systems. 

Rather than a conventional resume website, it treats complex engineering as something to be observed and understood: featuring an interactive 3D procedural core, architectural drafting surfaces, editorial typography, and evidence-driven case studies detailing problem statements, trade-offs, architectures, and verification records.

---

## ⚡ Key Highlights

- **Procedural Metal Signal Core (Three.js):** Custom WebGL scene featuring machined metal frames, central signal core, cursor light reflection, and scroll-linked layer explosion. Includes lightweight rendered fallback for low-power or touch devices.
- **Editorial Scrollcraft & Motion (GSAP):** Layered design tokens, kinetic typography, ScrollTrigger-driven narrative pacing, and seamless shared-element project transitions.
- **Eight Deep Technical Case Studies:** Each project features architectural breakdowns, key engineering trade-offs, verified evidence classifications, hardware constraints, and direct repository links.
- **Interactive Explanatory Diagrams:** Interactive simulations demonstrating AST query depth limiting (GraphQL-Sentinel) and lifecycle state transitions (TaskOrbit).
- **Accessibility & Performance First:** Semantic HTML5, keyboard navigation (`Cmd/Ctrl + K` command palette), reduced-motion support, automated Lighthouse compliance, and complete usability without JavaScript.
- **Comprehensive Test Suite:** 38 Playwright end-to-end integration tests covering layout integrity across 320px–1920px viewports, WebGL failure fallbacks, search palette, and deep links.

---

## 🔬 Featured Projects

| # | Project | Domain | Core Technologies |
|---|---------|--------|-------------------|
| **01** | **[ARGUS](https://github.com/satyamshrivastav955-dotcom/ai-surveillance)** | Edge AI & Computer Vision | `Python` `PyTorch` `YOLO` `ByteTrack` `Qwen2.5-VL` `Quantization` |
| **02** | **[CallShield](https://github.com/satyamshrivastav955-dotcom)** | AI Security & Scam Defense | `Python` `LangGraph` `Speech Processing` `FastAPI` `Android` `WebRTC` |
| **03** | **[GraphQL-Sentinel](https://github.com/satyamshrivastav955-dotcom)** | AST Security Gateway | `Node.js` `TypeScript` `GraphQL AST` `Token Bucket` `Redis` |
| **04** | **[Hybrid AI NIDS](https://github.com/satyamshrivastav955-dotcom)** | Network Intrusion Detection | `Python` `Isolation Forest` `Autoencoders` `Snort/Suricata` `Streamlit` |
| **05** | **[NEXUS-1](https://github.com/satyamshrivastav955-dotcom)** | Embodied AI & Robotics | `MuJoCo` `Python` `Ollama (VLM)` `Inverse Kinematics` `Spatial Grounding` |
| **06** | **[Face Blockchain](https://github.com/satyamshrivastav955-dotcom)** | Biometric Cryptographic Audit | `Solidity` `SHA-256` `FaceNet` `Web3.py` `Ethereum/Hardhat` |
| **07** | **[TaskOrbit](https://github.com/satyamshrivastav955-dotcom)** | Enterprise Workflow Orchestration | `Next.js` `FastAPI` `WebSockets` `PostgreSQL` `State Machines` |
| **08** | **[Student Intelligence](https://github.com/satyamshrivastav955-dotcom)** | Explainable Educational Analytics | `Python` `XGBoost` `SHAP` `Fairlearn` `Streamlit` |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Static Export `output: 'export'`)
- **UI & Components:** [React 19](https://react.dev/), Vanilla CSS Design System with Architectural Tokens
- **3D Graphics & Simulation:** [Three.js](https://threejs.org/) (custom procedural shaders, geometries, lighting)
- **Animation & Transitions:** [GSAP 3](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Typography:** Space Grotesk Variable, Bebas Neue, JetBrains Mono
- **Asset Optimization:** [Sharp](https://sharp.pixelplumbing.com/) (WebP lossless/near-lossless pipeline)
- **Testing & Verification:** [Playwright](https://playwright.dev/) & [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v20.9.0 or later
- **npm:** v10.0.0 or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/satyamshrivastav955-dotcom/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Testing & Verification

Run the full verification pipeline:

```bash
# Type check TypeScript files
npm run typecheck

# Lint codebase
npm run lint

# Production build and static HTML export
npm run build

# Run Playwright end-to-end integration test suite
npm test
```

---

## 📂 Project Structure

```text
├── docs/                     # Architectural decisions, design briefs, and release notes
├── public/                   # Static assets (fonts, icons, project media, editorial photography)
│   ├── projects/covers/      # Optimized WebP cover artwork
│   └── projects/editorial/   # Case study implementation plates
├── scripts/                  # Asset conversion & test generation scripts
├── src/
│   ├── app/                  # Next.js App Router (layout, routes, global styles)
│   ├── components/           # UI components (Three.js scene, GSAP animations, case studies)
│   │   ├── hero.tsx          # Kinetic hero with signal core integration
│   │   ├── signal-core.tsx   # Three.js 3D WebGL assembly
│   │   ├── project-gallery.tsx # Editorial project showcase & filters
│   │   └── case-hero.tsx     # Case study hero with cover artwork
│   └── content/              # Strongly-typed data contracts
│       ├── profile.ts        # Personal bio, links, and capabilities
│       ├── projects.ts       # 8 project specifications & technical stories
│       ├── media.ts          # Repository media records and captions
│       └── cover-art.ts      # Artwork mapping and metadata
└── tests/                    # Playwright test specs
```

---

## ⚙️ Content Customization

The portfolio is structured so that personal information and project data can be easily updated via typed configuration files:

- **Profile & Contact:** Edit `src/content/profile.ts` to update your biography, contact email, social links, and experience.
- **Projects & Case Studies:** Edit `src/content/projects.ts` to add, update, or reorganize case studies, architecture steps, and repository links.
- **Project Media & Artwork:** Add or update visual plates in `src/content/media.ts` and `src/content/cover-art.ts`.

---

## 🚢 Deployment & CI/CD

This project is deployed to **Vercel** with automatic continuous deployment enabled:

1. Connect the GitHub repository to your [Vercel](https://vercel.com) account.
2. Vercel automatically detects Next.js static export settings (`output: 'export'`).
3. Every `git push` to `main` triggers an automatic build and deploys to production within minutes.

---

## 👤 Author

**Satyam Shrivastav**
- **GitHub:** [@satyamshrivastav955-dotcom](https://github.com/satyamshrivastav955-dotcom)
- **Portfolio:** [satyamshrivastav.vercel.app](https://satyamshrivastav.vercel.app)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
