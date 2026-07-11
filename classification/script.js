let ilPrimo = document.querySelector("#characterTier>div:first-child")
let widthIlPrimo = ilPrimo.getBoundingClientRect().width
ilPrimo.style.height = (widthIlPrimo*(9/21)) + "px";
let ilSecondo = document.querySelector("#characterTier>div:nth-child(2)")
let widthIlSecondo = ilSecondo.getBoundingClientRect().width