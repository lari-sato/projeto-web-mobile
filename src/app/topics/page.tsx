/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useState } from "react";
import Header from "@/components/header/Header";
import Image from "next/image";
import styles from "./topics.module.css";
import componentsStyles from "../components.module.css";

const topics = [
  { name: "Matemática", image: "topico-matematica.jpg" },
  { name: "Português", image: "topico-portugues.jpg" },
  { name: "Redação", image: "topico-redacao.jpg" },
  { name: "História", image: "topico-historia.jpg" },
  { name: "Geografia", image: "topico-geografia.jpg" },
  { name: "Inglês", image: "topico-ingles.jpg" },
  { name: "Física", image: "topico-fisica.jpg" },
  { name: "Química", image: "topico-quimica.jpg" },
  { name: "Biologia", image: "topico-biologia.jpg" },
  { name: "Artes", image: "topico-artes.jpg" },
  {
    name: "Educação Financeira",
    image: "topico-educacao-financeira.jpg",
  },
  { name: "Programação", image: "topico-programacao.jpg" },
];

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Topics() {
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const filteredTopics = topics.filter((topic) =>
    normalizeText(topic.name).includes(normalizeText(search)),
  );

  function toggleTopic(topicName: string) {
    setSelectedTopics((current) =>
      current.includes(topicName)
        ? current.filter((topic) => topic !== topicName)
        : [...current, topicName],
    );
  }

  function handleSearchTopics() {
    if (selectedTopics.length === 0) return;

    sessionStorage.setItem(
      "topicosSelecionados",
      JSON.stringify(selectedTopics),
    );

    console.log(
      selectedTopics.length === 1
        ? "1 tópico selecionado salvo!"
        : `${selectedTopics.length} tópicos selecionados salvos!`,
    );
  }

  return (
    <div className={styles.container}>
      <Header activePage="topics" searchValue={search} onSearchChange={setSearch} searchLabel="Pesquisar tópico" />

      <main className={`content ${styles.content}`}>
        <h1 className="title">Explorar tópicos</h1>

        <p className="subtitle">
          Encontre um tema de interesse para ver conteúdos, discussões
          e tutores relacionados.
        </p>

        <section
          className={styles.topicsGrid}
          aria-label="Lista de tópicos"
        >
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopics.includes(topic.name);

            return (
              <button
                className={`${styles.topicCard} ${
                  isSelected ? styles.selected : ""
                }`}
                key={topic.name}
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTopic(topic.name)}
              >
                <span className={styles.topicLabel}>
                  <span className={styles.imagePlaceholder}>
                    <Image
                      className={styles.topicImage}
                      src={`/assets/topics-images/${topic.image}`}
                      alt=""
                      width={235}
                      height={180}
                    />
                  </span>

                  <span className={styles.topicName}>{topic.name}</span>
                </span>
              </button>
            );
          })}
        </section>

        {filteredTopics.length === 0 && (
          <p className={styles.emptyMessage}>
            Nenhum tópico encontrado.
          </p>
        )}

        <p className={styles.selectionCount} aria-live="polite">
          {selectedTopics.length === 0
            ? "Nenhum tópico selecionado"
            : selectedTopics.length === 1
              ? "1 tópico selecionado"
              : `${selectedTopics.length} tópicos selecionados`}
        </p>

        <div className={styles.buttonContainer}>
          <button
            className={`${componentsStyles.btnSubmit} ${styles.submitButton}`}
            type="button"
            disabled={selectedTopics.length === 0}
            onClick={handleSearchTopics}
          >
            Buscar Tópicos
          </button>
        </div>
      </main>
    </div>
  );
}