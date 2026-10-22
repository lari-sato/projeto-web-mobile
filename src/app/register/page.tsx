/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Link from "next/link";
import authStyles from "../auth.module.css";
import styles from "./register.module.css";

export default function Register() {
  return (
    <main className="content">
      <h1 className="title">Registre-se já!</h1>

      <p className="subtitle">
        Já possui uma conta? <Link href="/login">Entrar.</Link>
      </p>

      <form className="form">
        <div className="form-group">
          <label htmlFor="usuario">USUÁRIO</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-MAIL</label>
          <input
            type="email"
            id="email"
            name="email"
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

        <div className="form-group">
          <p>FUNÇÃO (SELECIONE UMA OU MAIS)</p>

          <label className={styles.checkboxCard}>
            <span>ALUNO(A)</span>
            <input
              type="checkbox"
              name="funcao"
              value="aluno"
            />
          </label>

          <label className={styles.checkboxCard}>
            <span>INSTRUTOR(A)</span>
            <input
              type="checkbox"
              name="funcao"
              value="instrutor"
            />
          </label>
        </div>

        <button
          className={authStyles.btnSubmit}
          type="submit"
          disabled
        >
          OK
        </button>
      </form>
    </main>
  );
}