const API_KEY = '3c829b1e515273dfb0f400fdcb4aa308';
var weatherUrl = "https://deckofcardsapi.com/api/deck/new/draw/?count=3";


const button = document.querySelector('#getTemp')
const searchedCity = document.querySelector('#city')


window.onload = function () {

  button.addEventListener('click', async (evt) => {
    //stops the page from reloading
    this.event.preventDefault();

    const city = searchedCity.value;
    const response = await axios.get(`${weatherUrl}`)
    console.log(response.data.cards)

    const firstCard = response.data.cards[0].code
    const secondCard = response.data.cards[1].code
    const thirdCard = response.data.cards[2].code

    document.querySelector(".card1").innerHTML = firstCard
    document.querySelector('.card2').innerHTML = secondCard
    document.querySelector('.card3').innerHTML = thirdCard
    //initializing the variables for the


  });



}