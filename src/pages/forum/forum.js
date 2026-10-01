const questions = [
    { image: 'Ana-Souza.png', name: "Ana Souza", topic: "Matemática", time: "2h", title: "Como resolver essa questão de função de 1° grau?", description: "Oi, pessoal! Estou com dificuldades nessa questão. Alguém pode me explicar o passo a passo?", responses: "9", likes: "3" },
    { image: 'Pedro-Santos.png', name: "Pedro Santos", topic: "Português", time: "3h", title: "Quando devo usar crase em uma frase?", description: "Sempre fico em dúvida sobre quando a crase é obrigatória. Alguém pode explicar com alguns exemplos?", responses: "6", likes: "5" },
    { image: 'Beatriz-Carvalho.png', name: "Beatriz Carvalho", topic: "Redação", time: "5h", title: "Como construir uma boa introdução para o ENEM?", description: "Gostaria de dicas para apresentar o tema e a tese sem deixar a introdução muito extensa.", responses: "12", likes: "8" },
    { image: 'Carlos-Mendes.png', name: "Carlos Mendes", topic: "História", time: "6h", title: "Quais foram as principais causas da Revolução Francesa?", description: "Estou revisando para a prova e preciso entender a relação entre a crise econômica e o início da revolução.", responses: "7", likes: "4" },
    { image: 'Mariana-Costa.png', name: "Mariana Costa", topic: "Geografia", time: "8h", title: "Qual é a diferença entre tempo e clima?", description: "As definições parecem muito parecidas para mim. Podem explicar a diferença de um jeito simples?", responses: "5", likes: "6" },
    { image: 'Felipe-Alves.png', name: "Felipe Alves", topic: "Inglês", time: "10h", title: "Como usar o present perfect?", description: "Não consigo identificar quando devo usar o present perfect em vez do simple past.", responses: "10", likes: "7" },
    { image: 'Juliana-Rocha.png', name: "Juliana Rocha", topic: "Física", time: "12h", title: "Como calcular a velocidade média?", description: "Tenho dificuldade para saber quais valores devo usar na fórmula quando o percurso tem mais de uma etapa.", responses: "8", likes: "3" },
    { image: 'Gabriel-Martins.png', name: "Gabriel Martins", topic: "Química", time: "1d", title: "Como balancear uma equação química?", description: "Alguém pode mostrar um método para balancear equações sem precisar tentar vários números?", responses: "11", likes: "9" },
    { image: 'Larissa-Fernandes.png', name: "Larissa Fernandes", topic: "Biologia", time: "1d", title: "Qual é a função das mitocôndrias?", description: "Estou estudando a célula e queria entender por que as mitocôndrias são chamadas de usinas de energia.", responses: "4", likes: "5" },
    { image: 'Mateus-Rodrigues.png', name: "Mateus Rodrigues", topic: "Artes", time: "2d", title: "O que caracteriza o movimento modernista?", description: "Preciso identificar as principais características do modernismo brasileiro para um trabalho.", responses: "3", likes: "2" },
    { image: 'Carla-Nascimento.png', name: "Carla Nascimento", topic: "Educação Financeira", time: "2d", title: "Como montar uma reserva de emergência?", description: "Quero começar a guardar dinheiro, mas não sei como definir um valor mensal realista.", responses: "13", likes: "10" },
    { image: 'Renata-Vieira.png', name: "Renata Vieira", topic: "Programação", time: "3d", title: "Para que serve um loop for?", description: "Estou começando a programar em JavaScript e gostaria de entender quando usar o loop for.", responses: "15", likes: "12" }
];

const hexCodes = [
    { topic: "Matemática", color: "#90c2ee", border: "#03405c46" },
    { topic: "Português", color: "#d88484", border: "#500606" },
    { topic: "Redação", color: "#f0acce", border: "#36192d" },
    { topic: "História", color: "#e4a052", border: "#52210a" },
    { topic: "Geografia", color: "#d8cc87", border: "#756404" },
    { topic: "Inglês", color: "#db9ce7", border: "#4b0852" },
    { topic: "Física", color: "#96c9b8", border: "#05352d" },
    { topic: "Química", color: "#8894c4", border: "#060247" },
    { topic: "Biologia", color: "#a0db8e", border: "#065535" },
    { topic: "Artes", color: "#b998e4", border: "#2e0853" },
    { topic: "Educação Financeira", color: "#91694f", border: "#3a1a05" },
    { topic: "Programação", color: "#5faff0", border: "#0f3c6a" }
];

// Cria os cards das perguntas
const grid = document.createElement('section');
grid.classList.add('recent-questions');

const title = document.createElement('h2');
title.textContent = "Perguntas recentes";

grid.appendChild(title);

questions.forEach((question) => {

    const newQuestion = document.createElement('article');
    newQuestion.classList.add('question-card');

    const image = document.createElement('img');
    image.classList.add('question-user-image');
    image.src = `../../assets/student-images/${question.image}`;
    image.alt = `Foto de ${question.name}`;

    newQuestion.appendChild(image);

    const questionInfo = document.createElement('section');
    questionInfo.classList.add('question-info');

    const questionData = document.createElement('section');
    questionData.classList.add('question-data');

    const name = document.createElement('p');
    name.textContent = question.name;

    const date = document.createElement('article');
    date.classList.add('date');
    date.textContent = question.time + " atrás";

    const topic = document.createElement('article');
    topic.classList.add('topic');
    topic.textContent = question.topic;
    topic.style.backgroundColor = hexCodes.find(item => item.topic === question.topic).color;
    
    const borderColor = hexCodes.find(item => item.topic === question.topic).border;
    topic.style.border = `1px solid ${borderColor}`;
    topic.style.color = borderColor;

    questionData.appendChild(name);
    questionData.appendChild(date);
    questionData.appendChild(topic);

    questionInfo.appendChild(questionData);

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.title;

    const description = document.createElement('p');
    description.textContent = question.description;

    questionInfo.appendChild(questionTitle);
    questionInfo.appendChild(description);

    const questionStats = document.createElement('section');
    questionStats.classList.add('question-interactions');

    const responses = document.createElement('p');
    responses.textContent = question.responses + " respostas";

    const likes = document.createElement('p');
    likes.textContent = question.likes + " likes";

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-button');
    saveButton.textContent = 'Salvar';

    questionStats.appendChild(responses);
    questionStats.appendChild(likes);
    questionStats.appendChild(saveButton);

    questionInfo.appendChild(questionStats);

    newQuestion.appendChild(questionInfo);

    grid.appendChild(newQuestion);
});

const containerContent = document.querySelector('.content');
containerContent.appendChild(grid);

// Navegação entre páginas no header
const initialButton = document.querySelector('.navigation-button[value="initial"]');

initialButton.addEventListener('click', () => {
    window.location.href = '../forum/forum.html';
});


const topicsButton = document.querySelector('.navigation-button[value="topics"]');

topicsButton.addEventListener('click', () => {
    window.location.href = '../topics/topics.html';
});


const tutorsButton = document.querySelector('.navigation-button[value="tutors"]');

tutorsButton.addEventListener('click', () => {
    window.location.href = '../tutors/tutors.html';
});