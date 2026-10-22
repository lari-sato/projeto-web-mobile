/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Image from "next/image";
import Link from "next/link";
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

export default function Topics() {
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
            aria-label="Pesquisar tópico"
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

          <Link
            className={`${styles.navigationButton} ${styles.active}`}
            href="/topics"
            aria-current="page"
          >
            <Image
              className={styles.navigationIcon}
              src="/assets/topics.png"
              alt=""
              width={18}
              height={18}
            />
            Tópicos
          </Link>

          <Link className={styles.navigationButton} href="/tutors">
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
          {topics.map((topic) => (
            <article className={styles.topicCard} key={topic.name}>
              <div className={styles.topicLabel}>
                <div className={styles.imagePlaceholder}>
                  <Image
                    className={styles.topicImage}
                    src={`/assets/topics-images/${topic.image}`}
                    alt={`Tópico de ${topic.name}`}
                    width={235}
                    height={180}
                  />
                </div>

                <span className={styles.topicName}>{topic.name}</span>
              </div>
            </article>
          ))}
        </section>

        <div className={styles.buttonContainer}>
          <button
            className={`${componentsStyles.btnSubmit} ${styles.submitButton}`}
            type="button"
            disabled
          >
            Buscar Tópicos
          </button>
        </div>
      </main>
    </div>
  );
}