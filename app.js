const API_KEY = '3c829b1e515273dfb0f400fdcb4aa308';
var deck = "https://deckofcardsapi.com/api/deck/new/draw/?count=3";



let card = [];
let threeCards = 0;
let thirdCard = 0;
let highCard = 0;
let lowCard = 0;


window.onload = function () {

  let button = document.querySelector('.start')
  const betValue = document.querySelector('#betAmount')
  const playerCoins = document.querySelector('.player-score')
  const dealerCoins = document.querySelector('.dealer-score')
  let dealerMessage = document.querySelector('.dealer-message')
  let selectFooter = document.querySelector('.footer-container')



  let dealerSay = function (saySomething) {//dealer speaks
    // dealerSay.innerHTML = ""
    dealerMessage.innerHTML = `<h3>${saySomething}</h3>`;
    return
  }



  const buttonYes = function () {                                 //button yes function
    selectFooter.innerHTML = ""
    console.log('this is the folded card ' + thirdCard)
    if (betValue.value) {
      if (thirdCard < highCard && thirdCard > lowCard) {
        let playerScore = parseInt(playerCoins.innerHTML)
        let dealerScore = parseInt(dealerCoins.innerHTML)
        playerScore += parseInt(betValue.value)
        dealerScore -= betValue.value

        playerCoins.innerHTML = playerScore
        dealerCoins.innerHTML = dealerScore
        unfold();
        dealerSay(`Good guess.. You got my ${betValue.value} coins!`)
        if (playerScore >= 200) { gameOver(); }
        let nextCard = document.createElement('button')
        nextCard.className = "next-card"
        nextCard.innerHTML = "Next cards"
        selectFooter.appendChild(nextCard)

        document.querySelector('.next-card').addEventListener('click', loadCard)
      }
      else {
        let playerScore = parseInt(playerCoins.innerHTML)
        let dealerScore = parseInt(dealerCoins.innerHTML)
        playerScore -= parseInt(betValue.value)
        dealerScore += parseInt(betValue.value)

        playerCoins.innerHTML = playerScore
        dealerCoins.innerHTML = dealerScore
        unfold();
        dealerSay(`Well well.. let me get that ${betValue.value} coins!`)
        if (dealerScore >= 200) { gameOver(); }
        let nextCard = document.createElement('button')
        nextCard.className = "next-card"
        nextCard.innerHTML = "Next cards"
        selectFooter.appendChild(nextCard)

        document.querySelector('.next-card').addEventListener('click', loadCard)
      }
      console.log(threeCards)
    } else {
      dealerSay("INPUT A NUMBER!!!")
      buttonYN();
      document.querySelector('.button-yes').addEventListener('click', buttonYes)
      document.querySelector('.button-no').addEventListener('click', loadCard)
    }

  }


  let newGame = function () {
    playerCoins.innerHTML = 100
    dealerCoins.innerHTML = 100

    document.querySelector('.start').style = "visibility: none"
    document.querySelector('.coin').style = "display: visible"


    console.log('hello')
    document.querySelector('.card-list').innerHTML = ""
    selectFooter.innerHTML = ""

    document.querySelector('.hidden').style = "display: none"
    dealerSay('<h2>Let us play!</h2>')

  }


  let gameOver = function () {//checks if the game is over
    if (parseInt(dealerCoins.innerHTML) <= 0) {
      dealerSay("<h1>YOU WIN</h1>")
      endingButtons()
    }
    else if (parseInt(playerCoins.innerHTML) <= 0) {
      selectFooter.innerHTML = ""
      console.log('YOU LOSE')
      dealerSay("<h1>YOU LOSE</h1>")
      endingButtons()
    }
  }

  //game stops

  let endingButtons = function () {//ending game buttons
    console.log('YOU WIN!!!')

    let playAgain = document.createElement('button')
    playAgain.className = "play-again"
    playAgain.innerHTML = "Main Menu"
    selectFooter.appendChild(playAgain)
    document.querySelector('.play-again').addEventListener('click', newGame)

    document.querySelector('.next-card').innerHTML = ""
  }


  let checkHL = function () {                                                           //check if high or low
    if (betValue.value) {
      if (event.target.innerHTML === 'High') {
        console.log(`first card is ${highCard} second is ${lowCard} third card is ${thirdCard}`)
        if (highCard < thirdCard) {
          let playerScore = parseInt(playerCoins.innerHTML)
          let dealerScore = parseInt(dealerCoins.innerHTML)
          playerScore += parseInt(betValue.value)
          dealerScore -= betValue.value

          playerCoins.innerHTML = playerScore
          dealerCoins.innerHTML = dealerScore
          unfold();
          dealerSay(`Good guess.. You got my ${betValue.value} coins!`)
          if (playerScore >= 200) { gameOver(); }
          let nextCard = document.createElement('button')
          nextCard.className = "next-card"
          nextCard.innerHTML = "Next cards"
          selectFooter.appendChild(nextCard)

          document.querySelector('.next-card').addEventListener('click', loadCard)
        }
        else if (highCard > thirdCard) {
          let playerScore = parseInt(playerCoins.innerHTML)
          let dealerScore = parseInt(dealerCoins.innerHTML)
          playerScore -= parseInt(betValue.value)
          dealerScore += parseInt(betValue.value)

          playerCoins.innerHTML = playerScore
          dealerCoins.innerHTML = dealerScore
          unfold();
          dealerSay(`Well well.. let me get that ${betValue.value} coins!`)
          if (dealerScore >= 200) { gameOver(); }
          let nextCard = document.createElement('button')
          nextCard.className = "next-card"
          nextCard.innerHTML = "Next cards"
          selectFooter.appendChild(nextCard)

          document.querySelector('.next-card').addEventListener('click', loadCard)
        }
      }

      else if (event.target.innerHTML === 'Low') {
        if (highCard > thirdCard) {
          console.log('You chose low')
          let playerScore = parseInt(playerCoins.innerHTML)
          let dealerScore = parseInt(dealerCoins.innerHTML)
          playerScore += parseInt(betValue.value)
          dealerScore -= betValue.value

          playerCoins.innerHTML = playerScore
          dealerCoins.innerHTML = dealerScore
          unfold();
          dealerSay(`Good guess.. You got my ${betValue.value} coins!`)
          if (playerScore >= 200) { gameOver(); }
          let nextCard = document.createElement('button')
          nextCard.className = "next-card"
          nextCard.innerHTML = "Next cards"
          selectFooter.appendChild(nextCard)

          document.querySelector('.next-card').addEventListener('click', loadCard)
        }
        else {
          let playerScore = parseInt(playerCoins.innerHTML)
          let dealerScore = parseInt(dealerCoins.innerHTML)
          playerScore -= parseInt(betValue.value)
          dealerScore += parseInt(betValue.value)

          playerCoins.innerHTML = playerScore
          dealerCoins.innerHTML = dealerScore
          unfold();
          dealerSay(`Well well.. let me get that ${betValue.value} coins!`)
          if (dealerScore >= 200) { gameOver(); }
          let nextCard = document.createElement('button')
          nextCard.className = "next-card"
          nextCard.innerHTML = "Next cards"
          selectFooter.appendChild(nextCard)

          document.querySelector('.next-card').addEventListener('click', loadCard)
        }
      }
    }
    else {
      console.log('INPUT A BUTTON!')
      highLowButton();
    }
  }




  let highLowButton = function () {

    selectFooter.innerHTML = ""

    dealerSay(`You draw same card, now you have to guess whether the third card is Higher than ${highCard} or Lower`)
    let highButton = document.createElement('button')
    highButton.className = 'high-low'
    highButton.innerHTML = 'High'
    selectFooter.appendChild(highButton)
    document.querySelector('.high-low').addEventListener('click', checkHL)

    let lowButton = document.createElement('button')
    lowButton.className = 'low-high'
    lowButton.innerHTML = 'Low'
    selectFooter.appendChild(lowButton)
    document.querySelector('.low-high').addEventListener('click', checkHL)
  }

  dealerSay("<h3>Hey let us play!!!</h3>")
  button.addEventListener('click', loadCard)


  let unfold = function () {//unfolds the card

    let foldedCard = document.getElementById('folded-card')
    foldedCard.remove();

    let cardContainer = document.createElement('div')
    cardContainer.className = 'card-container'

    const cardImage = document.createElement('img')
    cardImage.className = "card-image"
    cardImage.src = threeCards[2].image
    cardContainer.appendChild(cardImage)

    document.querySelector('.card-list').appendChild(cardContainer);
    return
  }


  let buttonYN = function () {     //create YES or NO button
    selectFooter.innerHTML = ""
    // 
    const footerButtonY = document.createElement('button')
    footerButtonY.className = 'button-yes'
    footerButtonY.innerHTML = 'YES'
    selectFooter.appendChild(footerButtonY)

    const footerButtonN = document.createElement('button')
    footerButtonN.className = 'button-no'
    footerButtonN.innerHTML = 'NO'
    selectFooter.appendChild(footerButtonN)
  }



  async function loadCard() {//loads the cards and resets the game
    //stops the page from reloading
    event.preventDefault();

    const response = await axios.get(`${deck}`)


    console.log(response)

    document.querySelector('.card-list').innerHTML = ""
    selectFooter.innerHTML = ""
    dealerMessage.innerHTML = ""
    document.querySelector('.coin').style.display = 'none'
    button.style.visibility = "hidden";

    //sat nov23 converts A J Q K into number values
    card = [];

    threeCards = response.data.cards;

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
    console.log(card)


    //sunday november 24 pops the last card and insert it into the thirdCard
    //gets the highest and lowest card then store them in an array
    thirdCard = card.pop();
    highCard = Math.max(card[0], card[1]);
    lowCard = Math.min(card[0], card[1])


    //displays card images
    for (let i = 0; i < 2; i++) {

      const cardContainer = document.createElement('div')
      cardContainer.className = "card-container"

      const cardImage = document.createElement('img')
      cardImage.className = "card-image"
      cardImage.src = threeCards[`${i}`].image
      cardContainer.appendChild(cardImage)

      document.querySelector('.card-list').appendChild(cardContainer);
    }
    //creates the third folded card
    let cardContainer = document.createElement('div')
    cardContainer.className = 'card-container'

    const cardImage = document.createElement('img')
    cardImage.className = "card-image"
    cardImage.src = "image/backCard.jpg"
    cardImage.setAttribute('id', 'folded-card')
    cardContainer.appendChild(cardImage)

    document.querySelector('.card-list').appendChild(cardContainer);


    betValue.style.display = 'block'



    if (highCard === lowCard) {
      highLowButton();
    }                                        //checks if two cards are equal

    else {
      buttonYN();
      dealerSay(`So do you think the third card is in between ${threeCards[0].value} and ${threeCards[1].value}?`);
      document.querySelector('.button-yes').addEventListener('click', buttonYes)
      document.querySelector('.button-no').addEventListener('click', loadCard)

      //checks if third card is in between
    }



    button.addEventListener('click', loadCard)



  }

}