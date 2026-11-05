/**
 * Beatriz Lima de Moura - RA: 10416616
 * Giovana Simões Franco - RA: 10417646
 * Julia Santos Oliveira - RA: 10417672
 * Larissa Yuri Sato - RA: 10418318
 */

import Image from "next/image";
import Link from "next/link";

import SearchBar from "@/components/searchBar/SearchBar";

import styles from "./header.module.css";

type HeaderProps = {
  activePage?: "forum" | "topics" | "tutors";
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchLabel?: string;
  simple?: boolean;
};

const navigationItems = [
  {
    label: "Início",
    href: "/forum",
    page: "forum",
    icon: "/assets/icons/initial.png",
  },
  {
    label: "Tópicos",
    href: "/topics",
    page: "topics",
    icon: "/assets/icons/topics.png",
  },
  {
    label: "Tutores",
    href: "/tutors",
    page: "tutors",
    icon: "/assets/icons/tutors.png",
  },
] as const;

export default function Header({
  activePage,
  searchValue,
  onSearchChange,
  searchLabel = "Pesquisar",
  simple = false,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {!simple && (
        <>
          <Link href="/forum" aria-label="Página inicial">
            <Image
              className={styles.logo}
              src="/assets/icons/logo2.png"
              alt="Logo Reforço Comunitário"
              width={80}
              height={50}
              priority
            />
          </Link>

          {onSearchChange && (
            <div className={styles.headerSearch}>
              <SearchBar
                value={searchValue ?? ""}
                onChange={onSearchChange}
                placeholder="Pesquise aqui..."
                ariaLabel={searchLabel}
              />
            </div>
          )}

          <nav
            className={styles.navigation}
            aria-label="Navegação principal"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.page}
                href={item.href}
                className={`${styles.navigationButton} ${
                  activePage === item.page ? styles.active : ""
                }`}
                aria-current={
                  activePage === item.page ? "page" : undefined
                }
              >
                <Image
                  className={`${styles.navigationIcon} ${
                    item.page === "forum" ? styles.homeIcon : ""
                  }`}
                  src={item.icon}
                  alt=""
                  width={item.page === "forum" ? 18 : 24}
                  height={item.page === "forum" ? 18 : 24}
                />

                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}