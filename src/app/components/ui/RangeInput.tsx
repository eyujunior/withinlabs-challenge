// components/ui/RangeInput.tsx
import React from "react";

interface RangeInputProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({ min, max, value, onChange, className = "" }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
        />
    );
};

export default RangeInput;
