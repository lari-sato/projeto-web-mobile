/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import Image from "next/image";
import styles from "./questionCard.module.css";

export type Question = {
  image: string;
  name: string;
  topic: string;
  time: string;
  title: string;
  description: string;
  responses: string;
  likes: string;
};

type TopicColor = {
  background: string;
  border: string;
};

type QuestionCardProps = {
  question: Question;
  topicColor?: TopicColor;
  onSave?: (questionTitle: string) => void;
};

export default function QuestionCard({
  question,
  topicColor,
  onSave,
}: QuestionCardProps) {
  return (
    <article className={styles.questionCard}>
      <Image
        className={styles.questionUserImage}
        src={`/assets/student-images/${question.image}`}
        alt={`Foto de ${question.name}`}
        width={50}
        height={50}
      />

      <section className={styles.questionInfo}>
        <section className={styles.questionData}>
          <p className={styles.questionUserName}>{question.name}</p>

          <article className={styles.date}>{question.time} atrás</article>

          <article
            className={styles.topic}
            style={
              topicColor
                ? {
                    backgroundColor: topicColor.background,
                    borderColor: topicColor.border,
                    color: topicColor.border,
                  }
                : undefined
            }
          >
            {question.topic}
          </article>
        </section>

        <h3>{question.title}</h3>
        <p>{question.description}</p>

        <div className={styles.questionInteractions}>
          <p>{question.responses} respostas</p>
          <p>{question.likes} likes</p>
          <button
            className={styles.saveButton}
            type="button"
            onClick={() => onSave?.(question.title)}
          >
            Salvar
          </button>
        </div>
      </section>
    </article>
  );
}