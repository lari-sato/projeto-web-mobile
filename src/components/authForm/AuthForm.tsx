/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import styles from "./authForm.module.css";

type AuthFormProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox";
  onChange: (value: string) => void;
  value?: string;
  checked?: boolean;
  className?: string;
};

export default function AuthForm({
  id,
  name,
  label,
  type,
  onChange,
  value,
  checked,
  className,
}: AuthFormProps) {

  if (type === "checkbox") {
    return (
      <div className={styles.formGroup}>
        <label className={className}>
          <span>{label}</span>

          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={(event) =>
              onChange(event.target.checked ? value ?? "" : "")
            }
          />
        </label>
      </div>
    );
  }

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        id={id}
        name={name}
        value={value ?? ""}
        required
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}