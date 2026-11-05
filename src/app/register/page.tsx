/**
 Beatriz Lima de Moura - RA: 10416616
 Giovana Simões Franco - RA: 10417646
 Julia Santos Oliveira - RA: 10417672
 Larissa Yuri Sato - RA: 10418318
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import Header from "@/components/header/Header";
import AuthForm from "@/components/authForm/AuthForm";
import Button from "@/components/button/Button";

import styles from "./register.module.css";

export default function Register() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aluno, setAluno] = useState(false);
  const [instrutor, setInstrutor] = useState(false);

  const isValid =
    usuario.trim() !== "" &&
    email.trim() !== "" &&
    senha.trim() !== "" &&
    (aluno || instrutor);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    router.push("/forum");
  }

  return (
    <>
      <Header simple />

      <main className="content">
        <h1 className="title">Registre-se já!</h1>

        <p className="subtitle">
          Já possui uma conta?{" "}
          <Link href="/login">Entrar.</Link>
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <AuthForm
            id="usuario"
            name="usuario"
            label="USUÁRIO"
            type="text"
            value={usuario}
            onChange={setUsuario}
          />

          <AuthForm
            id="email"
            name="email"
            label="E-MAIL"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <AuthForm
            id="senha"
            name="senha"
            label="SENHA"
            type="password"
            value={senha}
            onChange={setSenha}
          />

          <p className={styles.roleTitle}>
            FUNÇÃO (SELECIONE UMA OU MAIS)
          </p>

          <AuthForm
            id="aluno"
            name="funcao"
            label="ALUNO(A)"
            type="checkbox"
            value="aluno"
            checked={aluno}
            className={styles.checkboxCard}
            onChange={(value) => setAluno(value === "aluno")}
          />

          <AuthForm
            id="instrutor"
            name="funcao"
            label="INSTRUTOR(A)"
            type="checkbox"
            value="instrutor"
            checked={instrutor}
            className={styles.checkboxCard}
            onChange={(value) => setInstrutor(value === "instrutor")}
          />

          <Button
            className="defaultButton"
            type="submit"
            disabled={!isValid}
          >
            OK
          </Button>
        </form>
      </main>
    </>
  );
}