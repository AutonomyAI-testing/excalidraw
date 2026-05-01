import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Stroke = { color: string; size: number; points: Point[] };

const COLORS = ["#1b1b1f", "#6965db", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

export const DrawingCanvas = ({ onToast }: { onToast: (msg: string) => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentRef = useRef<Stroke | null>(null);
  const drawingRef = useRef(false);

  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;

    const drawStroke = (s: Stroke) => {
      if (s.points.length < 2) {
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.points[0].x, s.points[0].y, s.size / 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    };

    const redraw = () => {
      const c = canvasRef.current;
      const cx = c?.getContext("2d");
      if (!c || !cx) {
        return;
      }
      cx.clearRect(0, 0, c.width, c.height);
      strokesRef.current.forEach(drawStroke);
      if (currentRef.current) {
        drawStroke(currentRef.current);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);

    const pos = (e: PointerEvent | TouchEvent | MouseEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const point =
        "touches" in e && e.touches[0]
          ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
          : { clientX: (e as MouseEvent).clientX, clientY: (e as MouseEvent).clientY };
      return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawingRef.current = true;
      currentRef.current = { color, size, points: [pos(e as MouseEvent)] };
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawingRef.current || !currentRef.current) {
        return;
      }
      e.preventDefault();
      currentRef.current.points.push(pos(e as MouseEvent));
      redraw();
    };
    const end = () => {
      if (currentRef.current) {
        strokesRef.current.push(currentRef.current);
        currentRef.current = null;
      }
      drawingRef.current = false;
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, [color, size]);

  const redrawNow = () => {
    const c = canvasRef.current;
    const cx = c?.getContext("2d");
    if (!c || !cx) {
      return;
    }
    cx.clearRect(0, 0, c.width, c.height);
    strokesRef.current.forEach((s) => {
      cx.strokeStyle = s.color;
      cx.lineWidth = s.size;
      cx.lineCap = "round";
      cx.lineJoin = "round";
      if (s.points.length < 2) {
        cx.fillStyle = s.color;
        cx.beginPath();
        cx.arc(s.points[0].x, s.points[0].y, s.size / 2, 0, Math.PI * 2);
        cx.fill();
        return;
      }
      cx.beginPath();
      cx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        cx.lineTo(s.points[i].x, s.points[i].y);
      }
      cx.stroke();
    });
  };

  const handleClear = () => {
    strokesRef.current = [];
    redrawNow();
    onToast("Canvas cleared");
  };
  const handleUndo = () => {
    strokesRef.current.pop();
    redrawNow();
  };
  const handleSave = () => {
    const c = canvasRef.current;
    if (!c) {
      return;
    }
    const link = document.createElement("a");
    link.download = "excalidraw-sketch.png";
    link.href = c.toDataURL("image/png");
    link.click();
    onToast("Saved as PNG");
  };

  return (
    <div className="draw-shell">
      <div className="draw-toolbar">
        <div className="color-row" role="radiogroup" aria-label="Color">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-swatch ${c === color ? "active" : ""}`}
              style={{ background: c }}
              aria-label={`Color ${c}`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 180 }}>
          <span className="muted" style={{ fontSize: "0.85rem" }}>
            Size
          </span>
          <input
            type="range"
            min={1}
            max={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ maxWidth: 120 }}
          />
          <span className="badge">{size}px</span>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" type="button" onClick={handleUndo}>
          ↶ Undo
        </button>
        <button className="btn btn-secondary btn-sm" type="button" onClick={handleClear}>
          Clear
        </button>
        <button className="btn btn-primary btn-sm" type="button" onClick={handleSave}>
          Save PNG
        </button>
      </div>
      <canvas ref={canvasRef} className="draw-canvas" />
    </div>
  );
};
