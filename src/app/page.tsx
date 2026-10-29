/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/button/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.homeContent}>
      <Image
        className={styles.homeLogo}
        src="/assets/logo.png"
        alt="Logo Reforço Comunitário"
        width={300}
        height={200}
        priority
      />

      <section className={styles.homeDescription}>
        <h1>Reforço Comunitário</h1>

        <p>
          O Reforço Comunitário é um espaço gratuito e colaborativo que conecta
          quem precisa de apoio nos estudos com voluntários dispostos a
          compartilhar conhecimento.
        </p>

        <p>
          Aqui você pode se cadastrar como aluno, instrutor ou ambos, buscar
          ajuda por disciplina ou tópico específico, pedir ou receber vídeos
          educativos e agendar aulas online para aprofundar seus estudos.
        </p>
      </section>

      <div className={styles.homeActions}>
        <Button className="homeButton" type="button" onClick={() => router.push("/login")}>
          Entrar
        </Button>

        <p className={styles.divider}>OU</p>

        <Button className="homeButton" type="button" onClick={() => router.push("/register")}>
          Cadastarar
        </Button>
      </div>
    </main>
  );
}