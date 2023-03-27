// #Content Quiz
const welcome = document.querySelector('#welcome');
const quizContent = document.querySelector('#quizContent');
const subText = document.querySelector('.sub-text');
const currentStep = document.querySelector('.current-step');

// #Register
// - field values
const fullName = document.querySelector('#fieldName');
const email = document.querySelector('#fieldMail');
const profession = document.querySelector('#fieldProfession');
const age = document.querySelector('#fieldAge');
const registerButton = document.querySelector('#registerButton')

registerButton.addEventListener('click', async () => {
    console.log(getValue(fullName), getValue(email), getValue(profession), getValue(age));
    welcome.style.display = 'none';
    quizContent.style.display = currentStep.style.display = 'block';
    subText.textContent = 'Selecione a resposta desejada e prossiga. Após avançar não será possível retroceder.';

    const questions = await loadQuestions();
    console.log(questions)

})


// #Aux
const getValue = (field) => {
    return field?.value;
}

const elementItemQuestion = ({question, options, ...rest}, index) => {
    return `<div class="form-group step">
<h5>${index}) <span id="question-${index}"></span></h5>
<div class="form-check">
  <input class="form-check-input" type="radio" name="question-${index}" id="question-${index}-${options.key}" value="${options.key}">
  <label class="form-check-label" for="question1a" id="question1a-label">${question}</label>
</div>
</div>`
}

const loadQuestions = () => {
    fetch('./questions.json')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

