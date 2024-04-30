import React from "react";

interface ButtonProps {
  // Content of the button (text or elements)
  children: React.ReactNode;

  // Callback function to handle button click
  onClick?: () => void;

  // Additional CSS classes
  className?: string;

  // Disable the button or not
  disabled?: boolean;
}

/**
 * Button Component
 * 
 * Renders a customizable button element.
 * 
 * @param children Content of the button (text or elements)
 * @param onClick Callback function to handle button click
 * @param className Additional CSS classes for styling
 * @param disabled Whether the button is disabled or not
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={`text-white bg-light-primary hover:bg-light-lightPrimary p-2 rounded-lg active:bg-light-darkPrimary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
