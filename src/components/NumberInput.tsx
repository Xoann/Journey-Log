// NumberInput.tsx
import React from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  unit?: string;
  title?: string;
  large?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder,
  min,
  unit,
  title,
  large,
}) => {
  if (unit === undefined) {
    unit = "";
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if input wasnt a number reset to old value

    let newValue = Number(e.target.value);

    if (!isNaN(newValue) && (min === undefined || newValue >= min)) {
      onChange(newValue);
    } else {
      onChange(value); // Reset to min if the input is below the minimum
    }
  };

  const getDimensions = (): string => {
    if (large) {
      return "h-full w-32";
    } else {
      return "h-10 w-20";
    }
  };

  return (
    <div className="relative">
      {title ? (
        <span className="absolute bg-background -top-3 left-2 px-1 text-sm">
          {title}
        </span>
      ) : null}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`text-text bg-transparent rounded p-2 border border-text ${getDimensions()}`}
      />
    </div>
  );
};

export default NumberInput;
