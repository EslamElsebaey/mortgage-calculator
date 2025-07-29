// Global Variables

const form = document.querySelector(".form");
const textInputs = form.querySelectorAll("input[type='number']");
const radioInputs = form.querySelectorAll("input[type='radio']");
// let mortgageAmount = document.getElementById("mortgage-amount");
// let mortgageTerm = document.getElementById("mortgage-term");
// let interestRate = document.getElementById("interest-rate");
let defaultMessage = document.getElementById("defaultMessage");
let results = document.getElementById("results");
let resultNum = document.querySelector(".result-num");
let totalNum = document.querySelector(".total-num");

// Validate Form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  textInputs.forEach((input) => {
    const inputHolder = input.closest(".input-holder");
    const inputWrapper = input.closest(".input-wrapper");
    // remove old error
    const oldError = inputHolder.querySelector(".errorMessage");
    if (oldError) oldError.remove();
    // add class to mark input wrapper has error
    inputWrapper.classList.remove("input-wrapper-error");

    // if inputs are empty, create errorMessage div and add error class to input wrapper
    if (!input.value.trim() || parseFloat(input.value) <= 0) {
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("errorMessage");
      errorMessage.textContent = "This field is required";
      inputHolder.appendChild(errorMessage);
      inputWrapper.classList.add("input-wrapper-error");
    }
  });

  // check if radio inputs are not checked, then create errormessage div too
  const selected = document.querySelector("input[name='mortgage']:checked");
  const radioWrapper = document.querySelector(".radio-wrapper");
  const oldRadioError = radioWrapper.querySelector(".errorMessage");
  if (oldRadioError) oldRadioError.remove();
  if (!selected) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("errorMessage");
    errorMessage.textContent = "This field is required";
    radioWrapper.appendChild(errorMessage);
  }
});

// Calculate the Repayment
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // check if inputs and radio are not empty or not checked to calculate the repayment
  const amount = parseFloat(document.getElementById("mortgage-amount").value);
  const term = parseFloat(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value);
  const selected = document.querySelector("input[name='mortgage']:checked");
  if (
    !isNaN(amount) &&
    amount > 0 &&
    !isNaN(term) &&
    term > 0 &&
    !isNaN(rate) &&
    rate > 0 &&
    selected
  ) {
    let P = amount;
    let years = term;
    let annualRate = rate;
    let n = years * 12;
    let r = annualRate / 100 / 12;
    let selectedType = document.querySelector(
      "input[name='mortgage']:checked"
    ).value;
    let monthlyPayment;
    // hide default message div and show the results div
    defaultMessage.style.display = "none";
    results.style.display = "block";
    if (selectedType == "repayment") {
      monthlyPayment =
        (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      resultNum.textContent = monthlyPayment.toFixed(2);
      totalNum.textContent = (monthlyPayment * n).toFixed(2);
    } else if (selectedType == "interest-only") {
      monthlyPayment = P * r;
      resultNum.textContent = monthlyPayment.toFixed(2);
      totalNum.textContent = (monthlyPayment * n).toFixed(2);
    }
  }
});

// Clear Inputs

const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", function () {
  textInputs.forEach((input) => {
    input.value = "";
  });
  radioInputs.forEach((radioInput) => {
    radioInput.checked = false;
  });
  const errors = document.querySelectorAll(".errorMessage");
  errors.forEach((error) => {
    error.remove();
  });
  const inputWrappers = document.querySelectorAll(".input-wrapper");
  inputWrappers.forEach((inputWrapper) => {
    inputWrapper.classList.remove("input-wrapper-error");
  });

  defaultMessage.style.display = "block";
  results.style.display = "none";
  resultNum.textContent = 0;
  totalNum.textContent = 0;
});
