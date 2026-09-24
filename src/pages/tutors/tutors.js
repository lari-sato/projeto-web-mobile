const tutors = [
    { name: 'Maria Cláudia Carvalho', image: 'Maria-Claudia-Carvalho.jpg'},
    { name: 'Regina Santos', image: 'Regina-Santos.jpg'},
    { name: 'Caio Kimura', image: 'Caio-Kimura.jpg'},
    { name: 'João Pedro da Silva', image: 'Joao-Pedro.jpg'},
    { name: 'Bruno Teixeira', image: 'Bruno-Teixeira.jpg'},
    { name: 'Tati Matos', image: 'Tati-Matos.jpg'}
];

const searchInput = document.querySelector('.search-bar input');


// Cria os cards dos tutores
const grid = document.createElement('section');
grid.classList.add('tutors');

tutors.forEach((tutor) => {
    const newTutor = document.createElement('article');
    newTutor.classList.add('tutor-card');

    const image = document.createElement('img');
    image.classList.add('tutor-image');
    image.src = `../../assets/tutor-images/${tutor.image}`;
    image.alt = `Foto de ${tutor.name}`;

    const tutorName = document.createElement('h3');
    tutorName.classList.add('tutor-name');
    tutorName.textContent = tutor.name;
    
    const description = document.createElement('p');
    description.classList.add('tutor-description');
    description.textContent = '[Breve descrição]';

    newTutor.appendChild(image);
    newTutor.appendChild(tutorName);
    newTutor.appendChild(description);

    grid.appendChild(newTutor);
});

const containerContent = document.querySelector('.content');
const pagination = document.querySelector('.pagination');
containerContent.insertBefore(grid, pagination);

// Filtra os cards com base no input
searchInput.addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tutor-card');

    cards.forEach((card) => {
        const tutorName = card.querySelector('.tutor-name').textContent.toLowerCase();
        card.style.display = tutorName.includes(input) ? '' : 'none';
    });
});