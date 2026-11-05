/**
 Beatriz Lima de Moura - RA: 10416616
 Giovana Simões Franco - RA: 10417646
 Julia Santos Oliveira - RA: 10417672
 Larissa Yuri Sato - RA: 10418318
 */

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
};

import styles from "./searchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Pesquise aqui...",
  ariaLabel = "Pesquisar",
}: SearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <input
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}