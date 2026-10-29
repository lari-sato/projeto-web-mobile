/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import styles from "./button.module.css";

export default function Button({ children, className, type = "submit", disabled, onClick }:
  {children: React.ReactNode; className?: string; type?: "button" | "submit" | "reset", disabled?: boolean; onClick?: () => void}) {
  return (
    <button
      type={type}
      className={className ? styles[className] : undefined}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
}
