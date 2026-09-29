const tutors = [
    { name: 'Maria Cláudia Carvalho', image: 'Maria-Claudia-Carvalho.jpg' },
    { name: 'Caio Kimura', image: 'Caio-Kimura.jpg' },
    { name: 'Alice Mayumi', image: 'Alice-Mayumi.jpg' },
    { name: 'Juliane Magalhães', image: 'Juliane-Magalhaes.jpg' },
    { name: 'Dandára Souza', image: 'Dandara-Souza.jpg' },
    { name: 'Isaque Junior Tavares', image: 'Isaque-Junior-Tavares.png' },
    { name: 'Tati Matos', image: 'Tati-Matos.jpg' },
    { name: 'Roberto Almeida', image: 'Roberto-Almeida.jpg' },
    { name: 'Fernanda Motta', image: 'Fernanda-Motta.jpg' },
    { name: 'Rafael Campos', image: 'Rafael-Campos.jpg' },
    { name: 'Bruno Teixeira', image: 'Bruno-Teixeira.jpg' },
    { name: 'Otávio Flescher', image: 'Otavio-Flescher.jpg' },
    { name: 'Leticia Delgado', image: 'Leticia-Delgado.jpg' },
    { name: 'João Pedro da Silva', image: 'Joao-Pedro.jpg' },
    { name: 'Flávia Cornélio', image: 'Flavia-Cornelio.jpg' },
    { name: 'Natália Queiroz', image: 'Natalia-Queiroz.jpg' },
    { name: 'Lucas Oliveira', image: 'Lucas-Oliveira.jpg' },
    { name: 'Andréia Nunes', image: 'Andreia-Nunes.jpg' },
    { name: 'Joaquim Bezerra', image: 'Joaquim-Bezerra.jpg' },
    { name: 'Guilherme Otaviano Abreu', image: 'Guilherme-Otaviano-Abreu.png' },
    { name: 'Elaine Cristina Soares', image: 'Elaine-Cristina-Soares.jpg' },
    { name: 'Liliana Ferraz', image: 'Liliana-Ferraz.jpg' },
    { name: 'Reinaldo Reis', image: 'Reinaldo-Reis.jpg' },
    { name: 'Júlio Brandão', image: 'Julio-Brandao.jpg' },

];

const searchInput = document.querySelector('.search-bar input');
const prevButton = document.querySelector('#prev-page');
const nextButton = document.querySelector('#next-page');
const pageIndicator = document.querySelector('.pagination-current');
const tutorsPerPage = 12;
let currentPage = 1;
let filteredTutors = tutors;
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

  /*  const description = document.createElement('p');
    description.classList.add('tutor-description');
    description.textContent = '[Breve descrição]'; */

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
    //label.appendChild(description);

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
    pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
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
searchInput.addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    filteredTutors = tutors.filter((tutor) =>
        tutor.name.toLowerCase().includes(input)
    );
    currentPage = 1;
    renderTutors();
});

renderTutors();