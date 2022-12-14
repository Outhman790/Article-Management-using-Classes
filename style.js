"use strict";
// show error
const printError = (input, message) => {
  const inputName = input.name;
  const inputDiv = input.closest(`#${inputName}_div`);
  const small = inputDiv.querySelector("small");
  // small.style.visibility = "visible";
  // small.style.color = "red";
  inputDiv.className = `${inputName}_div error`;
  small.innerText = message;
};
// no error
const printSuccess = (input) => {
  const inputName = input.name;
  const inputDiv = input.closest(`#${inputName}_div`);
  const small = inputDiv.querySelector("small");
  // small.style.visibility = "hidden";
  inputDiv.className = `${inputName}_div`;
};

// clear all inputs
const clearInputs = () => {
  nameInput.value = "";
  marqueInput.value = "";
  priceInput.value = "";
  typeInput.value = "";
  datePrdInput.value = "";
  promotionInputNo.checked = false;
  promotionInputYes.checked = false;
};
