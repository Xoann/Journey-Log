// NumberInput.tsx
import React from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder,
  min,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if input wasnt a number reset to old value
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && (min === undefined || newValue >= min)) {
      onChange(newValue);
    } else {
      onChange(value); // Reset to min if the input is below the minimum
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="text-black rounded p-2"
    />
  );
};

export default NumberInput;
