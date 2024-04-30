import React, { ChangeEvent } from "react";

interface InputFieldProps {
  /**
   * Label for the input field
   */
  label: string;

  /**
   * Unique id for the input field
   */
  id: string;

  /**
   * Type of the input field (e.g., text, email, password)
   */
  type: string;

  /**
   * Placeholder text for the input field
   */
  placeholder?: string;

  /**
   * Value of the input field
   */
  value: string;

  /**
   * Callback function to handle input value change
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Additional CSS classes for the input field
   */
  inputClassName?: string;

  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;

  /**
   * Specifies whether the input field is disabled
   */
  disabled?: boolean;

  /**
   * Specifies whether the input field is read-only
   */
  readOnly?: boolean;

  /**
   * Minimum date for the input field (if type is "date")
   */
  minDate?: string;

  /**
   * Error message to display below the input field
   */
  errorMsg?: string;
}

/**
 * CustomInput Component
 * 
 * Renders a customized input field with a label and optional error message.
 * 
 * @param label Label for the input field
 * @param id Unique id for the input field
 * @param type Type of the input field (e.g., text, email, password)
 * @param placeholder Placeholder text for the input field
 * @param value Value of the input field
 * @param onChange Callback function to handle input value change
 * @param inputClassName Additional CSS classes for the input field
 * @param labelClassName Additional CSS classes for the label
 * @param disabled Specifies whether the input field is disabled
 * @param readOnly Specifies whether the input field is read-only
 * @param minDate Minimum date for the input field (if type is "date")
 * @param errorMsg Error message to display below the input field
 */
const CustomInput: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder = "",
  value,
  onChange,
  inputClassName = "",
  labelClassName = "",
  disabled = false,
  readOnly = false,
  minDate,
  errorMsg = "",
}) => {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center ml-5">
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          className={`mt-1 block w-36 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-light-primary focus:ring-blue-500 ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          min={minDate}
          max={maxDate}
        />
      </div>
      <p className="text-red-700 ml-5 mt-1">{errorMsg}</p>
    </div>
  );
};

export default CustomInput;
