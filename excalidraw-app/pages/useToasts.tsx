import { useCallback, useState } from "react";

type Toast = { id: number; message: string };

let nextId = 1;

export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, duration = 2200) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return { toast, toasts };
};

export const ToastViewport = ({ toasts }: { toasts: Toast[] }) => {
  if (toasts.length === 0) {
    return null;
  }
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          {t.message}
        </div>
      ))}
    </div>
  );
};
