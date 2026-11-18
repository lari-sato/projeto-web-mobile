/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import QuestionCard from "@/components/questionCard/QuestionCard";
import styles from "./forum.module.css";

type Question = {
  image: string;
  name: string;
  topic: string;
  time: string;
  title: string;
  description: string;
  responses: string;
  likes: string;
};

const topicColors: Record<
  string,
  { background: string; border: string }
> = {
  Matemática: { background: "#90c2ee", border: "#2f5f86" },
  Português: { background: "#d88484", border: "#500606" },
  Redação: { background: "#f0acce", border: "#36192d" },
  História: { background: "#e4a052", border: "#52210a" },
  Geografia: { background: "#d8cc87", border: "#756404" },
  Inglês: { background: "#db9ce7", border: "#4b0852" },
  Física: { background: "#96c9b8", border: "#05352d" },
  Química: { background: "#8894c4", border: "#060247" },
  Biologia: { background: "#a0db8e", border: "#065535" },
  Artes: { background: "#b998e4", border: "#2e0853" },
  "Educação Financeira": { background: "#91694f", border: "#3a1a05" },
  Programação: { background: "#5faff0", border: "#0f3c6a" }
};

export default function Forum() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showTopicFilter, setShowTopicFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
    async function loadTutors() {
      setLoading(true);
      setError("");
      setQuestions([]);

      try {
        const resposta = await fetch("/api/forum", { method: "GET" });

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`);
        }

        const dados: Question[] = await resposta.json();

        if (!Array.isArray(dados)) {
          throw new Error("Resposta inesperada da API.");
        }

        setQuestions(dados);
      } catch {
        setError("Não foi possível carregar as perguntas. Verifique a API e tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    loadTutors();
  }, [tryCount]);

  const filteredQuestions = questions.filter((question) => {
    const searchText = search
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

    const searchableText = [
      question.name,
      question.topic,
      question.title,
      question.description,
    ]
      .join(" ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchText);
    const matchesTopic =
      selectedTopic === "" || question.topic === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  const availableTopics = [...new Set(questions.map((q) => q.topic))];

  return (
    <div className={styles.container}>
      <Header activePage="forum" />

      <main className={`content ${styles.content}`}>
        <article className={styles.banner}>
          <section className={styles.bannerGreeting}>
            <h1>Bem-vindo(a) ao Reforço Comunitário!</h1>
            <p>
              Tire dúvidas, compartilhe conhecimento e encontre pessoas
              dispostas a te ajudar nos seus estudos.
            </p>
          </section>
        </article>

        <section className={styles.actions} aria-label="Ações do fórum">
          <button
            className={styles.askQuestionButton}
            type="button"
          >
            Fazer pergunta
          </button>

          <button
            className={styles.filterButton}
            type="button"
            aria-expanded={showTopicFilter}
            onClick={() =>
              setShowTopicFilter((current) => !current)
            }
          >
            Filtrar por tópico
          </button>

          {showTopicFilter && (
            <select
              className={styles.topicFilterSelect}
              aria-label="Escolher tópico para filtrar"
              value={selectedTopic}
              onChange={(event) =>
                setSelectedTopic(event.target.value)
              }
            >
              <option value="">Todos os tópicos</option>

              {availableTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}

          <div className={styles.searchForum}>
            <input
              type="search"
              placeholder="Pesquisar no fórum..."
              aria-label="Pesquisar perguntas no fórum"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </section>

        <section className={styles.recentQuestions}>
          <h2>Perguntas recentes</h2>

          {loading && (
            <p className="emptyMessage" role="status">
              Carregando perguntas...
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
              {filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.name}
                  question={question}
                  topicColor={topicColors[question.topic]}
                />
              ))}

              {filteredQuestions.length === 0 && (
                <p className={styles.noResults}>
                  Nenhuma pergunta encontrada.
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}