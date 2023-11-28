// Global variables
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
let questionDisplay = document.getElementById("question");
let timeDisplay = document.getElementById("timeDisplay");
let leaderBoard = document.getElementById("leaderBoard");
let quiz = document.getElementById("quiz");
let submitScore = document.getElementById("submitScore");
let submitScoreBtn = document.getElementById("submitScoreBtn");
let scoresDisplay = document.getElementById("scores");
// Array of questions - once the question is answered, it is removed from the array - when the array is empty, the quiz is finished
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts",
      },
      {
        question: "The condition in an if / else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correct: "parenthesis",
      },
      {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above",
      },
      {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correct: "quotes",
      },
      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log",
      },
]
let question;
let timer;
let timeLeft = 75; 

// Event listener is in the index page which calls this function when the start button is clicked
function startQuiz() {
    // Removes the start button and starts the quiz
    document.getElementById("startButton").style.display = "none";
    // Displays the questions and answers
    document.querySelector(".answers").style.display = "block";
    // Starts the timer
    timeDisplay.textContent = "Time:" + timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        timeDisplay.textContent = "Time:" + timeLeft;
        if (timeLeft <= 0) {
            showScore();
        }
    }, 1000);
    // Displays the first question
    displayQuestion();
}

function displayQuestion() {
    // Selects a random question from the questions array
    question = questions[Math.floor(Math.random() * questions.length)];
    // Displays the question
    questionDisplay.textContent = question.question;

    // Itterates through the possible answers to the question
    for (let i = 0; i < question.answers.length; i++) {
        let btn = document.getElementById("btn" + (i + 1));
        btn.textContent = question.answers[i];
        btn.addEventListener("click", checkAnswer);
    }
}

// Checks if the user clicked on the correct answer
function checkAnswer() {
    // Hide the correct and wrong display
    correctDisplay.style.display = "none";
    wrongDisplay.style.display = "none";
     // Checks if the user clicked on the correct answer
    if (question.correct === this.textContent) {
        correctDisplay.style.display = "block";
    } else {
        // if not, display the wrong display and subtract 10 seconds from the timer
        wrongDisplay.style.display = "block";
        timeLeft -= 10; 
    }
    // remove question from array
    questions.splice(questions.indexOf(question), 1);
    if (questions.length === 0) {
        // quiz is over if no more questions left
        showScore();
    }
    // displays a new question
    displayQuestion();
}

// Ends the quiz and displays the user's score and a form to submit their score
function showScore() {
    // Stops the timer
    clearInterval(timer);
    // Adds the user's score to the dom
    document.querySelector("#userScore").innerHTML = "Your final score is " + timeLeft;
    // Shows the submit score section
    submitScore.style.display = "flex";
    // Hides the quiz section
    quiz.style.display = "none";
}

// Shows the leader board section and sorts the scores from highest to lowest
function showLeaderBoard() {
    // Stops the timer incase the user clicks on the view high scores button while taking the quiz
    clearInterval(timer);
    // Hides the quiz and submit score sections
    quiz.style.display = "none";
    submitScore.style.display = "none";
    // Shows the leaderboard section
    leaderBoard.style.display = "flex";
    // Gets the scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores"));
    // Sorts the scores from highest to lowest
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    // Resets the scores display
    scoresDisplay.innerHTML = "";
    for (let score of scores) {
        let li = document.createElement("li");
        li.textContent = score.initials + " : " + score.score;
        scoresDisplay.appendChild(li);
    }
}

// called by event listener - refreshes the page which starts the quiz over
function startScreen () {
    window.location.reload();
}

// called by event listener - erases the leader board from local storage and resets the scores display
function resetLeaderBoard() {
    localStorage.removeItem("scores");
    scoresDisplay.innerHTML = "";
}

// event listener is called when the user clicks on the submit score button after the quiz is over
submitScoreBtn.addEventListener("click", function (event) {
    // prevents the page from refreshing
    event.preventDefault();
    let score = {
        score: timeLeft,
        initials: document.getElementById("initials").value
    }
    // checks if the user entered their initials
    if (score.initials === "") {
        alert("Please enter your initials");
        return;
    }
    // gets the scores from local storage
    let scores = JSON.parse(localStorage.getItem("scores"));
    // creates an empty array if there are no scores in local storage
    if (scores === null) {
        scores = [];
    }
    // adds the new score to the array
    scores.push(score);
    // saves the array to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    // displays the leader board
    showLeaderBoard();
});