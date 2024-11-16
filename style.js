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
  const inputs = [
    { element: nameInput, type: "text" },
    { element: marqueInput, type: "text" },
    { element: priceInput, type: "number" },
    { element: datePrdInput, type: "date" },
    { element: typeInput, type: "select" },
    { element: promotionInputYes, type: "radio" },
    { element: promotionInputNo, type: "radio" },
  ];
  inputs.forEach(({ element, type }) => {
    switch (type) {
      case "text":
      case "number":
      case "date":
        element.value = "";
        break;
      case "select":
        element.selectedIndex = 0;
        break;
      case "radio":
        element.checked = false;
        break;
    }
  });
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

/**
 * Hides the delete modal and the overlay, and shows the form section
 * Resets the UI to the default state when the delete modal is closed
 */
const exitModal = () => {
  modal_delete.style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  form_section.style.display = "grid";
};
