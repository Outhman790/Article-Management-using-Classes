"use strict";
const typeDiv = document.querySelector("#type_div");
// validating name
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
// validating marque
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
// validating price
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
// validating date
const checkDate = (date) => {
  if (!(date.value === "")) {
    printSuccess(date);
    return true;
  } else {
    printError(date, "Please enter a date");
    return false;
  }
};
// validating type
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
// validating promotion
const promotionNoValue = () => {
  if (!promotionInputYes.checked && !promotionInputNo.checked) {
    printError(promotionInputYes, "please select one");
    return true;
  } else {
    printSuccess(promotionInputYes);
    return false;
  }
};
// checking all inputs at once
const checkInputs = () => {
  checkName(nameInput);
  checkMark(marqueInput);
  checkPrice(priceInput);
  checkDate(datePrdInput);
  checkType(typeInput);
  promotionNoValue();
};
const clearChecking = (divs) => {
  divs.forEach((div) => {
    console.log(div);
    const divName = div.dataset.name;
    if (div.classList.contains("success") || div.classList.contains("error")) {
      div.className = `${divName}_div`;
    }
  });
};
