import React, { useState } from "react";
import clsx from "clsx";

import { Button } from "./Button";

import "./Counter.scss";

interface CounterProps {
  /** Initial value for the counter (default: 0) */
  initialValue?: number;
  /** Minimum allowed value (default: 0) */
  min?: number;
  /** Maximum allowed value (default: undefined - no limit) */
  max?: number;
  /** Step size for increment/decrement (default: 1) */
  step?: number;
  /** Callback when counter value changes */
  onChange?: (value: number) => void;
  /** Additional CSS class names */
  className?: string;
  /** Optional label for the counter */
  label?: string;
}

/**
 * A counter component that displays a numeric value with increment and decrement buttons.
 * Allows users to increase or decrease the value within optional min/max constraints.
 */
export const Counter = ({
  initialValue = 0,
  min = 0,
  max,
  step = 1,
  onChange,
  className = "",
  label,
}: CounterProps) => {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = value + step;
    const constrained = max !== undefined ? Math.min(newValue, max) : newValue;
    setValue(constrained);
    onChange?.(constrained);
  };

  const handleDecrement = () => {
    const newValue = value - step;
    const constrained = Math.max(newValue, min);
    setValue(constrained);
    onChange?.(constrained);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      let constrained = newValue;
      if (constrained < min) constrained = min;
      if (max !== undefined && constrained > max) constrained = max;
      setValue(constrained);
      onChange?.(constrained);
    }
  };

  const isAtMin = value <= min;
  const isAtMax = max !== undefined && value >= max;

  return (
    <div className={clsx("Counter", className)}>
      {label && <label className="Counter__label">{label}</label>}
      <div className="Counter__controls">
        <Button
          className="Counter__button Counter__button--decrement"
          onSelect={handleDecrement}
          disabled={isAtMin}
          aria-label="Decrease counter"
          title="Decrease value"
        >
          −
        </Button>
        <input
          type="number"
          className="Counter__input"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          aria-label={label ? `${label} value` : "Counter value"}
        />
        <Button
          className="Counter__button Counter__button--increment"
          onSelect={handleIncrement}
          disabled={isAtMax}
          aria-label="Increase counter"
          title="Increase value"
        >
          +
        </Button>
      </div>
    </div>
  );
};
