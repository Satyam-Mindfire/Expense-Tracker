import React from "react";

interface DropdownProps {
  // The list of options to be displayed in the dropdown
  options: { value: string; label: string }[];

  // The currently selected value
  selectedValue: string;

  //Label Text to be displayed
  label: string;

  // Event handler for when the selected value changes
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  // Optional class names for styling
  selectClassName?: string;
  optionClassName?: string;
}

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  selectClassName = "",
  optionClassName = "",
  label,
}: DropdownProps) => {
  return (
    <>
      <label className="mr-2 text-sm">{label}</label>
      <select
        value={selectedValue}
        onChange={onChange}
        className={`${selectClassName} focus: outline-none`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={optionClassName}
          >
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;
