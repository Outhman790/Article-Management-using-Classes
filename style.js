"use strict";
/**
 * Displays an error message and applies error styling to an input field's parent div
 * @param {HTMLElement} input - The input element to show error for
 * @param {string} message - The error message to display
 */
const printError = (input, message) => {
  const inputName = input.name;
  const inputDiv = input.closest(`#${inputName}_div`);
  const small = inputDiv.querySelector("small");
  inputDiv.className = `${inputName}_div error`;
  small.innerText = message;
};
/**
 * Updates the styling of an input field's parent div element and removes validation messages
 * @param {HTMLElement} input - The input element to process
 */
const printSuccess = (input) => {
  const inputName = input.name;
  const inputDiv = input.closest(`#${inputName}_div`);
  const small = inputDiv.querySelector("small");
  inputDiv.className = `${inputName}_div`;
  small.innerText = "";
};

/**
 * Resets all form input fields to their default empty state.
 * Clears text inputs and unchecks radio buttons.
 */
const clearInputs = () => {
  nameInput.value = "";
  marqueInput.value = "";
  priceInput.value = "";
  typeInput.value = "";
  datePrdInput.value = "";
  promotionInputNo.checked = false;
  promotionInputYes.checked = false;
};

/**
 * Clears validation messages and feedback elements in the UI
 * @param {NodeListOf<Element>|Array<Element>} divs - Array of DOM elements containing validation messages
 */
const clearChecking = (divs) => {
  divs.forEach((div) => {
    const smallElement = div.querySelector("small");
    smallElement.style.visibility = "hidden";
  });

  if (feedbackMsg) {
    feedbackMsg.innerHTML = "";
    feedbackMsg.style.display = "none";
  }
};
const exitModal = () => {
  modal_delete.style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  form_section.style.display = "grid";
};
