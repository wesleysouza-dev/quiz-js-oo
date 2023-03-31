import { Answers } from "./Class/Answers.js";
import { Players } from "./Class/Players.js";
import { Statistics } from "./Class/Statistics.js";

//Global - .env
var URL_QUIZ_QUESTIONS = "https://projects.wesleysouza.dev/api/quiz/";

// #Content Quiz
const welcome = document.querySelector("#welcome");
const quizForm = document.querySelector("#quizForm");
const quizContent = document.querySelector("#quizContent");
const subText = document.querySelector(".sub-text");
const currentStep = document.querySelector(".current-step");
const buttonNextStep = document.querySelector("#buttonNextStep");
const loader = document.querySelector("#loader");
const step = document.querySelector(".step");
const quizResults = document.querySelector("#quizResults");
const totalHits = document.querySelector("#totalHits");
const totalErrors = document.querySelector("#totalErrors");
const totalQuestions = document.querySelector("#totalQuestions");
const playerName = document.querySelector("#playerName");
const playerMail = document.querySelector("#playerMail");
const resetData = document.querySelector("#resetData");

// #Register
// - field values
const fullName = document.querySelector("#fieldName");
const email = document.querySelector("#fieldMail");
const profession = document.querySelector("#fieldProfession");
const age = document.querySelector("#fieldAge");
const registerButton = document.querySelector("#registerButton");
const showCurrentStep = document.querySelector("#showCurrentStep");

const Answer = new Answers();
let Statistic;
let Player;

// Button Register
registerButton.addEventListener("click", () => {
  // Format layout
  welcome.style.display =
    buttonNextStep.style.display =
    quizResults.style.display =
      "none";

  quizContent.style.display =
    currentStep.style.display =
    loader.style.display =
    resetData.style.display =
      "block";

  quizForm.classList.add("d-flex");
  quizForm.classList.remove("d-none");

  subText.textContent =
    "Selecione a resposta desejada e prossiga. Após avançar não será possível retroceder.";

  // Players
  Player = new Players(
    getValue(fullName),
    getValue(email),
    getValue(profession),
    getValue(age)
  );

  Statistic = new Statistics(Player);

  // Call data questions loading
  fetchApiQuiz()
    .then((data) => {
      const { title, questions } = data.quiz;
      loopMountedQuestions(questions);
      Answer.addTotalQuestions = questions.length;
      Statistic.addListQuestions = [...questions];
    })
    .finally(() => {
      const currentElement = document.querySelector(
        `.step-${Answer.currentStep}`
      );
      currentElement.style.display = "block";
      buttonNextStep.style.display = "table";
      loader.style.display = "none";

      updateQuestionOf(showCurrentStep);
    });
});

// Next question
buttonNextStep.addEventListener("click", () => {
  const nextStep = Answer.currentStep + 1;
  const optionName = document.querySelector(
    `input[name='question-${nextStep}']:checked`
  );

  if (!optionName) {
    alert("Selecione uma resposta para prosseguir");
    return;
  }

  // Next step if exist step pending
  const steps = document.querySelectorAll(".step");
  hideAllSteps(steps);
  Answer.addAnswer = optionName.value;

  if (!checkLastStep(nextStep, Answer.getTotalQuestions)) {
    Answer.save = nextStep;

    const stepShow = document.querySelector(`.step-${nextStep}`);
    stepShow.style.display = "block";

    return updateQuestionOf(showCurrentStep);
  }

  // Show results
  quizForm.classList.remove("d-flex");
  quizForm.classList.add("d-none");
  quizResults.style.display = "block";

  const { successful, errors, ...rest } = getResults(
    Statistic.listQuestions,
    Answer.answers
  );
  totalQuestions.textContent = Statistic.listQuestions.length;
  totalHits.textContent = successful;
  totalErrors.textContent = errors;
  showCurrentStep.innerHTML = Statistic.displayTextResult();
  playerName.innerHTML = Player.fullName;
  playerMail.innerHTML = Player.getMail;
});

resetData.addEventListener("click", () => {
  if (confirm("Deseja realmente excluir os dados salvos")) {
    resetDataAndRestarQuiz();
  }
});

// #Aux
const getValue = (field) => {
  return field?.value;
};

const elementItemQuestion = ({ question, answer, options, ...rest }, index) => {
  const questionsContent = document.querySelector("#questions");
  const questionNumber = index + 1;

  let html = `<div class="form-group step step-${index}" style="display: none">
        <h5 class="d-flex mb-4">${questionNumber}) <span id="question-${questionNumber}" class="ms-2">${question}</span></h5>`;

  options.map((option) => {
    html += `<div class="form-check mt-3">
        <input class="form-check-input" type="radio" name="question-${questionNumber}" id="question-${questionNumber}-${option.key}" value="${option.key}">
        <label class="form-check-label" for="question-${questionNumber}-${option.key}" id="question1a-label">${option.key}) ${option.value}</label>
      </div>`;
  });

  html += `</div>`;
  return (questionsContent.innerHTML += html);
};

const fetchApiQuiz = async () => {
  try {
    const response = await fetch(URL_QUIZ_QUESTIONS);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.error(error);
  }
};

const loopMountedQuestions = (questions) => {
  questions.map((item, index) => {
    elementItemQuestion(item, index);
  });
};

const updateQuestionOf = (element) => {
  element.textContent = `Pergunta ${Answer.currentStep + 1} de ${
    Answer.getTotalQuestions
  }`;
};

const checkLastStep = (stepGlobal, stepCurrent) => {
  return stepGlobal >= stepCurrent;
};

const getResults = (questions, answers) => {
  const result = {
    successful: 0,
    errors: 0,
  };
  questions.map((question, index) => {
    if (question.answer == answers[index]) {
      return (result.successful += 1);
    }

    return (result.errors += 1);
  });

  return result;
};

const resetDataAndRestarQuiz = () => {
  Player.resetQuiz(Answer, Statistic);

  const steps = document.querySelectorAll(".step");
  hideAllSteps(steps);

  showCurrentStep.innerHTML = "";

  quizContent.style.display =
    resetData.style.display =
    showCurrentStep.style.display =
      "none";
  welcome.style.display = buttonNextStep.style.display = "block";
};

const hideAllSteps = (element) => {
  element.forEach((step) => {
    step.style.display = "none";
  });
};
