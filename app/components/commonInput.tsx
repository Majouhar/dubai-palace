import React from "react";
import classes from "./commonInput.module.css";

function CommonInput({
  label,
  value,
  handleChange,
  type = "text",
  required = false,
  placeholder,
}: Readonly<{
  label: string;
  value: string;
  handleChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}>) {
  return (
    <label className={classes.label}>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      <input
        className={classes.input}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        required={required}
        placeholder={placeholder != undefined ? placeholder : label}
      />
    </label>
  );
}

export default CommonInput;
