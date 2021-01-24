import { useState } from "react";
import styles from "./LabeledInput.module.css";

function LabeledInput({
  type,
  name,
  value,
  label,
  errMessage,
  validator,
  formator,
  onChange,
}) {
  const [err, setErr] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  function handleBlur() {
    setFocused(false);
    setErr(!validator());
  }
  function handleChange(event) {
    const target = event.target;
    let v = target.value;
    v = formator && formator(v);
    v = v.replace(/\s\s/g, " ");
    if (err) setErr(!validator());
    onChange(name, v);
  }
  return (
    <label className={styles.label}>
      <input
        type={type}
        value={value}
        onBlur={handleBlur}
        onFocus={() => setFocused(true)}
        onChange={handleChange}
      />
      <span className={focused || value ? styles.filled : styles.empty}>
        {label}
      </span>
      <span className={err ? styles.err : styles.noerr}>{errMessage}</span>
    </label>
  );
}

export default LabeledInput;
