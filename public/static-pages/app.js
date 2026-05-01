// Shared interactions for the Excalidraw static info pages.
// Vanilla JS, no deps. Each helper attaches to data-attributes so pages stay declarative.

(function () {
  // Theme toggle: read from localStorage and apply on every page.
  const THEME_KEY = "excal-static-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const btns = document.querySelectorAll(".theme-toggle");
    btns.forEach((b) => (b.textContent = t === "dark" ? "☀" : "☾"));
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || "light";
    applyTheme(saved);
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });
  }

  // Tabs: [data-tabs] container with .tab[data-target] buttons and .tab-panel[data-panel] siblings.
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((root) => {
      const tabs = root.querySelectorAll(".tab");
      const panels = root.querySelectorAll(".tab-panel");
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));
          tab.classList.add("active");
          const target = tab.getAttribute("data-target");
          const panel = root.querySelector(`.tab-panel[data-panel="${target}"]`);
          if (panel) panel.classList.add("active");
        });
      });
    });
  }

  // Accordion: .accordion-item with .accordion-trigger inside.
  function initAccordion() {
    document.querySelectorAll(".accordion-trigger").forEach((trig) => {
      trig.addEventListener("click", () => {
        const item = trig.closest(".accordion-item");
        if (!item) return;
        item.classList.toggle("open");
      });
    });
  }

  // Modal: [data-modal-open="id"] opens, [data-modal-close] closes.
  function initModals() {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-modal-open");
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("open");
      });
    });
    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        if (modal) modal.classList.remove("open");
      });
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("open");
      });
    });
  }

  // Toast helper: window.toast("msg")
  function ensureToastContainer() {
    let c = document.querySelector(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      document.body.appendChild(c);
    }
    return c;
  }
  window.toast = function (msg, opts) {
    const c = ensureToastContainer();
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => {
      t.style.opacity = "0";
      t.style.transition = "opacity 0.25s";
      setTimeout(() => t.remove(), 250);
    }, (opts && opts.duration) || 2200);
  };

  // Range with live label: <input type="range" data-out="#someEl">
  function initRanges() {
    document.querySelectorAll('input[type="range"][data-out]').forEach((input) => {
      const out = document.querySelector(input.getAttribute("data-out"));
      const update = () => {
        if (out) out.textContent = input.value;
      };
      input.addEventListener("input", update);
      update();
    });
  }

  // Search filter: <input data-filter="#listSelector"> filters children by textContent.
  function initFilters() {
    document.querySelectorAll("[data-filter]").forEach((input) => {
      const target = document.querySelector(input.getAttribute("data-filter"));
      if (!target) return;
      input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        Array.from(target.children).forEach((child) => {
          const matches = !q || child.textContent.toLowerCase().includes(q);
          child.style.display = matches ? "" : "none";
        });
      });
    });
  }

  // Mark current nav link as active.
  function initActiveNav() {
    const here = location.pathname.replace(/^\//, "").replace(/\.html$/, "") || "index";
    document.querySelectorAll(".site-nav-links a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const slug = href.replace(/^\//, "").replace(/\.html$/, "") || "index";
      if (slug === here) a.classList.add("active");
    });
  }

  // Drawing canvas: looks for <canvas data-draw> and pulls config from siblings.
  function initDrawCanvas() {
    const canvas = document.querySelector("canvas[data-draw]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const state = {
      drawing: false,
      color: "#1b1b1f",
      size: 4,
      strokes: [],
      current: null,
    };

    // Color swatches
    document.querySelectorAll(".color-swatch").forEach((sw) => {
      sw.addEventListener("click", () => {
        document.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("active"));
        sw.classList.add("active");
        state.color = sw.getAttribute("data-color") || "#1b1b1f";
      });
    });

    // Brush size
    const sizeInput = document.querySelector('[data-draw-size]');
    if (sizeInput) {
      const update = () => (state.size = Number(sizeInput.value));
      sizeInput.addEventListener("input", update);
      update();
    }

    // Clear
    const clearBtn = document.querySelector("[data-draw-clear]");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        state.strokes = [];
        redraw();
        window.toast("Canvas cleared");
      });
    }

    // Undo
    const undoBtn = document.querySelector("[data-draw-undo]");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        state.strokes.pop();
        redraw();
      });
    }

    // Save as PNG
    const saveBtn = document.querySelector("[data-draw-save]");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "excalidraw-sketch.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        window.toast("Saved as PNG");
      });
    }

    function pos(e) {
      const rect = canvas.getBoundingClientRect();
      const point = e.touches ? e.touches[0] : e;
      return { x: point.clientX - rect.left, y: point.clientY - rect.top };
    }

    function start(e) {
      e.preventDefault();
      state.drawing = true;
      state.current = { color: state.color, size: state.size, points: [pos(e)] };
    }
    function move(e) {
      if (!state.drawing || !state.current) return;
      e.preventDefault();
      state.current.points.push(pos(e));
      redraw();
    }
    function end() {
      if (!state.current) return;
      state.strokes.push(state.current);
      state.current = null;
      state.drawing = false;
    }

    function drawStroke(s) {
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
    }
    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      state.strokes.forEach(drawStroke);
      if (state.current) drawStroke(state.current);
    }

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
  }

  // Animated counter: <span data-counter="1234">
  function initCounters() {
    document.querySelectorAll("[data-counter]").forEach((el) => {
      const target = Number(el.getAttribute("data-counter"));
      if (!isFinite(target)) return;
      const duration = 1100;
      const start = performance.now();
      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(target * eased);
        el.textContent = value.toLocaleString();
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initTabs();
    initAccordion();
    initModals();
    initRanges();
    initFilters();
    initActiveNav();
    initDrawCanvas();
    initCounters();
  });
})();
