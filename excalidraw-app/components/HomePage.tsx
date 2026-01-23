import React from "react";
import { Island } from "@excalidraw/excalidraw/components/Island";
import { FilledButton } from "@excalidraw/excalidraw/components/FilledButton";
import { Card } from "@excalidraw/excalidraw/components/Card";
import { useUIAppState } from "@excalidraw/excalidraw/context/ui-appState";
import { THEME } from "@excalidraw/excalidraw";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  const { theme } = useUIAppState();
  const isDarkTheme = theme === THEME.DARK;

  return (
    <div className={`home-page ${isDarkTheme ? "theme--dark" : ""}`}>
      <div className="home-page__container">
        <Island className="home-page__island">
          <div className="home-page__header">
            <h1 className="home-page__title">Welcome to Excalidraw</h1>
            <p className="home-page__subtitle">
              Create beautiful hand-drawn diagrams
            </p>
          </div>

          <div className="home-page__content">
            <div className="home-page__cards">
              <Card className="home-page__card">
                <h3 className="home-page__card-title">Quick Start</h3>
                <p className="home-page__card-description">
                  Start drawing with our intuitive tools
                </p>
              </Card>

              <Card className="home-page__card">
                <h3 className="home-page__card-title">Collaborate</h3>
                <p className="home-page__card-description">
                  Work together in real-time
                </p>
              </Card>

              <Card className="home-page__card">
                <h3 className="home-page__card-title">Export</h3>
                <p className="home-page__card-description">
                  Save your work in multiple formats
                </p>
              </Card>
            </div>

            <div className="home-page__actions">
              <FilledButton className="home-page__button">
                Get Started
              </FilledButton>
            </div>
          </div>
        </Island>
      </div>
    </div>
  );
};

export default HomePage;
