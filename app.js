const API_KEY = '3c829b1e515273dfb0f400fdcb4aa308';
var deck = "https://deckofcardsapi.com/api/deck/new/draw/?count=3";



let card = [];
let threeCards = 0;
let thirdCard = 0;
let highCard = 0;
let lowCard = 0;
let currentPlayer = 0;
let player = [
  {
    name: 'PLAYER1',
    coins: parseInt(document.querySelector('.player-score1').innerHTML),
    coinHolder: document.querySelector('.player-score1')
  },
  {
    name: 'PLAYER2',
    coins: parseInt(document.querySelector('.player-score2').innerHTML),
    coinHolder: document.querySelector('.player-score2')
  }
]

window.onload = function () {

  let button = document.querySelector('.start')
  const betValue = document.querySelector('#betAmount')
  const player2Coins = document.querySelector('.player-score')
  const player1Coins = document.querySelector('.player-score')
  let dealerMessage = document.querySelector('.dealer-message')
  let selectFooter = document.querySelector('.footer-container')




  let dealerSay = function (saySomething) {//dealer speaks
    // dealerSay.innerHTML = ""
    dealerMessage.innerHTML = saySomething;
    return
  }

  let nextButton = function () {   //next button
    let nextCard = document.createElement('button')
    nextCard.className = "next-card"
    nextCard.innerHTML = "Next cards"
    selectFooter.appendChild(nextCard)
  }

  let clearButtons = function () {
    while (document.querySelector('.button-bet')) { document.querySelector('.button-bet').remove() }
    while (document.querySelector('.low-high') && document.querySelector('.high-low')) {
      document.querySelector('.low-high').remove()
      document.querySelector('.high-low').remove()
    }
    while (document.querySelector('.next-card')) { document.querySelector('.next-card').remove() }
  }


  let winScenario = function () {                               //Winning Scenario
    //player2Score = parseInt(player2Coins.innerHTML)
    clearButtons()
    player[currentPlayer].coins += parseInt(betValue.value)
    console.log('This is your coins' + player[currentPlayer].coins)
    //player2Score += parseInt(betValue.value)
    currentPlayer === 0 ? player[1].coins -= parseInt(betValue.value) : player[0].coins -= parseInt(betValue.value)

    player[0].coinHolder.innerHTML = player[0].coins
    player[1].coinHolder.innerHTML = player[1].coins
    unfold();
    dealerSay(`Good guess &nbsp <b> ${player[currentPlayer].name}</b> &nbsp take &nbsp <b>${betValue.value}</b> &nbsp coins from your rival!`)
    if (player[0].coinHolder.innerHTML <= 0 || player[1].coinHolder.innerHTML <= 0) { gameOver(); }
    else {
      nextButton();
      document.querySelector('.next-card').addEventListener('click', loadCard)
    }
  }

  let loseScenario = function () {                              //Lose scenario
    //player2Score = parseInt(player2Coins.innerHTML)
    //player1Score = parseInt(player1Coins.innerHTML)
    clearButtons()
    player[currentPlayer].coins = player[currentPlayer].coins - parseInt(betValue.value)
    currentPlayer === 0 ? player[1].coins = player[1].coins + parseInt(betValue.value) : player[0].coins = player[0].coins + parseInt(betValue.value)

    //player2Coins.innerHTML = player2Score
    console.log(`${player[0].coins}  ${player[1].coins}`)
    player[0].coinHolder.innerHTML = player[0].coins
    player[1].coinHolder.innerHTML = player[1].coins
    unfold();
    dealerSay(`Oops! &nbsp <b>${player[currentPlayer].name}</b> &nbsp loses &nbsp <b> ${betValue.value}</b> &nbsp coins!`)
    if (player[0].coinHolder.innerHTML <= 0 || player[1].coinHolder.innerHTML <= 0) { gameOver(); }
    else {
      nextButton();
      document.querySelector('.next-card').addEventListener('click', loadCard)
    }
  }


  const buttonYes = function () {          //button yes function
    selectFooter.innerHTML = ""

    console.log(currentPlayer)
    console.log('this is the folded card ' + thirdCard)
    if (betValue.value) {
      if (currentPlayer === 0) {
        if (thirdCard < highCard && thirdCard > lowCard) {
          winScenario();
          currentPlayer = 1;
        }
        else {
          loseScenario();
          currentPlayer = 1;
        }
      }
      else {
        if (thirdCard < highCard && thirdCard > lowCard) {
          winScenario();
          currentPlayer = 0;
        }
        else {
          loseScenario();
          currentPlayer = 0;
        }
      }
    } else {
      dealerSay("INPUT A NUMBER!!!")
      document.querySelector('.button-bet').addEventListener('click', buttonYes)
    }

  }


  let newGame = function () {
    for (let i = 0; i < 2; i++) {
      player[i].coins = 100
      player[i].coinHolder.innerHTML = 100
    }


    document.querySelector('.start').style = "visibility: none"
    document.querySelector('.coin').style = "display: visible"


    console.log('hello')
    document.querySelector('.card-list').innerHTML = ""
    selectFooter.innerHTML = ""

    document.querySelector('.hidden').style = "display: none"
    dealerSay("Press the &nbsp <h3>START</h3> &nbspbutton")

  }


  let gameOver = function () {//checks if the game is over
    selectFooter.innerHTML = ""
    clearButtons()
    console.log('heyhey')
    player[0].coinHolder.innerHTML <= 0 ? dealerSay(`<h1>${player[1].name} WINS</h1>`) : dealerSay(`<h1>${player[0].name} WINS!</h1>`)
    endingButtons()
  }

  //game stops

  let endingButtons = function () {//ending game buttons
    console.log('YOU WIN!!!')
    clearButtons()
    let playAgain = document.createElement('button')
    playAgain.className = "play-again"
    playAgain.innerHTML = "Main Menu"
    selectFooter.appendChild(playAgain)
    document.querySelector('.play-again').addEventListener('click', newGame)
  }


  let checkHL = function (currentPlayer) {                                                           //check if high or low
    if (betValue.value) {
      if (currentPlayer === 0) {
        if (event.target.innerHTML === 'High') {
          console.log(`first card is &nbsp <b>${highCard}</b> &nbsp second is &nbsp <b>${lowCard}</b> &nbsp third card is &nbsp <b>${thirdCard}</b>`)
          if (highCard < thirdCard) {
            winScenario()
            dealerSay(`${player[1].name} you are next`)
            currentPlayer = 1;
          }
          else if (highCard > thirdCard) {
            loseScenario();
            dealerSay(`${player[1].name} you are next`)
            currentPlayer = 1;
          }
        }

        else if (event.target.innerHTML === 'Low') {
          if (highCard > thirdCard) {
            winScenario()
            dealerSay(`${player[1].name} you are next`)
            currentPlayer = 1;
          }
          else {
            loseScenario();
            dealerSay(`${player[1].name} you are next`)
            currentPlayer = 1;
          }
        }
      }
      else {
        if (event.target.innerHTML === 'High') {
          console.log(`first card is <b>${highCard}</b> second is <b>${lowCard}</b> third card is <b>${thirdCard}</b>`)
          if (highCard < thirdCard) {
            winScenario()
            dealerSay(`${player[0].name} you are next`)
            currentPlayer = 0;
          }
          else if (highCard > thirdCard) {
            loseScenario();
            currentPlayer = 0;
          }
        }

        else if (event.target.innerHTML === 'Low') {
          if (highCard > thirdCard) {
            winScenario()
            currentPlayer = 0;
          }
          else {
            loseScenario();
            currentPlayer = 0;
          }
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

    dealerSay(`You draw same card &nbsp <b>${player[currentPlayer].name}</b>, &nbspnow you have to guess whether the third card is Higher than &nbsp <b>${highCard}</b> &nbsp or Lower`)
    let highButton = document.createElement('button')
    highButton.className = 'high-low'
    highButton.innerHTML = 'High'
    document.querySelector('.bottom-body').appendChild(highButton)
    document.querySelector('.high-low').addEventListener('click', checkHL)


    let lowButton = document.createElement('button')
    lowButton.className = 'low-high'
    lowButton.innerHTML = 'Low'
    document.querySelector('.bottom-body').appendChild(lowButton)
    document.querySelector('.low-high').addEventListener('click', checkHL)
  }

  dealerSay("Press the &nbsp <h3>START</h3> &nbspbutton")
  button.addEventListener('click', loadCard)


  let unfold = function () {//unfolds the card

    while (document.querySelector('.button-bet')) {
      document.querySelector('.button-bet').remove()
    }
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

    console.log('hey')
    // 
    const footerButtonY = document.createElement('button')
    footerButtonY.className = 'button-bet'
    footerButtonY.innerHTML = 'BET'
    document.querySelector('.bottom-body').appendChild(footerButtonY)
  }



  async function loadCard() {//loads the cards and resets the game
    //stops the page from reloading
    event.preventDefault();

    const response = await axios.get(`${deck}`)

    clearButtons()
    console.log(response)
    document.querySelector('.card-list').innerHTML = ""
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

    console.log(player[0].coins)

    if (highCard === lowCard) {
      highLowButton();
    }                                        //checks if two cards are equal

    else {
      buttonYN();
      dealerSay(`<b>${player[currentPlayer].name}</b> &nbsp is 3rd card in between &nbsp <b>${threeCards[0].value}</b>  &nbsp and &nbsp  <b>${threeCards[1].value}</b>? Place your bet`);
      document.querySelector('.button-bet').addEventListener('click', buttonYes)

      //checks if third card is in between
    }
    button.addEventListener('click', loadCard)
  }

}