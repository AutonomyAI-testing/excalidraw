import React, { useState } from "react";

import { Dialog } from "@excalidraw/excalidraw/components/Dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

import "./AuthDialog.scss";

type AuthMode = "signin" | "signup";

interface AuthDialogProps {
  handleClose: () => void;
  initialMode?: AuthMode;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({
  handleClose,
  initialMode = "signin",
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const handleAuthSuccess = () => {
    handleClose();
  };

  const switchToSignUp = () => {
    setMode("signup");
  };

  const switchToSignIn = () => {
    setMode("signin");
  };

  return (
    <Dialog size="small" onCloseRequest={handleClose} title={null}>
      <div className="AuthDialog">
        <div className="AuthDialog__header">
          <h2 className="AuthDialog__title">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h2>
        </div>
        <div className="AuthDialog__content">
          {mode === "signin" ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToSignUp={switchToSignUp}
            />
          ) : (
            <SignUpForm
              onSuccess={handleAuthSuccess}
              onSwitchToSignIn={switchToSignIn}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};
