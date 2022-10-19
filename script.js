const test = document.getElementById('pruebas');

// Elementos para los verbos presentados actuales
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

// Elementos auxiliares
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const timerCounter = document.getElementById("timer-counter");
const allRightCounter = document.getElementById("all-right-answers");
const allWrongCounter = document.getElementById("all-wrong-answers");
const verbsContainer = document.getElementById("verbs-container");
// Botones para Opciones de respuestas
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");
const repit=document.getElementById("repit-audio");
const repitext=document.getElementById("repit-audiotext");

// Cantidad de verbos disponibles
const numberOfVerbs = verbs.length;
// Respuesta correcta y 3 incorrectas
let answerRoullete = [0,1,1,1];

let everyNumberOfVerbs = [];

let rightAnswer; // respuesta correctas 
let rightAnswersCounter = 0; // contador de respuestas correctas 

let wrongAnswersCounter = 0; // contador de respuestas correctas 

//timer 
let time=15;


// Contador de inicio del juego 
next.addEventListener("click",function(){
  ponerVerbo();
  next.style.display = 'none';
});

//Lista de ramdom 
makeRandomList();
//comienzo para la ultima posicion 
let lastPosition = everyNumberOfVerbs.length-1;


//Ramdorizacion de la lista 
function makeRandomList(){
 //acomodando ambas listas al mismo index
  for (var i = 0; i < numberOfVerbs; i++){
    everyNumberOfVerbs.push(i);
  }
  
  everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}


// Listeners para los botones
first.addEventListener("click",function(){
  buttonEffect(isItRight_(first.innerHTML),this);
});


second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});


third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});


fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});

repit.addEventListener("click", function(){
  showAudio.play();
});
//Terminan listener para botones


//Array de verbos para acomodar la aparicion de manera ramdom 
function shuffleAnswers(array) {

  let numberOfAnswerButtons = array.length;

  let randomIndex;

  
  while (numberOfAnswerButtons != 0) {

    
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    
    [array[numberOfAnswerButtons], array[randomIndex]] = [
    array[randomIndex], array[numberOfAnswerButtons]];
  }

  return array;
}

//Verificacion de respuesta correcta o incorrecta 

function buttonEffect(itsRight,button){
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);
    rightAnswersCounter = rightAnswersCounter+1;
    clearInterval(intervalo);
  }else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
     wrongAnswersCounter+=1;
    clearInterval(intervalo);
  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}

//Validacion de cual es la respuesta correcta 
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);

  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

//actualizar verbo mostrado con opciones de los botones 
function ponerVerbo(){

  
  answerRoullete = shuffleAnswers(answerRoullete);

  let randomPosition = everyNumberOfVerbs[lastPosition];
  let imgText = "<img src='img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

  //asignacion de clases 
  first.classList.add("btn","btn-outline-primary","btn-md");
  second.classList.add("btn","btn-outline-primary","btn-md");
  third.classList.add("btn","btn-outline-primary","btn-md");
  fourth.classList.add("btn","btn-outline-primary","btn-md");
  repit.classList.add("btn","btn-outline-primary","btn-md");
  repit.classList.add("repitimg");

  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
  
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    allWrongCounter.innerHTML = "Wrong answers: "+wrongAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    repitext.innerHTML="you want to repeat the audio";


    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    allWrongCounter.innerHTML = "Wrong answers: "+wrongAnswersCounter;
    showVerb.innerHTML = "Thank you !";

    
    verbsContainer.innerHTML = "";
  }
  if(just_position>=0){
  timer();}
}
//funcion asincrona para el tiempo de respuesta 
async function timer(){
  time=15;
intervalo=setInterval(()=>{

  if(time<=0){
    clearInterval(intervalo);//se detiene el intervalo para reiniciar el contador 
    timerCounter.innerHTML=0;
    //if para verificar si la opcion es la correcta y realiza el click si se acabo el tiempo 
    if(rightAnswer==first.innerHTML){
      rightAnswersCounter-=1;
      first.click()//se automatiza el click con la respuesta correcta  y se quita el punto extra de la respuesta
    }
    if(rightAnswer==second.innerHTML){
      rightAnswersCounter-=1;
      second.click()
    }
    if(rightAnswer==third.innerHTML){
      rightAnswersCounter-=1;
      third.click()
    }
    if(rightAnswer==fourth.innerHTML){
      rightAnswersCounter-=1;
      fourth.click()
    }
    
  }
  //cambia el valor del contador 
timerCounter.innerHTML=time;
time-=1;
},"1000");
}