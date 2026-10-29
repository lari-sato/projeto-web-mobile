/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/header/Header";
import TutorCard from "@/components/tutorCard/TutorCard";
import Image from "next/image";
import Link from "next/link";
import styles from "./tutors.module.css";

type Tutor = {
  name: string;
  image: string;
  topics: string[];
};

const tutors: Tutor[] = [
  {
    name: "Maria Cláudia Carvalho",
    image: "Maria-Claudia-Carvalho.jpg",
    topics: ["Matemática", "Física", "Química"]
  },
  {
    name: "Caio Kimura",
    image: "Caio-Kimura.jpg",
    topics: ["Programação", "Matemática", "Educação Financeira"]
  },
  {
    name: "Alice Mayumi",
    image: "Alice-Mayumi.jpg",
    topics: ["Português", "Redação", "Inglês"]
  },
  {
    name: "Juliane Magalhães",
    image: "Juliane-Magalhaes.jpg",
    topics: ["História", "Geografia", "Artes"]
  },
  {
    name: "Dandára Souza",
    image: "Dandara-Souza.jpg",
    topics: ["Português", "Redação", "Artes"]
  },
  {
    name: "Isaque Junior Tavares",
    image: "Isaque-Junior-Tavares.png",
    topics: ["Matemática", "Física", "Programação"]
  },
  {
    name: "Tati Matos",
    image: "Tati-Matos.jpg",
    topics: ["Português", "Redação"]
  },
  {
    name: "Roberto Almeida",
    image: "Roberto-Almeida.jpg",
    topics: ["Programação", "Matemática"]
  },
  {
    name: "Fernanda Motta",
    image: "Fernanda-Motta.jpg",
    topics: ["Biologia", "Química", "Geografia"]
  },
  {
    name: "Rafael Campos",
    image: "Rafael-Campos.jpg",
    topics: ["Biologia", "Química"]
  },
  {
    name: "Bruno Teixeira",
    image: "Bruno-Teixeira.jpg",
    topics: ["História", "Geografia"]
  },
  {
    name: "Otávio Flescher",
    image: "Otavio-Flescher.jpg",
    topics: ["Física", "Química"]
  },
  {
    name: "Leticia Delgado",
    image: "Leticia-Delgado.jpg",
    topics: ["Artes", "Português", "Redação"]
  },
  {
    name: "João Pedro da Silva",
    image: "Joao-Pedro.jpg",
    topics: ["Inglês", "Redação"]
  },
  {
    name: "Flávia Cornélio",
    image: "Flavia-Cornelio.jpg",
    topics: ["Matemática", "Física"]
  },
  {
    name: "Natália Queiroz",
    image: "Natalia-Queiroz.jpg",
    topics: ["Inglês", "Português", "Geografia"]
  },
  {
    name: "Lucas Oliveira",
    image: "Lucas-Oliveira.jpg",
    topics: ["Matemática", "Física", "Química"]
  },
  {
    name: "Andréia Nunes",
    image: "Andreia-Nunes.jpg",
    topics: ["Educação Financeira", "Matemática"]
  },
  {
    name: "Joaquim Bezerra",
    image: "Joaquim-Bezerra.jpg",
    topics: ["História", "Inglês"]
  },
  {
    name: "Guilherme Otaviano Abreu",
    image: "Guilherme-Otaviano-Abreu.png",
    topics: ["Educação Financeira"]
  },
  {
    name: "Elaine Cristina Soares",
    image: "Elaine-Cristina-Soares.jpg",
    topics: ["Biologia", "Química", "Geografia"]
  },
  {
    name: "Liliana Ferraz",
    image: "Liliana-Ferraz.jpg",
    topics: ["Português", "Redação", "Artes"]
  },
  {
    name: "Reinaldo Reis",
    image: "Reinaldo-Reis.jpg",
    topics: ["Programação", "Matemática", "Educação Financeira"]
  },
  {
    name: "Júlio Brandão",
    image: "Julio-Brandao.jpg",
    topics: ["História", "Geografia", "Inglês"]
  },
];

const TUTORS_PER_PAGE = 12;

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Tutors() {
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      const savedTopics = sessionStorage.getItem("topicosSelecionados");

      if (savedTopics) {
        const parsedTopics: unknown = JSON.parse(savedTopics);

        if (
          Array.isArray(parsedTopics) &&
          parsedTopics.every((topic) => typeof topic === "string")
        ) {
          setSelectedTopics(parsedTopics);
        }
      }
    } catch {
      setSelectedTopics([]);
    }
  }, []);

  const filteredTutors = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return tutors.filter((tutor) => {
      const matchesTopic =
        selectedTopics.length === 0 ||
        selectedTopics.some((topic) => tutor.topics.includes(topic));

      const matchesSearch = normalizeText(tutor.name).includes(
        normalizedSearch,
      );

      return matchesTopic && matchesSearch;
    });
  }, [search, selectedTopics]);

  const totalPages = Math.ceil(filteredTutors.length / TUTORS_PER_PAGE);

  const page = Math.min(currentPage, Math.max(totalPages, 1));

  const visibleTutors = filteredTutors.slice(
    (page - 1) * TUTORS_PER_PAGE,
    page * TUTORS_PER_PAGE,
  );

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleTutorSelection(name: string, checked: boolean) {
    setSelectedTutor(checked ? name : null);
  }

  function changePage(nextPage: number) {
    if (nextPage >= 1 && nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  }

  return (
    <div className={styles.container}>
      <Header
        activePage="tutors"
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchLabel="Pesquisar tutor"
      />

      <main className={`content ${styles.content}`}>
        <h1 className="title">Tutores disponíveis</h1>

        <p className="subtitle">
          Encontre um tutor para tirar dúvidas, aprofundar seus estudos
          ou receber orientação.
        </p>

        {selectedTopics.length > 0 && (
          <p className={styles.filterInfo} aria-live="polite">
            Filtrando por: {selectedTopics.join(", ")}
          </p>
        )}

        <section className={styles.tutors} aria-label="Lista de tutores">
          {visibleTutors.map((tutor) => (
            <TutorCard
              key={tutor.name}
              name={tutor.name}
              image={tutor.image}
              isSelected={selectedTutor === tutor.name}
              onSelect={handleTutorSelection}
            />
          ))}

          {visibleTutors.length === 0 && (
            <p className={styles.emptyMessage}>
              Nenhum tutor encontrado para essa pesquisa.
            </p>
          )}
        </section>

        <nav className={styles.pagination} aria-label="Paginação de tutores">
          <button
            className={styles.paginationArrow}
            id="prev-page"
            type="button"
            aria-label="Página anterior"
            onClick={() => changePage(page - 1)}
            disabled={page <= 1 || totalPages === 0}
          >
            <Image
              src="/assets/arrow-left.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>

          <span className={styles.paginationCurrent} aria-live="polite">
            {totalPages === 0 ? "0 / 0" : `${page} / ${totalPages}`}
          </span>

          <button
            className={styles.paginationArrow}
            id="next-page"
            type="button"
            aria-label="Próxima página"
            onClick={() => changePage(page + 1)}
            disabled={page >= totalPages || totalPages === 0}
          >
            <Image
              src="/assets/arrow-right.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>
        </nav>

        {selectedTutor && (
          <p className={styles.selectionInfo} aria-live="polite">
            Tutor selecionado: {selectedTutor}
          </p>
        )}

        <div className={styles.backContainer}>
          <Link className={styles.backButton} href="/topics">
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
}