/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import Image from "next/image";
import styles from "./tutorCard.module.css";

type TutorCardProps = {
  name: string;
  image: string;
  isSelected: boolean;
  onSelect: (name: string, checked: boolean) => void;
};

export default function TutorCard({
  name,
  image,
  isSelected,
  onSelect,
}: TutorCardProps) {
  return (
    <article
      className={`${styles.tutorCard} ${isSelected ? styles.selected : ""}`}
    >
      <label className={styles.tutorLabel}>
        <input
          className={styles.tutorRadio}
          type="checkbox"
          name="tutor"
          value={name}
          checked={isSelected}
          onChange={(event) => onSelect(name, event.target.checked)}
          aria-label={`Selecionar ${name}`}
        />

        <Image
          className={styles.tutorImage}
          src={`/assets/tutor-images/${image}`}
          alt={`Foto de ${name}`}
          width={235}
          height={245}
        />

        <h3 className={styles.tutorName}>{name}</h3>
      </label>
    </article>
  );
}