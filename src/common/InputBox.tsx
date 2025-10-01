import React from "react";

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
  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-text block text-[18px] font-inter font-medium">
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-[#E7E7E7] rounded-[10px] px-4 py-3 
                   placeholder:text-gray-400 
                   focus:border-primary focus:ring-2 focus:ring-orange-200 
                   outline-none"
      />
    </div>
  );
};

export default InputBox;
