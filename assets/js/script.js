
function setTheme(theme) {
    document.documentElement.style.setProperty('--primary-color', theme);
    localStorage.setItem('cc-theme', theme);
}

setTheme(localStorage.getItem('cc-theme') || '#1A4B84');


// -------------------- DOM Elements ---------------
const currrencyOne = document.getElementById("currency-one");
const currrencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");

const rate = document.getElementById("rate");
const swap = document.getElementById("swap");


// ---------------------- API Config -------------
function calculate(){
    fetch(`https://api.exchangerate-api.com/v4/latest/${currrencyOne.value}`)
    .then(resp => resp.json())
    .then(data => {
        amountTwo.value = (amountOne.value * data.rates[currrencyTwo.value]).toFixed(2);
        rate.innerHTML = amountOne.value + currrencyOne.value + " = " + amountTwo.value + currrencyTwo.value;
    })
}

// ---------------- Event Listeners ------------

currrencyOne.addEventListener('input', calculate);
currrencyTwo.addEventListener('input', calculate);
amountOne.addEventListener('change', calculate);
amountTwo.addEventListener('change', calculate);
swap.addEventListener('click', () => {
    let temp = currrencyOne.value;
    currrencyOne.value = currrencyTwo.value;
    currrencyTwo.value = temp;
    calculate();
});

calculate();