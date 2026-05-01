import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const useCounter = (target: number, duration = 1100) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) {
      return;
    }
    started.current = true;
    const start = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) {
        raf = requestAnimationFrame(frame);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
};

const Counter = ({ to }: { to: number }) => {
  const v = useCounter(to);
  return <>{v.toLocaleString()}</>;
};

export const About = () => (
  <>
    <section className="hero">
      <div>
        <span className="badge badge-accent">Open source · 100k+ ★</span>
        <h1>Sketch ideas the way you think them.</h1>
        <p className="hero-tagline">
          Excalidraw is a virtual whiteboard that turns rough strokes into clear diagrams — with a
          hand-drawn feel that keeps things friendly, not corporate.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="/">
            Open the canvas
          </a>
          <Link className="btn btn-secondary" to="/features">
            See features
          </Link>
          <a
            className="btn btn-ghost"
            href="https://github.com/excalidraw/excalidraw"
            target="_blank"
            rel="noreferrer"
          >
            ★ on GitHub
          </a>
        </div>
      </div>
      <div aria-hidden>
        <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M30 40 Q200 35 370 42 Q372 150 365 230 Q200 240 35 232 Q28 140 30 40Z" />
            <path d="M70 200 L70 150 L100 150 L100 200 Z" />
            <path d="M120 200 L120 110 L150 110 L150 200 Z" />
            <path d="M170 200 L170 130 L200 130 L200 200 Z" />
            <path d="M220 200 L220 80 L250 80 L250 200 Z" />
            <path
              d="M80 165 Q135 130 185 145 Q230 100 260 70"
              stroke="#6965db"
              strokeWidth="2.5"
            />
            <path d="M260 70 L252 78 M260 70 L268 80" stroke="#6965db" />
            <path d="M55 200 L320 200" />
            <path d="M55 60 L55 200" />
            <path d="M75 75 Q90 65 115 73 Q140 80 165 70" stroke="#6965db" strokeWidth="2" />
          </g>
          <g transform="translate(290 130) rotate(8)">
            <rect x="0" y="0" width="80" height="68" fill="#fef3c7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 20 L65 20 M10 32 L60 32 M10 44 L55 44"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </section>

    <section>
      <h2>What is Excalidraw?</h2>
      <p>
        Excalidraw is a free, open-source whiteboard tool for sketching diagrams that look hand-drawn.
        It's the simplest path from "I have an idea" to "here's a picture of it" — no setup, no login
        required, just draw.
      </p>
      <p>
        Use it for system diagrams, retro boards, lo-fi UI mockups, math, lesson plans, or any time
        you'd grab a marker and a whiteboard if one were nearby.
      </p>

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-value">
            <Counter to={103000} />+
          </div>
          <div className="stat-label">GitHub stars</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <Counter to={350} />+
          </div>
          <div className="stat-label">Contributors</div>
        </div>
        <div className="stat">
          <div className="stat-value">
            <Counter to={2020} />
          </div>
          <div className="stat-label">First release</div>
        </div>
        <div className="stat">
          <div className="stat-value">MIT</div>
          <div className="stat-label">License</div>
        </div>
      </div>
    </section>

    <section>
      <h2>Why people use it</h2>
      <div className="card-grid">
        <div className="card">
          <div className="feature-icon">✎</div>
          <h3>Hand-drawn aesthetic</h3>
          <p>
            Strokes have a natural wobble that makes diagrams feel like a sketch — easier to riff on
            than something that already looks "final."
          </p>
        </div>
        <div className="card">
          <div className="feature-icon">⌁</div>
          <h3>Zero setup</h3>
          <p>Open a tab, start drawing. Drawings stay local in the browser. No account, no installer.</p>
        </div>
        <div className="card">
          <div className="feature-icon">⇆</div>
          <h3>Live collaboration</h3>
          <p>
            Share a link and sketch on the same canvas with end-to-end encryption. Great for
            whiteboarding remotely.
          </p>
        </div>
        <div className="card">
          <div className="feature-icon">↻</div>
          <h3>Open source</h3>
          <p>
            The whole stack is on GitHub. Fork it, embed it, extend it — there's even a React component
            for that.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2>A short timeline</h2>
      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-date">Jan 2020</span>
          <h4>The original gist</h4>
          <p>
            Christopher Chedeau publishes the first version as a side project — a tiny tool for
            drawing rough boxes and arrows.
          </p>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">2020 – 2021</span>
          <h4>Community takeover</h4>
          <p>
            Hundreds of contributors join. Live collaboration, shape libraries, and the Excalidraw
            npm package land.
          </p>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">2022</span>
          <h4>Excalidraw+</h4>
          <p>A hosted, multi-board version launches to fund continued open-source work.</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">Today</span>
          <h4>Embedded everywhere</h4>
          <p>
            VS Code, Obsidian, Notion, Confluence, and countless internal tools embed the React
            component.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2>How it feels</h2>
      <p>
        Most diagram tools fight you with strict alignment, "smart" connectors, and templates that
        look corporate. Excalidraw's bet is the opposite: <em>let the strokes wobble, let the lines
        be slightly off,</em> and you'll iterate faster because nothing on the canvas pretends to be
        done.
      </p>
      <p className="muted">
        Want to dig in? <Link to="/features">Tour the features</Link> or{" "}
        <Link to="/showcase">try the live demos</Link>.
      </p>
    </section>
  </>
);
