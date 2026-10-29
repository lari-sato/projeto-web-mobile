/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useState } from "react";
import Header from "@/components/header/Header";
import QuestionCard from "@/components/questionCard/questionCard";
import styles from "./forum.module.css";

const questions = [
  {
    image: "Ana-Souza.png",
    name: "Ana Souza",
    topic: "Matemática",
    time: "2h",
    title: "Como resolver essa questão de função de 1° grau?",
    description:
      "Oi, pessoal! Estou com dificuldades nessa questão. Alguém pode me explicar o passo a passo?",
    responses: "9",
    likes: "3",
  },
  {
    image: "Pedro-Santos.png",
    name: "Pedro Santos",
    topic: "Português",
    time: "3h",
    title: "Quando devo usar crase em uma frase?",
    description:
      "Sempre fico em dúvida sobre quando a crase é obrigatória. Alguém pode explicar com alguns exemplos?",
    responses: "6",
    likes: "5",
  },
  {
    image: "Beatriz-Carvalho.png",
    name: "Beatriz Carvalho",
    topic: "Redação",
    time: "5h",
    title: "Como construir uma boa introdução para o ENEM?",
    description:
      "Gostaria de dicas para apresentar o tema e a tese sem deixar a introdução muito extensa.",
    responses: "12",
    likes: "8",
  },
  {
    image: "Carlos-Mendes.png",
    name: "Carlos Mendes",
    topic: "História",
    time: "6h",
    title: "Quais foram as principais causas da Revolução Francesa?",
    description:
      "Estou revisando para a prova e preciso entender a relação entre a crise econômica e o início da revolução.",
    responses: "7",
    likes: "4",
  },
  {
    image: "Mariana-Costa.png",
    name: "Mariana Costa",
    topic: "Geografia",
    time: "8h",
    title: "Qual é a diferença entre tempo e clima?",
    description:
      "As definições parecem muito parecidas para mim. Podem explicar a diferença de um jeito simples?",
    responses: "5",
    likes: "6",
  },
  {
    image: "Felipe-Alves.png",
    name: "Felipe Alves",
    topic: "Inglês",
    time: "10h",
    title: "Como usar o present perfect?",
    description:
      "Não consigo identificar quando devo usar o present perfect em vez do simple past.",
    responses: "10",
    likes: "7",
  },
  {
    image: "Juliana-Rocha.png",
    name: "Juliana Rocha",
    topic: "Física",
    time: "12h",
    title: "Como calcular a velocidade média?",
    description:
      "Tenho dificuldade para saber quais valores devo usar na fórmula quando o percurso tem mais de uma etapa.",
    responses: "8",
    likes: "3",
  },
  {
    image: "Gabriel-Martins.png",
    name: "Gabriel Martins",
    topic: "Química",
    time: "1d",
    title: "Como balancear uma equação química?",
    description:
      "Alguém pode mostrar um método para balancear equações sem precisar tentar vários números?",
    responses: "11",
    likes: "9",
  },
  {
    image: "Larissa-Fernandes.png",
    name: "Larissa Fernandes",
    topic: "Biologia",
    time: "1d",
    title: "Qual é a função das mitocôndrias?",
    description:
      "Estou estudando a célula e queria entender por que as mitocôndrias são chamadas de usinas de energia.",
    responses: "4",
    likes: "5",
  },
  {
    image: "Mateus-Rodrigues.png",
    name: "Mateus Rodrigues",
    topic: "Artes",
    time: "2d",
    title: "O que caracteriza o movimento modernista?",
    description:
      "Preciso identificar as principais características do modernismo brasileiro para um trabalho.",
    responses: "3",
    likes: "2",
  },
  {
    image: "Carla-Nascimento.png",
    name: "Carla Nascimento",
    topic: "Educação Financeira",
    time: "2d",
    title: "Como montar uma reserva de emergência?",
    description:
      "Quero começar a guardar dinheiro, mas não sei como definir um valor mensal realista.",
    responses: "13",
    likes: "10",
  },
  {
    image: "Renata-Vieira.png",
    name: "Renata Vieira",
    topic: "Programação",
    time: "3d",
    title: "Para que serve um loop for?",
    description:
      "Estou começando a programar em JavaScript e gostaria de entender quando usar o loop for.",
    responses: "15",
    likes: "12",
  },
];

const topicColors: Record<
  string,
  { background: string; border: string }
> = {
  Matemática: { background: "#90c2ee", border: "#03405c46" },
  Português: { background: "#d88484", border: "#500606" },
  Redação: { background: "#f0acce", border: "#36192d" },
  História: { background: "#e4a052", border: "#52210a" },
  Geografia: { background: "#d8cc87", border: "#756404" },
  Inglês: { background: "#db9ce7", border: "#4b0852" },
  Física: { background: "#96c9b8", border: "#05352d" },
  Química: { background: "#8894c4", border: "#060247" },
  Biologia: { background: "#a0db8e", border: "#065535" },
  Artes: { background: "#b998e4", border: "#2e0853" },
  "Educação Financeira": {
    background: "#91694f",
    border: "#3a1a05",
  },
  Programação: { background: "#5faff0", border: "#0f3c6a" },
};

export default function Forum() {
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showTopicFilter, setShowTopicFilter] = useState(false);

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
        </section>
      </main>
    </div>
  );
}