/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthForm from "../../components/authForm/AuthForm";
import Button from "../../components/button/Button";

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const isValid = usuario.trim() !== "" && senha.trim() !== "";

  return (
    <main className="content">
      <h1 className="title">Login</h1>

      <p className="subtitle">
        Ainda não possui uma conta?{" "}
        <Link href="/register">Registre-se.</Link>
      </p>

      <AuthForm
        id="usuario"
        name="usuario"
        label="USUÁRIO OU E-MAIL"
        type="text"
        onChange={setUsuario}
      />

      <AuthForm
        id="senha"
        name="senha"
        label="SENHA"
        type="password"
        onChange={setSenha}
      />

      <Button className="authButton" type="button" disabled={!isValid} onClick={() => router.push("/forum")}>
        OK
      </Button>
    </main>
  );
}