import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import "../excalidraw-app/sentry";
import "./pages/pages.scss";

import { About } from "./pages/About";
import { Features } from "./pages/Features";
import { DocsLayout } from "./pages/Layout";
import { Showcase } from "./pages/Showcase";

const ExcalidrawApp = lazy(() => import("./App"));

window.__EXCALIDRAW_SHA__ = import.meta.env.VITE_APP_GIT_SHA;
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
registerSW();
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <ExcalidrawApp />
            </Suspense>
          }
        />
        <Route element={<DocsLayout />}>
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/showcase" element={<Showcase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
