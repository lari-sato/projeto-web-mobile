/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Form from "next/form";
import styles from "./authForm.module.css";

export default function AuthForm({ id, name, label, type, onChange, value, className}:
  { id: string; name: string; label: string; type: "text" | "email" | "password" | "checkbox"; onChange: (value: string) => void; value?: string; className?: string }) {
  function handleSubmit(formData: FormData) {
    const value = String(formData.get(name) ?? "").trim();
    onChange(value);
  }

  if (type === "checkbox") {
    return (
      <Form className={styles.form} action={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={className}>
            <span>{label}</span>
            <input
              type="checkbox"
              id={id}
              name={name}
              value={value}
              onChange={(event) => onChange(event.target.checked ? value ?? "" : "") }
            />
          </label>
        </div>
      </Form>
    );
  }

  return (
    <Form className="form" action={handleSubmit}>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          required
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </Form>
  );
}
