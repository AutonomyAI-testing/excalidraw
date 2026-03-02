import { useState } from "react";
import { Button } from "@excalidraw/excalidraw/components/Button";

import "./Counter.scss";

interface CounterProps {
  /** Initial value for the counter */
  initialValue?: number;
  /** Callback triggered when count changes */
  onChange?: (count: number) => void;
  /** CSS class name for additional styling */
  className?: string;
}

/**
 * A counter component that displays a numeric value with increment and decrement buttons.
 * The counter maintains internal state and can be configured with an initial value.
 * Supports optional onChange callbacks to notify parent components of value changes.
 */
export const Counter = ({
  initialValue = 0,
  onChange,
  className = "",
}: CounterProps) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onChange?.(newCount);
  };

  const handleReset = () => {
    setCount(initialValue);
    onChange?.(initialValue);
  };

  return (
    <div className={`counter ${className}`}>
      <div className="counter__display">
        <span className="counter__value">{count}</span>
      </div>

      <div className="counter__controls">
        <Button
          className="counter__button counter__button--decrement"
          onSelect={handleDecrement}
          title="Decrease counter"
          aria-label="Decrease counter"
        >
          −
        </Button>

        <Button
          className="counter__button counter__button--reset"
          onSelect={handleReset}
          title="Reset counter"
          aria-label="Reset counter"
        >
          R
        </Button>

        <Button
          className="counter__button counter__button--increment"
          onSelect={handleIncrement}
          title="Increase counter"
          aria-label="Increase counter"
        >
          +
        </Button>
      </div>
    </div>
  );
};
