const btnSubmit = document.querySelector('.btn-submit');

const topics = [
    { name: 'Matemática', image: 'topico-matematica.jpg' },
    { name: 'Português', image: 'topico-portugues.jpg' },
    { name: 'Redação', image: 'topico-redacao.jpg' },
    { name: 'História', image: 'topico-historia.jpg' },
    { name: 'Geografia', image: 'topico-geografia.jpg' },
    { name: 'Inglês', image: 'topico-ingles.jpg' },
    { name: 'Física', image: 'topico-fisica.jpg' },
    { name: 'Química', image: 'topico-quimica.jpg' },
    { name: 'Biologia', image: 'topico-biologia.jpg' },
    { name: 'Artes', image: 'topico-artes.jpg' },
    { name: 'Educação Financeira', image: 'topico-educacao-financeira.jpg' },
    { name: 'Programação', image: 'topico-programacao.jpg' }
];

const searchInput = document.querySelector('.search-bar input');


// Cria os cards dos tópicos
const grid = document.createElement('section');
grid.classList.add('topics-grid');

topics.forEach((topic) => {

    const newTopic = document.createElement('article');
    newTopic.classList.add('topic-card');

    const newLabel = document.createElement('label');

    const newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.name = 'topico';
    newCheckbox.value = topic.name;
    newCheckbox.classList.add('topic-checkbox');

    const imagePlaceholder = document.createElement('div');
    imagePlaceholder.classList.add('image-placeholder');

    const topicImg = document.createElement('img');
    topicImg.classList.add('topic-image');
    topicImg.src = `../../assets/topics-images/${topic.image}`;
    topicImg.alt = `Tópico de ${topic.name}`;

    imagePlaceholder.appendChild(topicImg);

    const topicName = document.createElement('span');
    topicName.classList.add('topic-name');
    topicName.textContent = topic.name;

    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(imagePlaceholder);
    newLabel.appendChild(topicName);

    newTopic.appendChild(newLabel);

    grid.appendChild(newTopic);
});

const containerContent = document.querySelector('.content');
const buttonContainer = document.querySelector('.button-container');
containerContent.insertBefore(grid, buttonContainer);

// Filtra os cards com base no input
searchInput.addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card');

    cards.forEach((card) => {
        const topicName = card.querySelector('.topic-name').textContent.toLowerCase();
        card.style.display = topicName.includes(input) ? '' : 'none';
    });
});


// Confere se algum tópico foi escolhido ao clicar no botão
btnSubmit.addEventListener('click', () => {
    
    const checkboxesSelecionados = document.querySelectorAll('.topic-checkbox:checked');
    
    const topicosEscolhidos = Array.from(checkboxesSelecionados).map(checkbox => {
        return checkbox.closest('.topic-card').querySelector('.topic-name').textContent;
    });

    if (topicosEscolhidos.length === 0) {
        alert('Por favor, selecione pelo menos um tópico!');
    } else {
        alert(`Você selecionou: ${topicosEscolhidos.join(', ')}`);
    }
});