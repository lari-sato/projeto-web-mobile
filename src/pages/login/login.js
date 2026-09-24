const form = document.querySelector('.form');
const button = document.querySelector('.btn-submit');

function validateForm() {
    button.disabled = !form.checkValidity();
}

form.addEventListener('input', validateForm);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    window.location.href = '../topics/topics.html';
});