/*
  Beatriz Lima de Moura - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

type HeaderProps = {
  activePage: "forum" | "topics" | "tutors";
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchLabel?: string;
};

const navigationItems = [
  { label: "Início", href: "/forum", page: "forum", icon: "/assets/initial.png" },
  { label: "Tópicos", href: "/topics", page: "topics", icon: "/assets/topics.png" },
  { label: "Tutores", href: "/tutors", page: "tutors", icon: "/assets/tutors.png" },
] as const;

export default function Header({
  activePage,
  searchValue,
  onSearchChange,
  searchLabel = "Pesquisar",
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Página inicial">
        <Image
          className={styles.logo}
          src="/assets/logo.png"
          alt="Logo Reforço Comunitário"
          width={80}
          height={50}
          priority
        />
      </Link>

      {onSearchChange && (
        <div className={styles.searchBar}>
          <input
            type="search"
            placeholder="Pesquise aqui..."
            aria-label={searchLabel}
            value={searchValue ?? ""}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      )}

      <nav className={styles.navigation} aria-label="Navegação principal">
        {navigationItems.map((item) => (
          <Link
            key={item.page}
            href={item.href}
            className={`${styles.navigationButton} ${
              activePage === item.page ? styles.active : ""
            }`}
            aria-current={activePage === item.page ? "page" : undefined}
          >
            <Image
              className={styles.navigationIcon}
              src={item.icon}
              alt=""
              width={18}
              height={18}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}