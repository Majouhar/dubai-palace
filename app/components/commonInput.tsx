import React from "react";
import classes from "./commonInput.module.css";

function CommonInput({
  label,
  value,
  handleChange,
  type = "text",
  required = false,
  placeholder,
  isEditable = true,
}: Readonly<{
  label: string;
  value: string;
  handleChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  isEditable?: boolean;
}>) {
  return (
    <label className={classes.label}>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      {isEditable ? (
        <input
          className={classes.input}
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          placeholder={placeholder ?? label}
        />
      ) : (
        <input
        
          value={value}
          onChange={() => {}}
          className={classes.disabledInput}
        />
      )}
    </label>
  );
}

export default CommonInput;
