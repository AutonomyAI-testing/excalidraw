import { useState } from "react";

import { DrawingCanvas } from "./DrawingCanvas";
import { useToasts, ToastViewport } from "./useToasts";

type Tag = "all" | "dev" | "design" | "teach" | "meeting";

const USE_CASES: Array<{ tag: Exclude<Tag, "all">; icon: string; title: string; body: string }> = [
  { tag: "dev", icon: "⌬", title: "System architecture", body: "Boxes and arrows for service maps, sequence flows, and data pipelines." },
  { tag: "dev", icon: "⊟", title: "Database schema", body: "Sketch tables and relationships before committing to a migration." },
  { tag: "design", icon: "▱", title: "UI wireframes", body: "Lo-fi screen layouts that don't accidentally look like final designs." },
  { tag: "design", icon: "∿", title: "User flows", body: "Map the path a user takes between screens and decisions." },
  { tag: "teach", icon: "✎", title: "Lecture diagrams", body: "Live whiteboarding during class — students follow the strokes as they appear." },
  { tag: "teach", icon: "∑", title: "Math explanations", body: "Quick formulas and graphs while you talk through a problem." },
  { tag: "meeting", icon: "⚑", title: "Retros", body: "Sticky-note grids for \"what went well, what didn't, what to try next.\"" },
  { tag: "meeting", icon: "↹", title: "Brainstorms", body: "Riff with the team on a shared canvas. Everyone draws their own bits." },
];

const drawSamples = (
  <>
    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M40 30 Q38 80 42 110 Q100 112 160 110 Q162 70 160 30 Q100 28 40 30Z" />
          <path d="M50 50 L150 50 M50 70 L150 70 M50 90 L150 90" />
          <circle cx="60" cy="60" r="3" fill="#10b981" stroke="none" />
          <circle cx="60" cy="80" r="3" fill="#10b981" stroke="none" />
          <circle cx="60" cy="100" r="3" fill="#f59e0b" stroke="none" />
        </g>
      </svg>
      <div className="draw-tile-label">System diagram</div>
    </div>

    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 30 Q18 50 22 70 Q60 72 80 70 Q82 50 80 30 Q50 28 20 30Z" />
          <path d="M80 50 Q110 48 130 50" />
          <path d="M130 50 L122 45 M130 50 L122 55" />
          <path
            d="M130 30 Q128 50 132 70 Q160 72 180 70 Q182 50 180 30 Q155 28 130 30Z"
            stroke="#6965db"
          />
          <path d="M50 70 L50 90" />
          <path d="M50 90 L45 82 M50 90 L55 82" />
          <path d="M20 90 Q18 110 22 130 Q60 132 80 130 Q82 110 80 90 Q50 88 20 90Z" />
        </g>
      </svg>
      <div className="draw-tile-label">Flow chart</div>
    </div>

    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 30 Q70 35 70 65 Q72 80 85 90 Q86 100 87 108 L113 108 Q114 100 115 90 Q128 80 130 65 Q130 35 100 30Z" />
          <path d="M88 115 L112 115 M90 122 L110 122" />
          <path d="M50 50 L46 46 M50 50 L54 46 M50 50 L46 54 M50 50 L54 54" stroke="#f59e0b" />
          <path d="M150 70 L146 66 M150 70 L154 66 M150 70 L146 74 M150 70 L154 74" stroke="#f59e0b" />
          <path d="M155 30 L151 26 M155 30 L159 26 M155 30 L151 34 M155 30 L159 34" stroke="#6965db" />
        </g>
      </svg>
      <div className="draw-tile-label">Idea spark</div>
    </div>

    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M30 110 L170 110" />
          <path d="M30 30 L30 110" />
          <path d="M50 110 L50 80 L70 80 L70 110 Z" fill="#ece9fd" />
          <path d="M80 110 L80 60 L100 60 L100 110 Z" fill="#ece9fd" />
          <path d="M110 110 L110 40 L130 40 L130 110 Z" fill="#ece9fd" />
          <path d="M140 110 L140 70 L160 70 L160 110 Z" fill="#ece9fd" />
          <path
            d="M55 75 Q90 55 120 38 Q145 50 158 70"
            stroke="#6965db"
            strokeWidth="2.5"
          />
        </g>
      </svg>
      <div className="draw-tile-label">Trend chart</div>
    </div>

    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="60" cy="60" r="14" />
          <path d="M40 105 Q40 80 60 78 Q80 80 80 105" />
          <circle cx="140" cy="60" r="14" />
          <path d="M120 105 Q120 80 140 78 Q160 80 160 105" />
          <path d="M75 60 Q100 55 125 60" stroke="#6965db" />
          <text x="92" y="42" fontFamily="Virgil" fontSize="14" fill="#6965db" stroke="none">
            hi
          </text>
        </g>
      </svg>
      <div className="draw-tile-label">Conversation</div>
    </div>

    <div className="draw-tile">
      <svg viewBox="0 0 200 140">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M25 30 Q23 70 27 110 Q100 112 175 110 Q177 70 173 30 Q100 28 25 30Z" />
          <path d="M25 48 L173 48" />
          <circle cx="38" cy="40" r="3" fill="#ef4444" stroke="none" />
          <circle cx="50" cy="40" r="3" fill="#f59e0b" stroke="none" />
          <circle cx="62" cy="40" r="3" fill="#10b981" stroke="none" />
          <path d="M40 70 L160 70 M40 82 L130 82 M40 94 L150 94" />
        </g>
      </svg>
      <div className="draw-tile-label">UI sketch</div>
    </div>
  </>
);

export const Showcase = () => {
  const [tag, setTag] = useState<Tag>("all");
  const { toast, toasts } = useToasts();

  const filtered = USE_CASES.filter((u) => tag === "all" || u.tag === tag);

  return (
    <>
      <section className="tight">
        <span className="badge badge-accent">Live demo</span>
        <h1>Sketch right here on the page.</h1>
        <p className="hero-tagline">A tiny drawing canvas — pick a color, choose a brush size, doodle.</p>
      </section>

      <section className="tight">
        <DrawingCanvas onToast={toast} />
      </section>

      <section>
        <h2>Drawing samples</h2>
        <p className="muted">Inline SVG, hand-styled to match the Excalidraw aesthetic. Hover for a small wiggle.</p>
        <div className="card-grid">{drawSamples}</div>
      </section>

      <section>
        <h2>What people sketch</h2>
        <p className="muted">A handful of common use cases. Click a chip to filter.</p>
        <div className="flex gap-8" style={{ flexWrap: "wrap", marginBottom: 16 }}>
          {(["all", "dev", "design", "teach", "meeting"] as Tag[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`badge ${key === tag ? "badge-ok" : "badge-accent"}`}
              onClick={() => setTag(key)}
            >
              {key === "all" && "All"}
              {key === "dev" && "Engineering"}
              {key === "design" && "Design"}
              {key === "teach" && "Teaching"}
              {key === "meeting" && "Meetings"}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filtered.map((u) => (
            <div className="card" key={u.title}>
              <div className="feature-icon">{u.icon}</div>
              <h3>{u.title}</h3>
              <p>{u.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="center">
        <h2>Ready to try the real thing?</h2>
        <p className="muted">The full canvas — with collaboration, libraries, and export — is one click away.</p>
        <a className="btn btn-primary" href="/" style={{ marginTop: 12 }}>
          Open Excalidraw
        </a>
      </section>

      <ToastViewport toasts={toasts} />
    </>
  );
};
