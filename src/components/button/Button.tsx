/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import styles from "./button.module.css";

export default function Button({ children, type = "submit", disabled }:
  {children: React.ReactNode; type?: "button" | "submit" | "reset", disabled?: boolean}) {
  return (
    <button type={type} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}
