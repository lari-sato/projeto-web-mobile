const questions = [
    { image: 'Joao-Pedro.jpg', name: "João Pedro", topic: "Matemática", time: "2h", title: "Como resolver essa questão de função de 1° grau?", description: "Oi, pessoal! Estou com dificuldades nessa questão. Alguém pode me explicar o passo a passo?", responses: "9", likes: "3" },
    { image: 'Alice-Mayumi.jpg', name: "Alice Mayumi", topic: "Português", time: "3h", title: "Quando devo usar crase em uma frase?", description: "Sempre fico em dúvida sobre quando a crase é obrigatória. Alguém pode explicar com alguns exemplos?", responses: "6", likes: "5" },
    { image: 'Bruno-Teixeira.jpg', name: "Bruno Teixeira", topic: "Redação", time: "5h", title: "Como construir uma boa introdução para o ENEM?", description: "Gostaria de dicas para apresentar o tema e a tese sem deixar a introdução muito extensa.", responses: "12", likes: "8" },
    { image: 'Dandara-Souza.jpg', name: "Dandara Souza", topic: "História", time: "6h", title: "Quais foram as principais causas da Revolução Francesa?", description: "Estou revisando para a prova e preciso entender a relação entre a crise econômica e o início da revolução.", responses: "7", likes: "4" },
    { image: 'Caio-Kimura.jpg', name: "Caio Kimura", topic: "Geografia", time: "8h", title: "Qual é a diferença entre tempo e clima?", description: "As definições parecem muito parecidas para mim. Podem explicar a diferença de um jeito simples?", responses: "5", likes: "6" },
    { image: 'Fernanda-Motta.jpg', name: "Fernanda Motta", topic: "Inglês", time: "10h", title: "Como usar o present perfect?", description: "Não consigo identificar quando devo usar o present perfect em vez do simple past.", responses: "10", likes: "7" },
    { image: 'Guilherme-Otaviano-Abreu.png', name: "Guilherme Otaviano", topic: "Física", time: "12h", title: "Como calcular a velocidade média?", description: "Tenho dificuldade para saber quais valores devo usar na fórmula quando o percurso tem mais de uma etapa.", responses: "8", likes: "3" },
    { image: 'Isaque-Junior-Tavares.png', name: "Isaque Junior", topic: "Química", time: "1d", title: "Como balancear uma equação química?", description: "Alguém pode mostrar um método para balancear equações sem precisar tentar vários números?", responses: "11", likes: "9" },
    { image: 'Juliane-Magalhaes.jpg', name: "Juliane Magalhães", topic: "Biologia", time: "1d", title: "Qual é a função das mitocôndrias?", description: "Estou estudando a célula e queria entender por que as mitocôndrias são chamadas de usinas de energia.", responses: "4", likes: "5" },
    { image: 'Julio-Brandao.jpg', name: "Julio Brandão", topic: "Artes", time: "2d", title: "O que caracteriza o movimento modernista?", description: "Preciso identificar as principais características do modernismo brasileiro para um trabalho.", responses: "3", likes: "2" },
    { image: 'Leticia-Delgado.jpg', name: "Letícia Delgado", topic: "Educação Financeira", time: "2d", title: "Como montar uma reserva de emergência?", description: "Quero começar a guardar dinheiro, mas não sei como definir um valor mensal realista.", responses: "13", likes: "10" },
    { image: 'Lucas-Oliveira.jpg', name: "Lucas Oliveira", topic: "Programação", time: "3d", title: "Para que serve um loop for?", description: "Estou começando a programar em JavaScript e gostaria de entender quando usar o loop for.", responses: "15", likes: "12" }
];

const hexCodes = [
    { topic: "Matemática", color: "#FF5733", border: "#6a1907" },
    { topic: "Português", color: "#33FF57", border: "#0f6a19" },
    { topic: "Redação", color: "#3357FF", border: "#0f196a" },
    { topic: "História", color: "#FF33A1", border: "#6a0f3c" },
    { topic: "Geografia", color: "#A133FF", border: "#3c0f6a" },
    { topic: "Inglês", color: "#33FFF5", border: "#0f6a6a" },
    { topic: "Física", color: "#F5FF33", border: "#6a6a0f" },
    { topic: "Química", color: "#FF8C33", border: "#6a3c0f" },
    { topic: "Biologia", color: "#a0db8e", border: "#098553" },
    { topic: "Artes", color: "#8C33FF", border: "#3c0f6a" },
    { topic: "Educação Financeira", color: "#FF338C", border: "#6a0f3c" },
    { topic: "Programação", color: "#33A1FF", border: "#0f3c6a" }
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
    image.src = `../../assets/tutor-images/${question.image}`;
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
    topic.style.border = `1px solid ${hexCodes.find(item => item.topic === question.topic).border}`;

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