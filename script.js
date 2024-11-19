"use strict";
const nameInput = document.querySelector("#nom_input");
const marqueInput = document.querySelector("#marque_input");
const priceInput = document.querySelector("#prix_input");
const datePrdInput = document.querySelector("#dateprd_input");
const typeInput = document.querySelector("#select");
const promotionInputYes = document.querySelector("#promotion_input_oui");
const promotionInputNo = document.querySelector("#promotion_input_non");
const tableBody = document.querySelector(".table_Body");
const modalDelete = document.getElementById("modal_delete");
const modalAdd = document.querySelector("#modal_submit");
const modalAddDiv = document.querySelector(".modal_submit");
const formSection = document.getElementById("form_section");
const submitBtn = document.querySelector("#submit_btn");
const deleteBtn = document.querySelector(".delete_btn");
const feedbackMsg = document.querySelector("#feedback_msg");
const divs = document.querySelectorAll("form div");
const nameRegex = /^([a-z{2-}]+[\'\-\s]?[a-z]+)$/gi;
const markRegex = /^([a-z{2-}]+[\'\-\s]?[a-z]+)$/gi;
const priceRegex = new RegExp("[0-9]", "g");
const validate = (input, regex) => regex.test(input.value.toLowerCase());
let current = "create";
let temp;

// hiding modals
document
  .querySelector(".welcome-modal-close")
  .addEventListener("click", function () {
    document.querySelector(".welcome-overlay").style.display = "none";
  });

document
  .querySelector(".welcome-modal-button")
  .addEventListener("click", function () {
    document.querySelector(".welcome-overlay").style.display = "none";
  });
modalDelete.style.display = "none";
modalAdd.style.display = "none";

// clearing inputs when refreshing the page
document.addEventListener("DOMContentLoaded", () => {
  clearInputs();
});
// getting data from local storage if exists
let dataArr = [];
if (localStorage.product != null) {
  dataArr = JSON.parse(localStorage.product);
  dataArr.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Adds event listeners to input elements to validate their values.
 *
 * - Listens for the "blur" event on name, marque, and price inputs to trigger validation functions
 *   (checkName, checkMark, checkPrice) when the input loses focus.
 * - Listens for the "click" event on the type input to trigger the checkType function.
 *
 * @listens blur - Triggers validation on name, marque, and price inputs.
 * @listens click - Triggers validation on the type input.
 */
nameInput.addEventListener("blur", (e) => {
  checkName(e.target);
});
marqueInput.addEventListener("blur", (e) => {
  checkMark(e.target);
});
priceInput.addEventListener("blur", (e) => {
  checkPrice(e.target);
});
typeInput.addEventListener("click", (e) => {
  checkType(e.target);
});
// refreshing data when clicking delete
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {
    showData();
  }
});

/**
 * Returns the value of the checked promotion input field or "Non" if none is checked.
 * @returns {string} The value of the checked promotion input field or "Non".
 */
const getPromotionValue = () => {
  return (
    document.querySelector('input[name="promotion"]:checked')?.value || "Non"
  );
};
// adding data function
const showData = () => {
  let table = "";
  if (dataArr.length == 0) table = "";
  else {
    tableBody.innerHTML = "";
    for (let i = 0; i < dataArr.length; i++) {
      table += `<tr class="magazin_list">
      <td>${dataArr[i].name}</td>
      <td>${dataArr[i].marque}</td>
      <td>${dataArr[i].price}</td>
      <td>${dataArr[i].date}</td>
      <td>${dataArr[i].type}</td>
      <td>${dataArr[i].promotion}</td>
      <td><a onclick="update(${i})" href="#" class="modify_btn">modify</a></td>
      <td><a onclick="deletedData(${i})" href="#" class="delete_btn">Delete</a></td>
      </tr>`;
    }
  }
  tableBody.innerHTML = table;
};

/**
 * Shows the delete modal and hides the form section, and sets the delete button's onclick attribute to deleteData with the given index.
 * @param {number} i - The index of the element to be deleted in the data array.
 */
const deletedData = (i) => {
  formSection.style.display = "none";
  modalDelete.style.display = "flex";
  delete_Pro.setAttribute("onclick", `deleteData(${i})`);
  document.querySelector(".overlay").style.display = "block";
};

/**
 * Deletes the element at the given index from the data array, saves the data to local storage and shows the data.
 * @param {number} i - The index of the element to be deleted in the data array.
 */
const deleteData = (i) => {
  formSection.style.display = "grid";
  modalDelete.style.display = "none";
  dataArr.splice(i, 1);
  localStorage.product = JSON.stringify(dataArr);
  tableBody.classList.add("update-success");
  showData();
};
// edit button
const update = (i) => {
  nameInput.value = dataArr[i].name;
  marqueInput.value = dataArr[i].marque;
  priceInput.value = dataArr[i].price;
  datePrdInput.value = dataArr[i].date;
  typeInput.value = dataArr[i].type;
  submitBtn.value = "Update";
  current = "update";
  temp = i;
};
// data Class
const article = class {
  constructor(name, marque, price, date, type, promotion) {
    this.name = name;
    this.marque = marque;
    this.price = price;
    this.date = date;
    this.type = type;
    this.promotion = promotion;
  }
  getDetails() {
    return `<h2>Détails de l'article</h2>
    <p>Nom: <span>${this.name}</span></p>
    <p>Marque: <span>${this.marque}</span></p>
    <p>Prix: <span>${this.price}</span></p>
    <p>Date de publication: <span>${this.date}</span></p>
    <p>Type: <span>${this.type}</span></p>
    <p>En promotion: <span>${this.promotion}</span></p>`;
  }
};
// Modal animations
modalAddDiv.addEventListener("animationend", () => {
  modalAddDiv.classList.remove("submit-success");
});

tableBody.addEventListener("animationend", () => {
  tableBody.classList.remove("update-success");
});

// submit event
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const dataObj = new article(
    nameInput.value,
    marqueInput.value,
    priceInput.value,
    datePrdInput.value,
    typeInput.value,
    getPromotionValue()
  );
  const inputsArrChecking = [
    checkName(nameInput),
    checkMark(marqueInput),
    checkPrice(priceInput),
    checkType(typeInput),
    checkDate(datePrdInput),
    checkPromotion(),
  ];
  if (current == "create") {
    if (inputsArrChecking.some((input) => input === false)) {
      modalAddDiv.classList.add("submit-success");
      feedbackMsg.style.display = "block";
      feedbackMsg.innerHTML = "an error ocurred";
      checkInputs();
    } else {
      tableBody.classList.add("update-success");
      dataArr.push(dataObj);
      dataArr.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem("product", JSON.stringify(dataArr));
      feedbackMsg.innerHTML = "";
      feedbackMsg.style.display = "none";
      showData();
      clearInputs();
      modalAddDiv.innerHTML = dataObj.getDetails();
      modalAdd.style.display = "flex";
      formSection.style.display = "none";
      clearChecking(divs);
    }
  } else {
    if (inputsArrChecking.some((input) => input === false)) {
      tableBody.classList.add("update-success");
      feedbackMsg.style.display = "block";
      feedbackMsg.innerHTML = "an error ocurred";
      checkInputs();
    } else {
      tableBody.classList.add("update-success");
      dataArr[temp].name = nameInput.value;
      dataArr[temp].marque = marqueInput.value;
      dataArr[temp].price = priceInput.value;
      dataArr[temp].date = datePrdInput.value;
      dataArr[temp].type = typeInput.value;
      dataArr[temp].promotion = getPromotionValue();
      dataArr.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem("product", JSON.stringify(dataArr));
      showData();
      clearInputs();
      clearChecking(divs);
      submitBtn.value = "Submit";
      current == "create";
    }
  }
});
// close modal
modalAdd.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    modalAdd.style.display = "none";
    formSection.style.display = "grid";
  }
});
window.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && modalAdd.style.display == "flex") {
    modalAdd.style.display = "none";
    formSection.style.display = "grid";
  }
});
showData();
