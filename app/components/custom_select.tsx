"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect<T extends string = string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Sélectionner...",
  className = "",
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getCurrentOption = () => {
    return options.find((option) => option.value === value);
  };

  const handleOptionSelect = (optionValue: T) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:border-black hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm min-w-[200px]"
          type="button"
        >
          {getCurrentOption()?.icon && (
            <span className="text-gray-800">{getCurrentOption()?.icon}</span>
          )}
          <span className="flex-1 text-left">
            {getCurrentOption()?.label || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-gray-300 rounded-lg shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                type="button"
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 ${
                  value === option.value
                    ? "bg-gray-900 text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option.icon && (
                  <span
                    className={
                      value === option.value ? "text-white" : "text-gray-600"
                    }
                  >
                    {option.icon}
                  </span>
                )}
                <span>{option.label}</span>
                {value === option.value && (
                  <span className="ml-auto text-white">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
