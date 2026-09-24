const tutors = [
            'Maria Cláudia Carvalho',
            'Regina Santos',
            'Caio Kimura',
            'João Pedro da Silva',
            'Bruno Teixeira',
            'Tati Matos'
        ];

const searchInput = document.querySelector('.search-bar input');


// Cria os cards dos tutores
const grid = document.createElement('section');
grid.classList.add('tutors');

tutors.forEach((tutor) => {
    const newTutor = document.createElement('article');
    newTutor.classList.add('tutor-card');

    const imagePlaceholder = document.createElement('div');
    imagePlaceholder.classList.add('image-placeholder');

    const image = document.createElement('img');
    image.classList.add('tutor-icon');
    image.src = '../../assets/tutor-icon.svg';
    image.alt = 'Ícone do Tutor';

    imagePlaceholder.appendChild(image);

    const tutorName = document.createElement('h3');
    tutorName.classList.add('tutor-name');
    tutorName.textContent = tutor;
    
    const description = document.createElement('p');
    description.classList.add('tutor-description');
    description.textContent = '[Breve descrição]';

    newTutor.appendChild(imagePlaceholder);
    newTutor.appendChild(tutorName);
    newTutor.appendChild(description);

    grid.appendChild(newTutor);
});

const containerContent = document.querySelector('.content');
containerContent.appendChild(grid);
const pagination = document.querySelector('.pagination');
pagination.before(grid);


// Filtra os cards com base no input
searchInput.addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.tutor-card');

    cards.forEach((card) => {
        const tutorName = card.querySelector('.tutor-name').textContent.toLowerCase();

        if (tutorName.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});