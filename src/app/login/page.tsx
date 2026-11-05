/**
 * Beatriz Lima de Oliveira - RA: 10416616
 * Giovana Simões Franco - RA: 10417646
 * Julia Santos Oliveira - RA: 10417672
 * Larissa Yuri Sato - RA: 10418318
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import Header from "@/components/header/Header";
import AuthForm from "@/components/authForm/AuthForm";
import Button from "@/components/button/Button";

export default function Login() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const isValid =
    usuario.trim() !== "" &&
    senha.trim() !== "";

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
        <h1 className="title">Entre agora!</h1>

        <p className="subtitle">
          Ainda não possui uma conta?{" "}
          <Link href="/register">Registre-se.</Link>
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <AuthForm
            id="usuario"
            name="usuario"
            label="USUÁRIO OU E-MAIL"
            type="text"
            value={usuario}
            onChange={setUsuario}
          />

          <AuthForm
            id="senha"
            name="senha"
            label="SENHA"
            type="password"
            value={senha}
            onChange={setSenha}
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