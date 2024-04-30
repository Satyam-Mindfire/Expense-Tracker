import React from "react";

interface CheckboxProps {
  /**
   * Label for the checkbox
   */
  label: string;

  /**
   * Whether the checkbox is checked or not
   */
  checked: boolean;

  /**
   * Callback function to handle checkbox change
   */
  onChange: () => void;
}

/**
 * Checkbox Component
 * 
 * Renders a checkbox input with a label.
 * 
 * @param label Label for the checkbox
 * @param checked Whether the checkbox is checked or not
 * @param onChange Callback function to handle checkbox change
 */
const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center mt-3 ml-5">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-indigo-600"
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;
