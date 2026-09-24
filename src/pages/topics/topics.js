const btnSubmit = document.querySelector('.btn-submit');

const topics = [
            'Matemática',
            'Português',
            'Redação',
            'História',
            'Geografia',
            'Inglês',
            'Física',
            'Química',
            'Biologia',
            'Artes',
            'Educação Física',
            'Filosofia'
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
    newCheckbox.value = topic;
    newCheckbox.classList.add('topic-checkbox');

    const imagePlaceholder = document.createElement('div');
    imagePlaceholder.classList.add('image-placeholder');

    const topicName = document.createElement('span');
    topicName.classList.add('topic-name');
    topicName.textContent = topic;

    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(imagePlaceholder);
    newLabel.appendChild(topicName);

    newTopic.appendChild(newLabel);

    grid.appendChild(newTopic);
});

const containerContent = document.querySelector('.content');
containerContent.appendChild(grid);
const buttonContainer = document.querySelector('.button-container');
buttonContainer.before(grid);


// Filtra os cards com base no input
searchInput.addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card');

    cards.forEach((card) => {
        const topicName = card.querySelector('.topic-name').textContent.toLowerCase();

        if (topicName.includes(input)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
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
        console.log('Tópicos selecionados:', topicosEscolhidos);
        alert(`Você selecionou: ${topicosEscolhidos.join(', ')}`);
    }
});