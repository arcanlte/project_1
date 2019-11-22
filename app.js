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
    console.log(response)
    //initializing the variables for the


  });



}