/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import Image from "next/image";
import styles from "./topicCard.module.css";

type TopicCardProps = {
  name: string;
  image: string;
  isSelected: boolean;
  onToggle: (name: string) => void;
};

export default function TopicCard({
  name,
  image,
  isSelected,
  onToggle,
}: TopicCardProps) {
  return (
    <button
      className={`${styles.topicCard} ${isSelected ? styles.selected : ""}`}
      type="button"
      aria-pressed={isSelected}
      onClick={() => onToggle(name)}
    >
      <span className={styles.topicLabel}>
        <Image
          className={styles.topicImage}
          src={`/assets/topics-images/${image}`}
          alt=""
          width={235}
          height={180}
        />
        
        <span className={styles.topicName}>{name}</span>
      </span>
    </button>
  );
}