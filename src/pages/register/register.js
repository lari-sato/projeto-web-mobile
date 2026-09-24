const form = document.querySelector('.form');
const button = document.querySelector('.btn-submit');
const checkboxes = document.querySelectorAll('input[name="funcao"]');

function validateForm() {
    const camposValidos = form.checkValidity();

    const algumaFuncaoSelecionada =
        Array.from(checkboxes).some(checkbox => checkbox.checked);

    button.disabled = !(camposValidos && algumaFuncaoSelecionada);
}

form.addEventListener('input', validateForm);
form.addEventListener('change', validateForm);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    window.location.href = '../topics/topics.html';
});