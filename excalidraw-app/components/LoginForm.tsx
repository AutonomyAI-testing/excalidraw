import React, { useState } from "react";
import { TextField } from "@excalidraw/excalidraw/components/TextField";
import { FilledButton } from "@excalidraw/excalidraw/components/FilledButton";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToSignUp,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: Integrate with Firebase auth
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="AuthForm">
      {error && <div className="AuthForm__error">{error}</div>}
      <div className="AuthForm__field">
        <TextField
          value={email}
          onChange={(value) => setEmail(value)}
          label="Email"
          placeholder="Enter your email"
        />
      </div>
      <div className="AuthForm__field">
        <TextField
          value={password}
          onChange={(value) => setPassword(value)}
          label="Password"
          placeholder="Enter your password"
          isRedacted
        />
      </div>
      <div className="AuthForm__actions">
        <FilledButton
          label="Sign In"
          variant="filled"
          disabled={isLoading}
          className="AuthForm__submit"
        />
      </div>
      <div className="AuthForm__footer">
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="AuthForm__link"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </form>
  );
};
