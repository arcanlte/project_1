/*

GOAL this weekend
-finish all the functionalities of the game (make the game work!!!)

Updates
-November 23 Saturday 12:20pm I am able to convert A, J, Q, K into numbers 1, 11, 12, 13 

What is next?
-Next phase --> Check if card[2] is in between card[0] and card[1] (boolean True or False)
*/

const API_KEY = '3c829b1e515273dfb0f400fdcb4aa308';
var deck = "https://deckofcardsapi.com/api/deck/new/draw/?count=3";


const button = document.querySelector('#button')


window.onload = function () {

  button.addEventListener('click', async (evt) => {
    //stops the page from reloading
    this.event.preventDefault();

    const response = await axios.get(`${deck}`)

    //sat nov23
    let card = [];

    const threeCards = response.data.cards;

    for (let i = 0; i < threeCards.length; i++) {
      switch (threeCards[i].value) {
        case 'JACK':
          card.push('11');
          break;
        case 'QUEEN':
          card.push('12');
          break;
        case 'KING':
          card.push('13');
          break;
        case 'ACE':
          card.push('1');
          break;
        default:
          card.push(threeCards[i].value);
      }

    }

    console.log(`${card[1]} ${card[0]} ${card[2]}`)

    document.querySelector(`.card1`).innerHTML = `${card[0]}`
    document.querySelector('.card2').innerHTML = `${card[1]}`
    document.querySelector('.card3').innerHTML = `${card[2]}`




  })
  //turns the table to red
  document.querySelector('#redTable').addEventListener('click', function () {
    document.body.style.backgroundColor = "red"
  })

  //turns the table to green
  document.querySelector('#greenTable').addEventListener('click', function () {
    document.body.style.backgroundColor = "green"
  })

  //sat nov 23 converts A J Q K into a number
  const convertIntoNumber = function (rankCard) {
    switch (rankCard) {
      case J:

    }
  }






}