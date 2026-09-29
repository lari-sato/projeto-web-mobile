const tutors = [
    { name: 'Maria Cláudia Carvalho', image: 'Maria-Claudia-Carvalho.jpg', topics: ['Matemática', 'Física', 'Química'] },
    { name: 'Caio Kimura', image: 'Caio-Kimura.jpg', topics: ['Programação', 'Matemática', 'Educação Financeira'] },
    { name: 'Alice Mayumi', image: 'Alice-Mayumi.jpg', topics: ['Português', 'Redação', 'Inglês'] },
    { name: 'Juliane Magalhães', image: 'Juliane-Magalhaes.jpg', topics: ['História', 'Geografia', 'Artes'] },
    { name: 'Dandára Souza', image: 'Dandara-Souza.jpg', topics: ['Português', 'Redação', 'Artes'] },
    { name: 'Isaque Junior Tavares', image: 'Isaque-Junior-Tavares.png', topics: ['Matemática', 'Física', 'Programação'] },
    { name: 'Tati Matos', image: 'Tati-Matos.jpg', topics: ['Português', 'Redação'] },
    { name: 'Roberto Almeida', image: 'Roberto-Almeida.jpg', topics: ['Programação', 'Matemática'] },
    { name: 'Fernanda Motta', image: 'Fernanda-Motta.jpg', topics: ['Biologia', 'Química', 'Geografia'] },
    { name: 'Rafael Campos', image: 'Rafael-Campos.jpg', topics: ['Biologia', 'Química'] },
    { name: 'Bruno Teixeira', image: 'Bruno-Teixeira.jpg', topics: ['História', 'Geografia'] },
    { name: 'Otávio Flescher', image: 'Otavio-Flescher.jpg', topics: ['Física', 'Química'] },
    { name: 'Leticia Delgado', image: 'Leticia-Delgado.jpg', topics: ['Artes', 'Português', 'Redação'] },
    { name: 'João Pedro da Silva', image: 'Joao-Pedro.jpg', topics: ['Inglês', 'Redação'] },
    { name: 'Flávia Cornélio', image: 'Flavia-Cornelio.jpg', topics: ['Matemática', 'Física'] },
    { name: 'Natália Queiroz', image: 'Natalia-Queiroz.jpg', topics: ['Inglês', 'Português', 'Geografia'] },
    { name: 'Lucas Oliveira', image: 'Lucas-Oliveira.jpg', topics: ['Matemática', 'Física', 'Química'] },
    { name: 'Andréia Nunes', image: 'Andreia-Nunes.jpg', topics: ['Educação Financeira', 'Matemática'] },
    { name: 'Joaquim Bezerra', image: 'Joaquim-Bezerra.jpg', topics: ['História', 'Inglês'] },
    { name: 'Guilherme Otaviano Abreu', image: 'Guilherme-Otaviano-Abreu.png', topics: ['Educação Financeira'] },
    { name: 'Elaine Cristina Soares', image: 'Elaine-Cristina-Soares.jpg', topics: ['Biologia', 'Química', 'Geografia'] },
    { name: 'Liliana Ferraz', image: 'Liliana-Ferraz.jpg', topics: ['Português', 'Redação', 'Artes'] },
    { name: 'Reinaldo Reis', image: 'Reinaldo-Reis.jpg', topics: ['Programação', 'Matemática', 'Educação Financeira'] },
    { name: 'Júlio Brandão', image: 'Julio-Brandao.jpg', topics: ['História', 'Geografia', 'Inglês'] },
];

const searchInput = document.querySelector('.search-bar input');
const prevButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');
const pageIndicator = document.querySelector('.pagination-current');
const selectedTopics = JSON.parse(sessionStorage.getItem('topicosSelecionados')) || [];
const tutorsPerPage = 12;
let currentPage = 1;
let filteredTutors = [];
let selectedTutor = null;

// Cria o grid
const grid = document.createElement('section');
grid.classList.add('tutors');
const containerContent = document.querySelector('.content');
const pagination = document.querySelector('.pagination');
containerContent.insertBefore(grid, pagination);

// Cria um card de tutor
function createTutorCard(tutor) {
    const newTutor = document.createElement('article');
    newTutor.classList.add('tutor-card');

    const label = document.createElement('label');
    label.classList.add('tutor-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'tutor';
    checkbox.value = tutor.name;
    checkbox.classList.add('tutor-radio');
    checkbox.checked = selectedTutor === tutor.name;

    const image = document.createElement('img');
    image.classList.add('tutor-image');
    image.src = `../../assets/tutor-images/${tutor.image}`;
    image.alt = `Foto de ${tutor.name}`;

    const tutorName = document.createElement('h3');
    tutorName.classList.add('tutor-name');
    tutorName.textContent = tutor.name;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            document.querySelectorAll('.tutor-radio').forEach((item) => {
                if (item !== checkbox) {
                    item.checked = false;
                }
            });
            selectedTutor = tutor.name;
        } else {
            selectedTutor = null;
        }
    });

    label.appendChild(checkbox);
    label.appendChild(image);
    label.appendChild(tutorName);
    newTutor.appendChild(label);

    return newTutor;
}

// Mostra os tutores da página atual
function renderTutors() {
    grid.innerHTML = '';

    const start = (currentPage - 1) * tutorsPerPage;
    const end = start + tutorsPerPage;
    const tutorsOnPage = filteredTutors.slice(start, end);

    tutorsOnPage.forEach((tutor) => {
        const card = createTutorCard(tutor);
        grid.appendChild(card);
    });

    updatePagination();
}

// Atualiza o número da página e os botões
function updatePagination() {
    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

    if (totalPages === 0) {
        pageIndicator.textContent = '0 / 0';
    } else {
        pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    }

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
}

// Filtra pelos tópicos escolhidos e pela pesquisa
function filterTutors() {
    const search = searchInput.value.toLowerCase().trim();

    filteredTutors = tutors.filter((tutor) => {
        const matchesTopic =
            selectedTopics.length === 0 ||
            selectedTopics.some((topic) => tutor.topics.includes(topic));

        const matchesSearch =
            tutor.name.toLowerCase().includes(search);

        return matchesTopic && matchesSearch;
    });

    currentPage = 1;
    renderTutors();
}

// Próxima página
nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredTutors.length / tutorsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        renderTutors();
    }
});

// Página anterior
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTutors();
    }
});

// Pesquisa
searchInput.addEventListener('input', filterTutors);
filterTutors();