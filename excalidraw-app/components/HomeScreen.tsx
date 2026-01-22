import React from "react";

export const HomeScreen: React.FC = () => {
  return (
    <div className="excalidraw-home-screen">
      <div className="excalidraw-home-screen__container">
        <header className="excalidraw-home-screen__header">
          <h1 className="excalidraw-home-screen__title">Welcome to Excalidraw</h1>
          <p className="excalidraw-home-screen__subtitle">
            Virtual whiteboard for sketching hand-drawn like diagrams
          </p>
        </header>

        <div className="excalidraw-home-screen__actions">
          <button className="excalidraw-home-screen__button excalidraw-home-screen__button--primary">
            Start Drawing
          </button>
          <button className="excalidraw-home-screen__button excalidraw-home-screen__button--secondary">
            Open File
          </button>
        </div>

        <div className="excalidraw-home-screen__features">
          <div className="excalidraw-home-screen__feature">
            <div className="excalidraw-home-screen__feature-icon">✏️</div>
            <h3 className="excalidraw-home-screen__feature-title">Hand-drawn Feel</h3>
            <p className="excalidraw-home-screen__feature-description">
              Create diagrams with a natural, hand-drawn aesthetic
            </p>
          </div>
          <div className="excalidraw-home-screen__feature">
            <div className="excalidraw-home-screen__feature-icon">🔒</div>
            <h3 className="excalidraw-home-screen__feature-title">Privacy First</h3>
            <p className="excalidraw-home-screen__feature-description">
              Your data stays private with end-to-end encryption
            </p>
          </div>
          <div className="excalidraw-home-screen__feature">
            <div className="excalidraw-home-screen__feature-icon">🤝</div>
            <h3 className="excalidraw-home-screen__feature-title">Collaborate</h3>
            <p className="excalidraw-home-screen__feature-description">
              Work together in real-time with your team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
