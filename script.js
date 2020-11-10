// HTML element ID's
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d"); 

// Quiz question object
var quizQuestions = [{
    question: "Who invented JavaScript?",
    choiceA: "Oracle",
    choiceB: "Apple",
    choiceC: "CoffeeSoft",
    choiceD: "Netscape",
    correctAnswer: "d"},
  {
    question: "What is pseudocode?",
    choiceA: "Fake code to trick people up",
    choiceB: "Plain language description of a system",
    choiceC: "Technobabble used by coders",
    choiceD: "Code written in the 'Pseudo' language",
    correctAnswer: "b"},
    {
    question: "What does CSS do?",
    choiceA: "It documents 'C' language",
    choiceB: "Converts JavaScript to HTML",
    choiceC: "Adds style to HTML pages",
    choiceD: "Scripting files based on 'C'",
    correctAnswer: "c"},
    {
    question: "What is JavaScript?",
    choiceA: "What Starbucks writes on you cup",
    choiceB: "Programming language used on the web",
    choiceC: "Programming language for coffee driinkers",
    choiceD: "All of the above",
    correctAnswer: "b"},
    {
    question: "How do you declare a function in JavaScript?",
    choiceA: "Function()",
    choiceB: "my function()",
    choiceC: "Conjunction function",
    choiceD: "function myFunction()",
    correctAnswer: "d"},  
    {
    question: "What is Bootstrap?",
    choiceA: "A strap made out of old boots",
    choiceB: "A boot made out  of straps",
    choiceC: "A CSS framework for webpages",
    choiceD: "None of the above",
    correctAnswer: "c"},
    {
    question: "What is HTML?",
    choiceA: "Hypertext Markup Language",
    choiceB: "Hot TaMales      for  Lunch",
    choiceC: "Hardware To Make Lamps",
    choiceD: "Hotels That are in MaryLand",
    correctAnswer: "a"},
        
    
    ];
//  Global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

// Cycles through the object of quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// End page screen that displays score after either completeing the quiz or when time is up
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// Submit button - runs the function highscore that saves and stringifies the array of high scores already saved in local stoage as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Clear the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Displays the high scores page and hides other pages 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears local storage and text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Reset all variables and start over
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// Check the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in an Alert that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in an Alert that the answer is wrong.
    }else{
        showScore();
    }
}

// Lets take the Quiz!
startQuizButton.addEventListener("click",startQuiz);