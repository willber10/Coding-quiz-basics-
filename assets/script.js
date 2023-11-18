console.log("Hello World!")

let questionDisplay = document.getElementById("questions");
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
let timeDisplay = document.getElementById("time");
let leaderBoard = document.getElementById("leaderBoard");
let quiz = document.getElementById("quiz");
let submitScore = document.getElementById("submitScore");
let submitScorebtn = document.getElementById("submitScorebtn");
let scoresDisplay = document.getElementById("scores");
const questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "  "
        
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correct: "console.log"
    }
]

let question;
let timer;
let timeLeft = 75;

function startQuiz() {
    // remove the start button and display the questions
    document.getElementById("startButton").style.display = "none";
    // display the answer buttons 
    document.querySelector(".answers").style.display = "block";
    timeDisplay.textContent = "Time: " + timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        timeDisplay.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            ckearInterval(timer);
            showScore();
        }
     }, 1000);
    displayQuestion();
}

function displayQuestion() {
    // display a random question from the questions array
    question = questions[Math.floor(Math.random() * questions.length)];
    questionDisplay.textContent = question.question;
    
    for (let i = 0; i < question.answers.length; i++) {

        let btn = document.getElementById("btn" + (i + 1));

        btn.textContent = question.answers[i];

        btn.addEventListener("click", checkAnswer)

    }
}

function checkAnswer() {

    correctDisplay.style.display = "none";
    wrongDisplay.style.display = "none";
// checks if the user selected the correct answer
    if (question.correct === this.textContent) {
        correctDisplay.style.display = "block";
    } else {
        wrongDisplay.style.display = "block";
        timeLeft -= 10;
    }
// removes the question from the questions array
    questions.splice(questions.indexOf(question), 1);
    // checks if there are any questions left
    if (questions.length === 0) {
        showScore();
    } else {
        displayQuestion();
    }
}

function showScore() {
    clearInterval(timer);
    submitScore.style.display = "flex";
    quiz.style.display = "none";

}
function showLeaderBoard() {
    clearInterval(timer);
    quiz.style.display = "none";
    submitScore.style.display = "none";
    leaderBoard.style.display = "flex";
    let scores = JSON.parse(localStorage.getItem("scores"));
    scores.sort(function (a, b) {
        return b.score - a.score;
    });
    scoresDisplay.innerHTML = "";
    for (let score of scores) {
        let li = document.createElement("li");
        li.textContent = score.initials + ":  " + score.score;
        scoresDisplay.appendChild(li);

    }
}

function startScreen() {
    window.location.reload();
}   

function resetleaderBoard() {
    localStorage.clear();
    scoresDisplay.innerHTML = "";
}

submitScorebtn.addEventListener("click", function (event) {
    event.preventDefault();
    let score = {
        score: timeLeft,
        initials: document.getElementById("initials").value
    }
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    if (scores === null) {
        scores = [];
    }
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
    showLeaderBoard();
    
});