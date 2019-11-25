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

    document.querySelector('.card-list').innerHTML = ""

    //sat nov23 converts A J Q K into number values
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

    console.log(threeCards[2].image)
    //sunday november 24 pops the last card and insert it into the thirdCard
    //gets the highest and lowest card then store them in an array
    const thirdCard = card.pop();
    const highCard = Math.max(card);
    const lowCard = Math.min(card);

    //----------------------------------------------------------


    //----------------------------------------------------------

    //displays card images
    for (let i = 0; i < 3; i++) {

      const cardContainer = document.createElement('div')
      cardContainer.className = "card-container"

      const cardImage = document.createElement('img')
      cardImage.className = "card-image"
      cardImage.src = threeCards[`${i}`].image
      cardContainer.appendChild(cardImage)

      document.querySelector('.card-list').appendChild(cardContainer);
    }

    //resets the button
    document.querySelector('.footer').innerHTML = ""
    //YES or NO button
    const footerButtonY = document.createElement('button')
    footerButtonY.className = 'button-yes'
    footerButtonY.innerHTML = 'YES'
    document.querySelector('.footer').appendChild(footerButtonY)

    const footerButtonN = document.createElement('button')
    footerButtonN.className = 'button-no'
    footerButtonN.innerHTML = 'NO'
    document.querySelector('.footer').appendChild(footerButtonN)

    //checks if third card is in between
    document.querySelector('.button-yes').addEventListener('click', function () {

      document.querySelector('.footer').innerHTML = ""
      if (thirdCard < highCard && thirdcCard > lowCard) {
        console.log('You Win');
      }
      else {
        console.log('You Lose');
      }
      console.log(threeCards)

    })

    document.querySelector('.button-no').addEventListener('click', function () {

      document.querySelector('.footer').innerHTML = ""



    })








  })









  //turns the table to red
  document.querySelector('#redTable').addEventListener('click', function () {
    document.body.style.backgroundColor = "red"
  })

  //turns the table to green
  document.querySelector('#greenTable').addEventListener('click', function () {
    document.body.style.backgroundColor = "green"
  })

}