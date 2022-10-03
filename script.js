const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

const next = document.getElementById("next");
const counter = document.getElementById('counter');
const allRightAnswer = document.getElementById('all-right-answers');
const verbsContainer = document.getElementById('verbs-container');

const first = document.getElementById('first-verb');
const second = document.getElementById('second-verb');
const third = document.getElementById('third-verb');
const fourth = document.getElementById('fourth-verb');


let answerRoullete = [0,1,1,1];
let everyNumbersOfVerbs = [];
let rightAnswer;
let allRightAnswers;

next.addEventListener('click', function(){
    ponerVerbo();
    next.style.display = 'none'
});

function ponerVerbo() {
    showVerb.innerHTML = "Deposita 200 bitcoins para jugar"
}

