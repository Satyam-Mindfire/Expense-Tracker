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

  //Placeholder of the input field
  placeholder?: string;

  // CSS class names for styling the label, input, and error message
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
}

// Create the FormField component
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
}) => {
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
