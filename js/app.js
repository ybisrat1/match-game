/*
 * Create a list that holds all of your cards
 */
let cardarray = [].slice.call(document.querySelectorAll('.card'));
let deck = document.querySelector('.deck');

/*var arrayOfClasses= cardarray.split(' ');
*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardarray) {
    let currentIndex = cardarray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardarray[currentIndex];
        cardarray[currentIndex] = cardarray[randomIndex];
        cardarray[randomIndex] = temporaryValue;
    }

    return deck;
}

shuffle(cardarray);//shuffles the deck everytim the page loads
for (let i= 0; i< cardarray.length; i++){

  cardarray[i].setAttribute('id','card'+[i]);//gives each card an id
  cardarray[i].style.order=[i]; //put the card order based on their id.
  cardarray[i].setAttribute('class', 'card'); //sets card to be face down
  cardarray[i].addEventListener('click',clicktarget);// add listener to cards
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/* creates a variable to support moves counter*/
 let counter= document.querySelector('.moves');
 let counterint= parseInt(counter.innerHTML,10);

/*use to manipulate the DOM stars*/
let scores= document.querySelector('.stars');

/* adds restart function on homepage*/
let restart= document.querySelector('.restart');
let newlink=document.createElement('ahref');
newlink.innerHTML= "<a href =./index.html>restart </a>";
restart.appendChild(newlink);

/*helps manage the star count*/
let stararray = document.querySelector('.stars');

/*create a empty arrary to support the addcardtoList(evt) */
cardlist= [];

/*function to set a card class to open*/
function setopen(evt){
  evt.target.setAttribute('class','card'+' '+'open'+' '+ 'show');
};

/*function to add a card to cardlist and check if they match*/
function addcardtoList(evt){
  cardlist.push(evt.target.firstElementChild)
};

/*function to add a counter every time two cards compared and increments the
moves conunter*/
function addOnetoCounter(){
  counterint++;
  counter.innerHTML=counterint;
  let scores= document.querySelector('.stars')
  if (counterint == 18){

    let firstStar = scores.firstElementChild;
    scores.removeChild(firstStar);
  }
  if (counterint == 28){
    let firstStar = scores.firstElementChild;
    scores.removeChild(firstStar);
  }
};

/*function to remove the click event listener after a card is clicked*/
function removeclickevent(evt){
  evt.target.removeEventListener('click',clicktarget);
};

/*function that checks 2 cards to see if they match when 2 cards are selected
add one to moves and checks to see if the game is completed*/
function checkmatch(){
  for (i=0; i<cardlist.length;i++){
    if(cardlist[0].outerHTML != cardlist[1].outerHTML){
    cardlist[i].parentElement.setAttribute('class','card');
    cardlist[i].parentElement.addEventListener('click',clicktarget);
  }
    else{
    cardlist[i].parentElement.setAttribute('class','card'+' '+'match');
    }
  }
    cardlist= [];
    addOnetoCounter();
    setmatchscreen();
};

/* timer variables and function. clock starts as soon as the page is loaded
once the match is done the timer is left on the current time*/
countup(); // starts the count function when page is loaded
let mins = 0;
let secs = 0;
//count function that is run when page is loaded/
function countup() {
    setTimeout('Increment()', 60);
}

/*if the congrats div exists the secs & mins are locked in place*/
function Increment() {
  if (document.getElementById('congratsmsg')){
      minutes.value= mins;
      seconds.value = secs;
  }

/* if game is running it increments the sec every sec*/
else {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        secs++;
        setTimeout('Increment()', 1000)
}

/*if the sec is greater than 59 it resets to 0 and set the mins+1*/
    if (secs > 59) {
            secs= 0;
            seconds.value= secs;
            mins= mins+1;
            minutes.value= mins;
            }
    else{
  //if less than a minute remaining it will only show secs
        seconds.value = secs;
      }
    }
};

/*event listener function that is added to each card that looks for a click*/
function clicktarget(evt){
  setopen(evt); //sets card to open state
  addcardtoList(evt);// adds card to list to be check for match
  removeclickevent(evt);// removes the click listener

  if (cardlist.length ==2){ //if 2 cards exists it will compare via Checkmatch()

      setTimeout(checkmatch,200); //delay so users can see the 2nd card clicked

      }
  else {

      }
    };

// checks to see if all the cards have been matched


    function setmatchscreen(){
          cardcount= 0; //var to hold all the match cards
          let modal = document.getElementById('modal');
          let span = document.getElementsByClassName("close")[0];
          for(i=0; i<cardarray.length;i++){ //loops through all cards
            if (cardarray[i].outerHTML.includes('card match')){
             cardcount++ //if there is cards has match class increment cardcount
           }
           else{
           }
         }
          if (cardcount >=16){ //if all 16 cards are matched
              // const myfragment = document.createDocumentFragment();

              modal.style.cssText= 'display: block';// makes modal visable
               let newElement= document.createElement('p')// create p element to be attached ot modal with message
               newElement.innerText='Congradulations!!! your score is '+stararray.childElementCount+ ' stars which was done in '+counterint +' moves in ' +mins+' minutes and '+secs+ ' seconds!!!'
            // myfragment.appendChild(newElement);
               newElement.setAttribute('id', 'congratsmsg');// used to set set match condition
               newElement.style.display='block';

               //newElement.style.cssText='position: fixed; z-index: 1; width: 100%; height: 100%; background-color: blue; padding-top: 100px; display: none';
              // myfragment.style.display='block';

              document.getElementById('modal').appendChild(restart);// adds restart buttton to modal
              document.getElementById('modal').appendChild(newElement);// add p element to modal

               //create new element and append it to the body with message and score
            }
            else{
            }
            };
