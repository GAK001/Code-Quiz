var clearScoresEl = document.getElementById("clear");

clearScoresEl.addEventListener("click", function () {
  localStorage.clear();
});

// Get the high scores from local storage
var highScores = JSON.parse(localStorage.getItem("highS"));

// Sort the high scores array in descending order by the result property
highScores.sort(function (a, b) {
  return b.result - a.result;
});

// Get the element where the high scores will be displayed
var highScoresList = document.getElementById("highscores");

// Loop through the high scores array and create list items for each score
for (var i = 0; i < highScores.length; i++) {
  var highScore = highScores[i];
  var li = document.createElement("li");
  li.setAttribute("data-index", i);
  li.textContent = highScore.Name + " - " + highScore.result;
  highScoresList.appendChild(li);
}
