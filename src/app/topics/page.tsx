/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import TopicCard from "@/components/topicCard/TopicCard";
import Button from "@/components/button/Button";
import styles from "./topics.module.css";

type Topic = {
  name: string;
  image: string;
};

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function createSlug(text: string) {
  return normalizeText(text).replace(/\s+/g, "-");
}

export default function Topics() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
      async function loadTopics() {
        setLoading(true);
        setError("");
        setSelectedTopics([]);
  
        try {
          const resposta = await fetch("/api/topics", { method: "GET" });
  
          if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
          }
  
          const dados: Topic[] = await resposta.json();
  
          if (!Array.isArray(dados)) {
            throw new Error("Resposta inesperada da API.");
          }
  
          setTopics(dados);
        } catch {
          setError("Não foi possível carregar os tópicos. Verifique a API e tente novamente.");
        } finally {
          setLoading(false);
        }
      }
  
      loadTopics();
    }, [tryCount]);

  const filteredTopics = topics.filter((topic) =>
    normalizeText(topic.name).includes(normalizeText(search)),
  );

  function toggleTopic(topicName: string) {
    setSelectedTopics((current) => current.includes(topicName)
                                  ? current.filter((topic) => topic !== topicName)
                                  : [...current, topicName],
    );
  }

  function handleSearchTopics() {
    if (selectedTopics.length === 0) return;

    const topicPath = selectedTopics
      .map((topic) => createSlug(topic))
      .join("/");

    router.push(`/tutors/${topicPath}`);
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

        {loading && (
          <p className="emptyMessage" role="status">
            Carregando tópicos...
          </p>
        )}

        {!loading && error && (
          <div className="emptyMessage" role="alert">
            <p>{error}</p>
            <button
              className="retryButton"
              type="button"
              onClick={() => setTryCount((atual) => atual + 1)}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section
              className={styles.topicsGrid}
              aria-label="Lista de tópicos"
            >
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.name}
                  name={topic.name}
                  image={topic.image}
                  isSelected={selectedTopics.includes(topic.name)}
                  onToggle={toggleTopic}
                />
              ))}
            </section>

            {filteredTopics.length === 0 && (
              <p className="emptyMessage">
                Nenhum tópico encontrado.
              </p>
            )}
          </>
        )}

        <p className={styles.selectionCount} aria-live="polite">
          {selectedTopics.length === 0
            ? "Nenhum tópico selecionado"
            : selectedTopics.length === 1
              ? "1 tópico selecionado"
              : `${selectedTopics.length} tópicos selecionados`}
        </p>

        <div className={styles.buttonContainer}>
          <Button
            className="defaultButton"
            type="button"
            disabled={selectedTopics.length === 0}
            onClick={handleSearchTopics}
          >
            Buscar Tópicos
          </Button>
        </div>
      </main>
    </div>
  );
}