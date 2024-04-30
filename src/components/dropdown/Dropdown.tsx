import React from "react";

interface DropdownProps {
  /**
   * The list of options to be displayed in the dropdown.
   * Each option should have a value and label.
   */
  options: { value: string; label: string }[];

  /**
   * The currently selected value.
   */
  selectedValue: string;

  /**
   * Label text to be displayed.
   */
  label: string;

  /**
   * Event handler for when the selected value changes.
   */
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * Optional class name for styling the select element.
   */
  selectClassName?: string;

  /**
   * Optional class name for styling the options.
   */
  optionClassName?: string;
}

/**
 * Dropdown Component
 * 
 * Renders a dropdown/select input field with a label and options.
 * 
 * @param options The list of options to be displayed in the dropdown
 * @param selectedValue The currently selected value
 * @param label Label text to be displayed
 * @param onChange Event handler for when the selected value changes
 * @param selectClassName Optional class name for styling the select element
 * @param optionClassName Optional class name for styling the options
 */
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
        className={`${selectClassName} focus:outline-none`}
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
