import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-text block text-[18px] font-inter font-medium"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border border-[#E7E7E7] rounded-[10px] px-4 py-3 
                     placeholder:text-gray-400 
                     focus:border-primary focus:ring-2 focus:ring-orange-200 
                     outline-none pr-12"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-500 hover:text-gray-700 focus:outline-none 
                       transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash size={18} className="text-gray-500" />
            ) : (
              <FaEye size={18} className="text-gray-500" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBox;
