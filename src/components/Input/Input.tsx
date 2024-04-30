import React from "react";
import { ErrorMessage, Field } from "formik";

interface InputProps {
  // Label text for the field
  label: string;

  // Type of the input field (e.g., 'text', 'email', 'password')
  type: string;

  // Name of the input field
  name: string;

  // ID of the input field
  id: string;

  // Placeholder text for the input field
  placeholder?: string;

  // CSS class name for styling the label
  labelClassName?: string;

  // CSS class name for styling the input field
  inputClassName?: string;

  // CSS class name for styling the error message
  errorClassName?: string;

  // CSS class name for styling the container of the input field and label
  containerClassName?: string;

  // Minimum date for date type input field
  minDate?: string;
}

/**
 * Input Component
 * 
 * Renders an input field with label and error message for formik forms.
 * 
 * @param label Label text for the field
 * @param type Type of the input field (e.g., 'text', 'email', 'password')
 * @param name Name of the input field
 * @param id ID of the input field
 * @param placeholder Placeholder text for the input field
 * @param labelClassName CSS class name for styling the label
 * @param inputClassName CSS class name for styling the input field
 * @param errorClassName CSS class name for styling the error message
 * @param containerClassName CSS class name for styling the container of the input field and label
 * @param minDate Minimum date for date type input field
 */
const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  id,
  labelClassName = "",
  inputClassName = "",
  errorClassName = "",
  containerClassName = "",
  placeholder = "",
  minDate
}) => {
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {/* Label for the input field */}
      <label
        htmlFor={id}
        className={`block text-light-primaryText mb-1 ${labelClassName}`}
      >
        {label}
      </label>

      {/* Input field */}
      <Field
        type={type}
        name={name}
        id={id}
        className={`w-full p-2 border rounded bg-light-inputColor border-2 border-light-inputBorderColor placeholder-light-placeHolderColor rounded-lg ${inputClassName}`}
        placeholder={placeholder}
        min={minDate}
        max={maxDate}
      />

      {/* Error message */}
      <ErrorMessage
        name={name}
        component="div"
        className={`text-red-600 text-sm mt-1 ${errorClassName}`}
      />
    </div>
  );
};

export default Input;
