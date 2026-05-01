import { useState } from "react";
import { Link } from "react-router-dom";

import { useToasts, ToastViewport } from "./useToasts";

type TabKey = "canvas" | "collab" | "export" | "dev";

const FEATURES: Array<{ title: string; body: string }> = [
  { title: "Live collaboration", body: "Real-time multiplayer with end-to-end encryption." },
  { title: "Hand-drawn shapes", body: "Rough.js gives every primitive a sketch feel." },
  { title: "Image embeds", body: "Drag any image onto the canvas — drawn over and annotated freely." },
  { title: "Math (LaTeX)", body: "Mermaid + LaTeX rendering directly inside text elements." },
  { title: "Libraries", body: "Reusable shape sets community-made and shareable." },
  { title: "Export PNG", body: "One-click rasterized export at 1x, 2x, or 3x." },
  { title: "Export SVG", body: "Vector export with embedded fonts." },
  { title: "Dark mode", body: "Full theme support, including auto-follow OS preference." },
  { title: "Keyboard shortcuts", body: "Every tool one tap away. Cheat sheet in the menu." },
  { title: "Smart arrows", body: "Bind arrows to shapes — they follow as you drag." },
];

const FAQS = [
  {
    q: "Is Excalidraw really free?",
    a: "Yes — the open-source app and the React component are MIT-licensed and free to use, including commercially. There's a paid hosted version (Excalidraw+) for teams that want multi-board management and SSO.",
  },
  {
    q: "Where is my drawing stored?",
    a: "Locally, in your browser's localStorage. When you collaborate, the snapshot lives in an end-to-end encrypted Firebase document — the server never has the key.",
  },
  {
    q: "Can I embed Excalidraw in my own app?",
    a: "Yes — install @excalidraw/excalidraw, drop the React component, and configure props. See the developer docs for hooks like onChange and excalidrawAPI.",
  },
  {
    q: "Does it work offline?",
    a: "The web app installs as a PWA. Once cached, it loads and saves locally without a network connection.",
  },
];

export const Features = () => {
  const [tab, setTab] = useState<TabKey>("canvas");
  const [filter, setFilter] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [smooth, setSmooth] = useState(60);
  const [rough, setRough] = useState(2);
  const [autosave, setAutosave] = useState(true);
  const [grid, setGrid] = useState(false);
  const [systemTheme, setSystemTheme] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast, toasts } = useToasts();

  const filtered = FEATURES.filter(
    (f) =>
      !filter.trim() ||
      (f.title + " " + f.body).toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <>
      <section className="hero">
        <div>
          <span className="badge badge-accent">Features</span>
          <h1>Everything Excalidraw can do.</h1>
          <p className="hero-tagline">
            A guided tour of the canvas, the collaboration layer, and the developer surface — with
            live UI you can poke at along the way.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" to="/showcase">
              See live demos
            </Link>
            <button className="btn btn-secondary" type="button" onClick={() => setModalOpen(true)}>
              Subscribe to updates
            </button>
          </div>
        </div>
        <div aria-hidden>
          <svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg">
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M30 50 Q28 80 32 110 Q90 112 130 108 Q132 80 130 50 Q80 48 30 50Z" />
              <text x="50" y="85" fontFamily="Virgil" fontSize="18" stroke="none" fill="currentColor">
                Idea
              </text>
              <path d="M132 80 Q170 76 200 80" />
              <path d="M200 80 L192 75 M200 80 L192 85" />
              <path
                d="M205 50 Q203 85 208 115 Q280 113 350 110 Q352 80 348 50 Q280 48 205 50Z"
                stroke="#6965db"
              />
              <text x="240" y="85" fontFamily="Virgil" fontSize="18" stroke="none" fill="#6965db">
                Diagram
              </text>
              <path d="M120 170 Q100 168 100 185 Q90 188 95 200 Q105 210 130 208 Q175 215 200 200 Q215 195 210 180 Q205 168 185 170 Q170 155 145 165 Q130 162 120 170Z" />
              <text x="135" y="195" fontFamily="Virgil" fontSize="14" stroke="none" fill="currentColor">
                shareable
              </text>
            </g>
          </svg>
        </div>
      </section>

      <section>
        <h2>Pick a topic</h2>
        <p className="muted">Tabs, accordions, switches, sliders — all the controls live for you to play with.</p>
        <div className="tabs" role="tablist">
          {(["canvas", "collab", "export", "dev"] as TabKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`tab ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {key === "canvas" && "Canvas"}
              {key === "collab" && "Collab"}
              {key === "export" && "Export"}
              {key === "dev" && "Developer"}
            </button>
          ))}
        </div>

        {tab === "canvas" && (
          <div className="tab-panel">
            <div className="card-grid">
              <div className="card">
                <div className="feature-icon">▱</div>
                <h3>Shapes that wobble</h3>
                <p>
                  Rectangles, ellipses, diamonds, arrows, free-draw — every shape uses rough.js for
                  that hand-sketched feel.
                </p>
              </div>
              <div className="card">
                <div className="feature-icon">⌘</div>
                <h3>Command palette</h3>
                <p>
                  Hit <code>Ctrl/⌘ K</code> to fuzzy-search every action without leaving the keyboard.
                </p>
              </div>
              <div className="card">
                <div className="feature-icon">∞</div>
                <h3>Infinite canvas</h3>
                <p>
                  Pan and zoom freely. Drawings autosave to <code>localStorage</code>, so a refresh
                  never loses work.
                </p>
              </div>
              <div className="card">
                <div className="feature-icon">⌫</div>
                <h3>Undo / redo</h3>
                <p>Full history with branching-aware reconciliation when collaborating live.</p>
              </div>
            </div>
          </div>
        )}

        {tab === "collab" && (
          <div className="tab-panel">
            <h3>Live collaboration</h3>
            <p>
              Click <em>Share</em>, send the link, and you're sketching together in real time. Cursors,
              selection, and edits all sync — and the room is end-to-end encrypted, so the server
              never sees your drawing.
            </p>
            <ul>
              <li>WebSocket-based with automatic reconnection</li>
              <li>Conflict-free reconciliation when two clients edit at once</li>
              <li>Per-user cursor color and name</li>
              <li>Followable presence (jump to another participant's view)</li>
            </ul>
          </div>
        )}

        {tab === "export" && (
          <div className="tab-panel">
            <h3>Export anywhere</h3>
            <p>Drawings move out cleanly:</p>
            <div className="card-grid">
              <div className="card">
                <h3>PNG / SVG</h3>
                <p>Pixel or vector, with an optional dark-background variant.</p>
              </div>
              <div className="card">
                <h3>.excalidraw</h3>
                <p>Lossless JSON — re-import to keep editing later.</p>
              </div>
              <div className="card">
                <h3>Clipboard</h3>
                <p>Copy as image and paste straight into Slack, Notion, or a PR.</p>
              </div>
              <div className="card">
                <h3>Embed link</h3>
                <p>Read-only public link with a fixed snapshot of the canvas.</p>
              </div>
            </div>
          </div>
        )}

        {tab === "dev" && (
          <div className="tab-panel">
            <h3>For developers</h3>
            <p>
              The whole canvas ships as a React component. Drop it in, pass initial elements, hook up{" "}
              <code>onChange</code>, done.
            </p>
            <pre className="code-block">
              <code>{`import { Excalidraw } from "@excalidraw/excalidraw";

<Excalidraw
  initialData={{ elements, appState }}
  onChange={(elements, state) => save(elements)}
  theme="light"
/>`}</code>
            </pre>
            <p className="muted">Used by VS Code, Obsidian, Notion-style apps, and many internal tools.</p>
          </div>
        )}
      </section>

      <section>
        <h2>Search the feature list</h2>
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type to filter — try 'collab' or 'export'"
          aria-label="Filter features"
        />
        <div className="card-grid">
          {filtered.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
          {filtered.length === 0 && <p className="muted">No matching features.</p>}
        </div>
      </section>

      <section>
        <h2>Quick controls</h2>
        <p className="muted">Fake settings panel. Nothing wired to real preferences — these are here to play with.</p>

        <div className="card">
          <div className="row-setting">
            <div>
              <strong>Auto-save to browser</strong>
              <div className="row-meta">
                Drawings stay in <code>localStorage</code>.
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={autosave}
                onChange={(e) => setAutosave(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="row-setting">
            <div>
              <strong>Show grid</strong>
              <div className="row-meta">Snap shapes to a faint background grid.</div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={grid}
                onChange={(e) => setGrid(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="row-setting">
            <div>
              <strong>Use system theme</strong>
              <div className="row-meta">Follow OS dark/light preference.</div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={systemTheme}
                onChange={(e) => setSystemTheme(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="row-setting" style={{ display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <strong>Stroke smoothing</strong>
              <span className="muted">{smooth}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={smooth}
              onChange={(e) => setSmooth(Number(e.target.value))}
            />
          </div>

          <div className="row-setting" style={{ display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <strong>Roughness</strong>
              <span className="muted">{rough}</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={rough}
              onChange={(e) => setRough(Number(e.target.value))}
            />
          </div>

          <div className="row-setting" style={{ display: "block" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <strong>Connection strength</strong>
              <span className="badge badge-ok">Online</span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: "78%" }} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>FAQ</h2>
        {FAQS.map((faq, idx) => (
          <div key={faq.q} className={`accordion-item ${openFaq === idx ? "open" : ""}`}>
            <button
              type="button"
              className="accordion-trigger"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <span>{faq.q}</span>
              <span className="chevron">▾</span>
            </button>
            <div className="accordion-content">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="center">
        <div className="flex gap-8" style={{ justifyContent: "center", flexWrap: "wrap" }}>
          <div className="tooltip">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => toast("Drawing copied to clipboard")}
            >
              Try a toast
            </button>
            <span className="tip-text">Triggers a notification at the top right</span>
          </div>
          <div className="tooltip">
            <button className="btn btn-secondary" type="button" onClick={() => setModalOpen(true)}>
              Open a modal
            </button>
            <span className="tip-text">Pops a dialog you can close with ✕</span>
          </div>
          <div className="tooltip">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => toast("All shapes reset", 1500)}
            >
              Ghost button
            </button>
            <span className="tip-text">Subtle action — also fires a toast</span>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="modal-overlay" role="dialog" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Get release notes by email</h3>
            <p>We send a short note when there's a new release. No spam, unsubscribe anytime.</p>
            <input type="text" placeholder="you@example.com" aria-label="Email" />
            <div className="modal-actions">
              <button className="btn btn-ghost" type="button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  toast("Subscribed!");
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastViewport toasts={toasts} />
    </>
  );
};
