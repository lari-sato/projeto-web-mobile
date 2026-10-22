/*
  Beatriz Lima de Oliveira - RA: 10416616
  Giovana Simões Franco - RA: 10417646
  Julia Santos Oliveira - RA: 10417672
  Larissa Yuri Sato - RA: 10418318
*/

const tutors = [
  { name: "Maria Cláudia Carvalho", image: "Maria-Claudia-Carvalho.jpg", topics: ["Matemática", "Física", "Química"] },
  { name: "Caio Kimura", image: "Caio-Kimura.jpg", topics: ["Programação", "Matemática", "Educação Financeira"] },
  { name: "Alice Mayumi", image: "Alice-Mayumi.jpg", topics: ["Português", "Redação", "Inglês"] },
  { name: "Juliane Magalhães", image: "Juliane-Magalhaes.jpg", topics: ["História", "Geografia", "Artes"] },
  { name: "Dandára Souza", image: "Dandara-Souza.jpg", topics: ["Português", "Redação", "Artes"] },
  { name: "Isaque Junior Tavares", image: "Isaque-Junior-Tavares.png", topics: ["Matemática", "Física", "Programação"] },
  { name: "Tati Matos", image: "Tati-Matos.jpg", topics: ["Português", "Redação"] },
  { name: "Roberto Almeida", image: "Roberto-Almeida.jpg", topics: ["Programação", "Matemática"] },
  { name: "Fernanda Motta", image: "Fernanda-Motta.jpg", topics: ["Biologia", "Química", "Geografia"] },
  { name: "Rafael Campos", image: "Rafael-Campos.jpg", topics: ["Biologia", "Química"] },
  { name: "Bruno Teixeira", image: "Bruno-Teixeira.jpg", topics: ["História", "Geografia"] },
  { name: "Otávio Flescher", image: "Otavio-Flescher.jpg", topics: ["Física", "Química"] },
  { name: "Leticia Delgado", image: "Leticia-Delgado.jpg", topics: ["Artes", "Português", "Redação"] },
  { name: "João Pedro da Silva", image: "Joao-Pedro.jpg", topics: ["Inglês", "Redação"] },
  { name: "Flávia Cornélio", image: "Flavia-Cornelio.jpg", topics: ["Matemática", "Física"] },
  { name: "Natália Queiroz", image: "Natalia-Queiroz.jpg", topics: ["Inglês", "Português", "Geografia"] },
  { name: "Lucas Oliveira", image: "Lucas-Oliveira.jpg", topics: ["Matemática", "Física", "Química"] },
  { name: "Andréia Nunes", image: "Andreia-Nunes.jpg", topics: ["Educação Financeira", "Matemática"] },
  { name: "Joaquim Bezerra", image: "Joaquim-Bezerra.jpg", topics: ["História", "Inglês"] },
  { name: "Guilherme Otaviano Abreu", image: "Guilherme-Otaviano-Abreu.png", topics: ["Educação Financeira"] },
  { name: "Elaine Cristina Soares", image: "Elaine-Cristina-Soares.jpg", topics: ["Biologia", "Química", "Geografia"] },
  { name: "Liliana Ferraz", image: "Liliana-Ferraz.jpg", topics: ["Português", "Redação", "Artes"] },
  { name: "Reinaldo Reis", image: "Reinaldo-Reis.jpg", topics: ["Programação", "Matemática", "Educação Financeira"] },
  { name: "Júlio Brandão", image: "Julio-Brandao.jpg", topics: ["História", "Geografia", "Inglês"] },
];

window.initTutorsPage = function () {
  const grid = document.querySelector("#tutors-grid");

  // Evita inicializar duas vezes o mesmo elemento.
  if (!grid || grid.dataset.initialized === "true") return;
  grid.dataset.initialized = "true";

  const searchInput = document.querySelector("#tutor-search");
  const prevButton = document.querySelector("#prev-page");
  const nextButton = document.querySelector("#next-page");
  const pageIndicator = document.querySelector("#page-indicator");

  if (!searchInput || !prevButton || !nextButton || !pageIndicator) return;

  const tutorsPerPage = 12;
  const selectedTopics = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("topicosSelecionados")) || [];
    } catch {
      return [];
    }
  })();

  let currentPage = 1;
  let filteredTutors = [];
  let selectedTutor = null;

  const classes = {
    card: grid.dataset.tutorCardClass,
    label: grid.dataset.tutorLabelClass,
    radio: grid.dataset.tutorRadioClass,
    image: grid.dataset.tutorImageClass,
    name: grid.dataset.tutorNameClass,
  };

  function createTutorCard(tutor) {
    const card = document.createElement("article");
    card.classList.add(classes.card);

    const label = document.createElement("label");
    label.classList.add(classes.label);

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "tutor";
    input.value = tutor.name;
    input.classList.add(classes.radio);
    input.checked = selectedTutor === tutor.name;

    const image = document.createElement("img");
    image.classList.add(classes.image);
    image.src = `/assets/tutor-images/${tutor.image}`;
    image.alt = `Foto de ${tutor.name}`;

    const name = document.createElement("h3");
    name.classList.add(classes.name);
    name.textContent = tutor.name;

    input.addEventListener("change", () => {
      if (input.checked) {
        grid.querySelectorAll("input[name='tutor']").forEach((item) => {
          if (item !== input) item.checked = false;
        });

        selectedTutor = tutor.name;
      } else {
        selectedTutor = null;
      }
    });

    label.append(input, image, name);
    card.appendChild(label);

    return card;
  }

  function updatePagination() {
    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

    pageIndicator.textContent =
      totalPages === 0 ? "0 / 0" : `${currentPage} / ${totalPages}`;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = totalPages === 0 || currentPage === totalPages;
  }

  function renderTutors() {
    grid.replaceChildren();

    const start = (currentPage - 1) * tutorsPerPage;
    const tutorsOnPage = filteredTutors.slice(start, start + tutorsPerPage);

    tutorsOnPage.forEach((tutor) => {
      grid.appendChild(createTutorCard(tutor));
    });

    updatePagination();
  }

  function filterTutors() {
    const search = searchInput.value.toLowerCase().trim();

    filteredTutors = tutors.filter((tutor) => {
      const matchesTopic =
        selectedTopics.length === 0 ||
        selectedTopics.some((topic) => tutor.topics.includes(topic));

      const matchesSearch = tutor.name.toLowerCase().includes(search);

      return matchesTopic && matchesSearch;
    });

    // Se o tutor selecionado deixar de aparecer no filtro, limpa a seleção.
    if (!filteredTutors.some((tutor) => tutor.name === selectedTutor)) {
      selectedTutor = null;
    }

    currentPage = 1;
    renderTutors();
  }

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderTutors();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTutors();
    }
  });

  searchInput.addEventListener("input", filterTutors);

  filterTutors();
};