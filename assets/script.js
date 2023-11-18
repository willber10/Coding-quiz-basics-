console.log("Hello World!")

let questionDisplay = document.getElementById("questions");
let correctDisplay = document.getElementById("correct");
let wrongDisplay = document.getElementById("wrong");
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

function startQuiz() {
    document.getElementById("startButton").style.display = "none";
    document.querySelector(".answers").style.display = "block";
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
    }
}
 