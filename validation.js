"use strict";
const typeDiv = document.querySelector("#type_div");
/**
 * Validates a name input field.
 * @param {HTMLInputElement} name - The name input field to validate.
 * @returns {boolean} True if the name is valid, false otherwise.
 */
const checkName = (name) => {
  if (name.value.trim() === "") {
    printError(name, "Please enter a name");
    return false;
  } else if (validate(name, nameRegex)) {
    printSuccess(name);
    return true;
  } else if (!validate(name, nameRegex)) {
    printError(name, "Please enter a valid name");
    return false;
  }
};

/**
 * Validates a marque input field.
 * @param {HTMLInputElement} mark - The marque input field to validate.
 * @returns {boolean} True if the marque is valid, false otherwise.
 */
const checkMark = (mark) => {
  if (mark.value.trim() === "") {
    printError(mark, "Please enter a mark");
    return false;
  } else if (validate(mark, markRegex)) {
    printSuccess(mark);
    return true;
  } else if (!validate(mark, markRegex)) {
    printError(mark, "Please enter a valid mark");
    return false;
  }
};

/**
 * Validates a price input field.
 * @param {HTMLInputElement} price - The price input field to validate.
 * @returns {boolean} True if the price is valid, false otherwise.
 */
const checkPrice = (price) => {
  if (price.value.trim() === "") {
    printError(price, "Please enter a price");
    return false;
  } else if (validate(price, priceRegex)) {
    printSuccess(price);
    return true;
  } else if (!validate(price, priceRegex)) {
    printError(price, "Please enter a valid price");
    return false;
  }
};

/**
 * Formats a date as a string in the format "YYYY-MM-DD".
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Validates a date input field.
 * @param {HTMLInputElement} date - The date input field to validate.
 * @returns {boolean} True if the date is valid, false otherwise.
 */
const checkDate = (date) => {
  let today = new Date();
  const selectedDate = new Date(date.value);
  console.log(formatDate(selectedDate));
  console.log(formatDate(today));
  console.log(formatDate(selectedDate) != formatDate(today));
  if (date.value === "" || formatDate(selectedDate) >= formatDate(today)) {
    printError(date, "Please enter a valid date");
    return false;
  } else {
    printSuccess(date);
    return true;
  }
};

/**
 * Validates a type input field.
 * @param {HTMLSelectElement} selectInput - The type input field to validate.
 * @returns {boolean} True if the type is valid, false otherwise.
 */
const checkType = (selectInput) => {
  if (selectInput.value === "") {
    typeDiv.querySelector("small").textContent = "Please select a type";
    typeDiv.querySelector("small").style.color = "red";
    typeDiv.querySelector("small").style.visibility = "visible";
    return false;
  } else {
    typeDiv.querySelector("small").textContent = "";
    typeDiv.querySelector("small").style.visibility = "hidden";
    return true;
  }
};

/**
 * Checks if a promotion input field has a value.
 * @returns {boolean} True if the promotion input field has no value, false otherwise.
 */
const checkPromotion = () => {
  if (!promotionInputYes.checked && !promotionInputNo.checked) {
    printError(promotionInputYes, "please select one");
    return false;
  } else {
    printSuccess(promotionInputYes);
    return true;
  }
};

/**
 * Validates all form inputs by checking name, mark, price, date, type and promotion
 * @returns {void}
 */
const checkInputs = () => {
  checkName(nameInput);
  checkMark(marqueInput);
  checkPrice(priceInput);
  checkDate(datePrdInput);
  checkType(typeInput);
  checkPromotion();
};
