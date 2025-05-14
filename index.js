//https://opentdb.com/api.php?amount=20

let numQuestions = 2;
let questions = [];
let questionIndex = 0;
let answers = [];
let score;
let correctAnswer;


const answerBtn = document.getElementById('answer-buttons');
const nxtBtn = document.getElementById('next-btn');
const question = document.getElementById('question');




const quizApi = async ()=>{
    try {
        const fetchApi = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}`);
        const dataApi = await fetchApi.json();
        console.log(dataApi);

        questions = dataApi.results;
        hideLoading();
        startQuiz();
        
        
    } catch (error) {
        console.log(`${error}`);
        question.innerHTML = "Failed to load quiz. Please try again.";
        hideLoading();
    }
}


function startQuiz(){
    questionIndex = 0;
    score = 0;

    
    resetQuiz();
    showQuestion();
    
}

function resetQuiz() {
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function showQuestion() {

    let api_info =questions[questionIndex];
    let currentQuestion = api_info .question;
    answers = [...api_info.incorrect_answers];
     correctAnswer = api_info.correct_answer;

     answers.push(correctAnswer);
     

    
     console.log(answers);

     shuffleArray(answers);
     let questionNo = questionIndex + 1;
    question.innerHTML = `${questionNo} .${currentQuestion}`;

    answers.forEach(answer =>{
       const newBtn = document.createElement('button');
       newBtn.classList.add('btn');
       newBtn.innerHTML = answer;
       answerBtn.appendChild(newBtn);


       newBtn.addEventListener('click',selectAnswer);
       
       
    })

    
       

    

    
}


    
function showScore() {
    
    resetQuiz();
    question.innerHTML = `You scored ${score} out of ${numQuestions}`;
    nxtBtn.innerHTML = "Play Again";
    nxtBtn.style.display = "block";

    
    
}



function selectAnswer(e) {

    let allButtons = document.querySelectorAll('.btn');
    let selectBtn = e.target;

    allButtons.forEach((btn)=>{
        btn.disabled = true;

    })

    if (selectBtn.innerHTML == correctAnswer) {

            selectBtn.classList.add('correct');
            score++;
            console.log(score);

            }else{
                  selectBtn.classList.add('incorrect');

                  allButtons.forEach(btn =>{
                    if(btn.innerHTML == correctAnswer){
                        btn.classList.add('correct');
                    }
                  })
                     
                  

                    
                }
                
                
                
                

    nxtBtn.style.display = 'block';

        

}



            

nxtBtn.addEventListener('click',()=>{
    
    if (nxtBtn.innerHTML == "Play Again") {
        score = 0;
        questionIndex = 0;
        nxtBtn.innerHTML = "Next";
        nxtBtn.style.display = "none";
        showLoading();
        quizApi();
    } else {
        questionIndex++;
        if(questionIndex < questions.length){
        resetQuiz();
        showQuestion();
       }else{
        showScore();
    
        }
    }
    
    })




//Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  
    }
}8


function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    question.innerHTML = ''; // Clear old content
    nxtBtn.style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}


quizApi();





