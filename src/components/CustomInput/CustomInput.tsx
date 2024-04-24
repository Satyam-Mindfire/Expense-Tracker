import React, { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: string;
  errorMsg?: string;
}

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
