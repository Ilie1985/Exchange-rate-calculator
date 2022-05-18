//The bellow ia how to fetch API json data with .then method ,I used items.json file to create some json data

// const calculate = () => {
//   fetch("items.json")
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       // return (document.body.innerHTML = data[2].text);
//       console.log(data);
//     });
// };
// calculate();
//=================================================

//Target all the DOM elements that we need to use
const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
//Get the value of the currency-one/currency-two class, option element
const calculate = () => {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data); --> shows data
      //return (document.body.innerHTML = data.date)
      const rate = data.rates[currency_two];
      //console.log(rate);--> shows the rate
      //bellow --> rateEl is the div with the id of rate in HTML
      //innerText is the actual code that we see on the UI
      //currency_one is the selected currency (GBP,EUR,USD etc)
      //rate is the actual rate from the API(data.rates)
      //currency_two is the 2nd selected currency (GBP,EUR,USD etc)
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      //to put the value of the transaction in the amountEl_two which is the input type with the id amount-two in HTML we have to do the bellow
      //to have 2 decimal points we can use .toFixed(2) method ,it comes after the dot (.)
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

//Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  //store currencyEL_one.value(GBP,USD,EUR etc) in a variable called temp
  //currencyEL_one(GBP,USD,EUR etc) is taking in the value of currencyEl_two
  //currencyEl_two is taking in the value of temp(which is basicaly what currencyEl_one was in the begining)
  //invoke calculate function
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
