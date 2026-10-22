/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Image from "next/image";
import Link from "next/link";
import styles from "./tutors.module.css";
import componentsStyles from "../components.module.css";

const tutors = [
  {
    name: "Maria Cláudia Carvalho",
    image: "Maria-Claudia-Carvalho.jpg",
  },
  {
    name: "Caio Kimura",
    image: "Caio-Kimura.jpg",
  },
  {
    name: "Alice Mayumi",
    image: "Alice-Mayumi.jpg",
  },
  {
    name: "Juliane Magalhães",
    image: "Juliane-Magalhaes.jpg",
  },
  {
    name: "Dandára Souza",
    image: "Dandara-Souza.jpg",
  },
  {
    name: "Isaque Junior Tavares",
    image: "Isaque-Junior-Tavares.png",
  },
  {
    name: "Tati Matos",
    image: "Tati-Matos.jpg",
  },
  {
    name: "Roberto Almeida",
    image: "Roberto-Almeida.jpg",
  },
  {
    name: "Fernanda Motta",
    image: "Fernanda-Motta.jpg",
  },
  {
    name: "Rafael Campos",
    image: "Rafael-Campos.jpg",
  },
  {
    name: "Bruno Teixeira",
    image: "Bruno-Teixeira.jpg",
  },
  {
    name: "Otávio Flescher",
    image: "Otavio-Flescher.jpg",
  },
];

export default function Tutors() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/assets/logo.png"
          alt="Logo Reforço Comunitário"
          width={80}
          height={50}
          priority
        />

        <div className={componentsStyles.searchBar}>
          <input
            type="text"
            placeholder="Pesquise aqui..."
            aria-label="Pesquisar tutor"
          />
        </div>

        <nav className={styles.navigation}>
          <Link className={styles.navigationButton} href="/">
            <Image
              className={styles.navigationIcon}
              src="/assets/initial.png"
              alt=""
              width={18}
              height={18}
            />
            Início
          </Link>

          <Link className={styles.navigationButton} href="/topics">
            <Image
              className={styles.navigationIcon}
              src="/assets/topics.png"
              alt=""
              width={18}
              height={18}
            />
            Tópicos
          </Link>

          <Link
            className={`${styles.navigationButton} ${styles.active}`}
            href="/tutors"
            aria-current="page"
          >
            <Image
              className={styles.navigationIcon}
              src="/assets/tutors.png"
              alt=""
              width={18}
              height={18}
            />
            Tutores
          </Link>
        </nav>
      </header>

      <main className="content">
        <h1 className="title">Tutores disponíveis</h1>

        <p className="subtitle">
          Encontre um tutor para tirar dúvidas, aprofundar seus estudos
          ou receber orientação.
        </p>

        <section
          className={styles.tutors}
          aria-label="Lista de tutores"
        >
          {tutors.map((tutor) => (
            <article className={styles.tutorCard} key={tutor.name}>
              <div className={styles.tutorLabel}>
                <Image
                  className={styles.tutorImage}
                  src={`/assets/tutor-images/${tutor.image}`}
                  alt={`Foto de ${tutor.name}`}
                  width={235}
                  height={245}
                />

                <h3 className={styles.tutorName}>
                  {tutor.name}
                </h3>
              </div>
            </article>
          ))}
        </section>

        <nav
          className={styles.pagination}
          aria-label="Paginação de tutores"
        >
          <button
            className={styles.paginationArrow}
            type="button"
            aria-label="Página anterior"
            disabled
          >
            <Image
              src="/assets/arrow-left.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>

          <span className={styles.paginationCurrent}>
            1 / 2
          </span>

          <button
            className={styles.paginationArrow}
            type="button"
            aria-label="Próxima página"
            disabled
          >
            <Image
              src="/assets/arrow-right.svg"
              alt=""
              width={40}
              height={40}
            />
          </button>
        </nav>

        <div className={styles.backContainer}>
          <Link className={styles.backButton} href="/topics">
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
}
