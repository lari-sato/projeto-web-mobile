/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header/Header";
import TutorCard from "@/components/tutorCard/TutorCard";
import Image from "next/image";
import Link from "next/link";
import styles from "../tutors.module.css";

type Tutor = {
  name: string;
  image: string;
  topics: string[];
};

const TUTORS_PER_PAGE = 12;
const EMPTY_ROUTE_TOPICS: string[] = [];

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

function TutorsContent() {
  const params = useParams<{ topicos?: string[] }>();
  const routeTopics = params.topicos ?? EMPTY_ROUTE_TOPICS;

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function carregarTutores() {
      setCarregando(true);
      setErro("");
      setTutors([]);

      try {
        const resposta = await fetch("/api/tutors", { method: "GET" });

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`);
        }

        const dados: Tutor[] = await resposta.json();

        if (!Array.isArray(dados)) {
          throw new Error("Resposta inesperada da API.");
        }

        setTutors(dados);
      } catch {
        setErro("Não foi possível carregar os tutores. Verifique a API e tente novamente.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTutores();
  }, [tentativa]);

  const allTopics = useMemo(
    () => Array.from(new Set(tutors.flatMap((tutor) => tutor.topics))),
    [tutors],
  );

  const selectedTopics = useMemo(
    () => allTopics.filter((topic) => routeTopics.includes(createSlug(topic))),
    [allTopics, routeTopics],
  );

  const filteredTutors = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return tutors.filter((tutor) => {
      const matchesTopic =
        routeTopics.length === 0 ||
        selectedTopics.some((topic) => tutor.topics.includes(topic));

      const matchesSearch = normalizeText(tutor.name).includes(
        normalizedSearch,
      );

      return matchesTopic && matchesSearch;
    });
  }, [tutors, search, routeTopics, selectedTopics]);

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

        {carregando && (
          <p className={styles.emptyMessage} role="status">
            Carregando tutores...
          </p>
        )}

        {!carregando && erro && (
          <div className={styles.emptyMessage} role="alert">
            <p>{erro}</p>
            <button
              className={styles.retryButton}
              type="button"
              onClick={() => setTentativa((atual) => atual + 1)}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <>
            {selectedTopics.length > 0 && (
              <p className={styles.filterInfo} aria-live="polite">
                Filtrando por: {selectedTopics.join(", ")}
              </p>
            )}

            <section className={styles.tutors} aria-label="Lista de tutores">
              {visibleTutors.map((tutor, index) => (
                <TutorCard
                  key={tutor.name}
                  name={tutor.name}
                  image={tutor.image}
                  isSelected={selectedTutor === tutor.name}
                  onSelect={handleTutorSelection}
                  priority={index === 0}
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
                  src="/assets/icons/arrow-left.svg"
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
                  src="/assets/icons/arrow-right.svg"
                  alt=""
                  width={40}
                  height={40}
                />
              </button>
            </nav>
          </>
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

export default function Tutors() {
  return (
    <Suspense fallback={<div className={styles.container}>Carregando tutores...</div>}>
      <TutorsContent />
    </Suspense>
  );
}