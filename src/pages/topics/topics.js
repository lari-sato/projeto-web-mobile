const btnSubmit = document.querySelector('.btn-submit');

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
//adicionar no html <script src="topics.js"></script>
