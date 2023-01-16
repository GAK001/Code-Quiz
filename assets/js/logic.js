var startButton = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var questions = document.getElementById("questions");
var questionsTitle = document.getElementById("question-title");
var questionsChoices = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var endScreen = document.getElementById("end-screen");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials");
var submit = document.getElementById("submit");
var time = document.getElementById("time");

var timeLeft = 75;
var questionIndex = 0;
var correctAnswerIndex = quizQuestions[questionIndex].correctAnswerIndex;
var correctAnswer = quizQuestions[questionIndex].answers[correctAnswerIndex];
var score = 0;
var highScores = [];

// Start quiz when start button is clicked
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.style.display = "none";
  startQuestions();
  startTimer();
}

function startTimer() {
  var timeInterval = setInterval(function () {
    time.innerHTML = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      time.innerHTML = 0;
      timeLeft = 0;
      clearInterval(timeInterval);
      endQuiz();
      // End quiz when time runs out
    }
  }, 1000);
}

function startQuestions() {
  questions.style.display = "block";
  showQuestion();
}

// Show questions
function showQuestion() {
  var currentQuestion = quizQuestions[questionIndex];
  questionsTitle.textContent = currentQuestion.question;

  choices.innerHTML = "";
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    var button = document.createElement("button");
    button.textContent = currentQuestion.answers[i];
    button.addEventListener("click", checkAnswer);
    choices.appendChild(button);
  }
}
// Check answers
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var correctAnswer =
    quizQuestions[questionIndex].answers[
      quizQuestions[questionIndex].correctAnswerIndex
    ];

  if (selectedAnswer === correctAnswer) {
    feedback.classList.remove("hide");
    feedback.textContent = "Correct!";

    timeLeft += 5;
    questionIndex++;
    if (questionIndex === quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    feedback.classList.remove("hide");
    feedback.textContent = "Wrong!";

    timeLeft -= 15;
    questionIndex++;
    if (questionIndex === quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  }
}
// End quiz
function endQuiz() {
  questions.style.display = "none";
  feedback.style.display = "none";
  endScreen.classList.remove("hide");
  finalScore.textContent = score;
}

submit.addEventListener("click", function () {
  if (localStorage.getItem("highS") !== null) {
    var existingHighScores = JSON.parse(localStorage.getItem("highS"));
    if (Array.isArray(existingHighScores[0])) {
      existingHighScores = existingHighScores[0];
    }
    highScores = existingHighScores;
  }

  highScores.push({ Name: initials.value, result: score });
  localStorage.setItem("highS", JSON.stringify(highScores));

  window.location.href = "highscores.html";
});
