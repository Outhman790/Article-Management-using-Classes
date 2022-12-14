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
// const tableData = document.querySelector(".magazin_list");
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
// hiding the modal
modalDelete.style.display = "none";
modalAdd.style.display = "none";

//
let dataArr = [];
if (localStorage.product != null) {
  dataArr = JSON.parse(localStorage.product);
  dataArr.sort((a, b) => a.name.localeCompare(b.name));
}

// events ( will be improved after finishing )
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
//
const deletedData = (i) => {
  formSection.style.display = "none";
  modalDelete.style.display = "flex";
  delete_Pro.setAttribute("onclick", `deleteData(${i})`);
};
const deleteData = (i) => {
  formSection.style.display = "grid";
  modalDelete.style.display = "none";
  dataArr.splice(i, 1);
  localStorage.product = JSON.stringify(dataArr);
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
// submit event
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const dataObj = new article(
    nameInput.value,
    marqueInput.value,
    priceInput.value,
    datePrdInput.value,
    typeInput.value,
    document.querySelector('input[name="promotion"]:checked')?.value
  );
  if (current == "create") {
    if (
      checkName(nameInput) == false ||
      checkMark(marqueInput) == false ||
      checkPrice(priceInput) == false ||
      promotionNoValue() == true ||
      checkType(typeInput) == false ||
      checkDate(datePrdInput) == false
    ) {
      feedbackMsg.style.display = "block";
      feedbackMsg.innerHTML = "an error ocurred";
      checkInputs();
    } else {
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
    if (
      checkName(nameInput) == false ||
      checkMark(marqueInput) == false ||
      checkPrice(priceInput) == false ||
      promotionNoValue() == true ||
      checkType(typeInput) == false ||
      checkDate(datePrdInput) == false
    ) {
      feedbackMsg.style.display = "block";
      feedbackMsg.innerHTML = "an error ocurred";
    } else {
      dataArr[temp].name = nameInput.value;
      dataArr[temp].marque = marqueInput.value;
      dataArr[temp].price = priceInput.value;
      dataArr[temp].date = datePrdInput.value;
      dataArr[temp].type = typeInput.value;
      dataArr.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem("product", JSON.stringify(dataArr));
      showData();
      clearInputs();
      clearChecking(divs);
      feedbackMsg.innerHTML = "";
      feedbackMsg.style.display = "none";
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
