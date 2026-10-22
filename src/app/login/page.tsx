/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Link from "next/link";
import styles from "../auth.module.css";

export default function Login() {
  return (
    <main className="content">
      <h1 className="title">Login</h1>

      <p className="subtitle">
        Ainda não possui uma conta?{" "}
        <Link href="/register">Registre-se.</Link>
      </p>

      <form className="form">
        <div className="form-group">
          <label htmlFor="usuario">USUÁRIO OU E-MAIL</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="senha">SENHA</label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
          />
        </div>

        <button
          className={styles.btnSubmit}
          type="submit"
          disabled
        >
          OK
        </button>
      </form>
    </main>
  );
}