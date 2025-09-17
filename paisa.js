let entermoney=document.querySelector("#money");

let from=document.querySelector(".from");

let to=document.querySelector(".to");


let result=document.querySelector(".result");
let convert=document.querySelector(".convert");


let select=document.querySelectorAll("select");

const countryCurrency = {
  "IN": "INR",
  "US": "USD",
  "AU": "AUD",
  "CA": "CAD",
  "GB": "GBP",
  "EU": "EUR",
  "JP": "JPY",
  "CN": "CNY",
  "AE": "AED",
  "BD": "BDT",
  "PK": "PKR",
  "NP": "NPR",
  "LK": "LKR",
  "KR": "KRW",
  "RU": "RUB",
  "BR": "BRL",
  "MX": "MXN",
  "ZA": "ZAR",
  "SG": "SGD",
  "MY": "MYR",
  "ID": "IDR",
  "TH": "THB",
  "VN": "VND",
  "TR": "TRY",
  "PH": "PHP",
  "CH": "CHF",
  "SE": "SEK",
  "NO": "NOK",
  "DK": "DKK",
  "NZ": "NZD",
  "SA": "SAR",
  "KW": "KWD",
  "QA": "QAR"
}

let fromflag=document.querySelector(".fromflag");
let toflag=document.querySelector(".toflag");



 for(let country in countryCurrency){
        let newoption=document.createElement("option");
        newoption.innerText=country;
        newoption.value=country;
        
        select.forEach((dropdown) => {
        dropdown.append(newoption.cloneNode(true)); // use cloneNode to avoid DOM reuse
    });
 }
 //set initially values 
from.value = "IN";
to.value = "US";

fromflag.src = `https://flagsapi.com/${from.value}/flat/64.png`;
toflag.src = `https://flagsapi.com/${to.value}/flat/64.png`;

from.addEventListener("change", () => {
    fromflag.src = `https://flagsapi.com/${from.value}/flat/64.png`;
});

to.addEventListener("change", () => {
    toflag.src = `https://flagsapi.com/${to.value}/flat/64.png`;
});


convert.addEventListener("click",()=>{
    let fromCurr = countryCurrency[from.value];  // e.g., INR
    let toCurr = countryCurrency[to.value];      // e.g., USD
    let amt = parseFloat(entermoney.value);
    let rate=document.querySelector(".rate");
    
if (isNaN(amt) || amt <= 0) {
    result.innerText = "Enter a valid amount.";
    return;
}
if(fromCurr==toCurr){
    result.innerText='please select different "TO" country';
    return;
}
// Check if fromCurr and toCurr are supported by Frankfurter
const supportedCurrencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD", "BRL", "MYR", "THB", "RUB", "ZAR", "SEK", "NOK", "DKK", "NZD", "TRY", "HKD", "MXN", "PLN", "IDR", "CZK", "HUF", "ILS", "PHP", "KRW"]; // Update this list as needed

if (!supportedCurrencies.includes(fromCurr) || !supportedCurrencies.includes(toCurr)) {
  result.innerText = `Currency ${fromCurr} or ${toCurr} is not supported.`;
  return;
}


   let baseurl = `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurr}&to=${toCurr}`;
    fetch(baseurl)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log(data);
    let convertedRate = data.rates[toCurr];
    result.innerText=`${amt} ${fromCurr} = ${convertedRate.toFixed(4)} ${toCurr}`;
    rate.innerText=`1 ${fromCurr}=${(convertedRate/amt).toFixed(4)} ${toCurr}`;
  })
  .catch(err => {
            console.error("Error fetching rates:", err);
            result.innerText = "Failed to fetch exchange rate.";
})
});
