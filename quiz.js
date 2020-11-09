// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "É possível transmitir coronavírus com um aperto de mão?",
        imgSrc : "img/covid_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "A"
    },{
        question : "O coronavírus mata mais do que a varíola?",
        imgSrc : "img/variola_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Cães e gatos podem infectar os donos?",
        imgSrc : "img/cats_dogs_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Doses altas de vitamina C matam o coronavírus?",
        imgSrc : "img/orange_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Diabéticos são mais vulneráveis à Covid-19?",
        imgSrc : "img/diabetes_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "A"
    },{
        question : "O coronavírus causa pneumonia instantânea?",
        imgSrc : "img/pneumonia_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "O vírus consegue sobreviver por dois meses no ambiente?",
        imgSrc : "img/ambiente_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Somente infectados devem usar máscaras?",
        imgSrc : "img/face_mask_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Posso compartilhar objetos com outras pessoas pois o coronavírus só é transmitido pelo ar?",
        imgSrc : "img/objects_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    },{
        question : "Ao espirrar é preciso cobrir a boca e o nariz com as mãos?",
        imgSrc : "img/sneeaze_img.jpg",
        choiceA : "VERDADEIRO",
        choiceB : "FALSO",
        choiceC : "N/A",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 30s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 100) ? window.location.href = "home.html" :
              (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















