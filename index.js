

document.addEventListener('DOMContentLoaded', function () {
  const inputs = document.querySelectorAll("input[type='number']");
  const radioInputs = document.querySelectorAll("input[type='radio']");
  const radioInputContainers = document.querySelectorAll(".input-container.radio-container");
  const emptyResultContainer = document.querySelector(".empty");
  const notEmptyResultContainer = document.querySelector(".not-empty");
  const monthlyRepaymentTag = document.querySelector(".result-box > h1");
  const totalRepaymentTag = document.querySelector(".result-box > h3");
  const form = document.querySelector("form");
  const calculateButton = document.querySelector(".calculate-btn");

  let mortgageAmount = null,
    mortgageTerm = null,
    interestRate = null,
    mortgageType = null;

  const toggleFocusClass = (input, action) => {
    const inputContainer = input.parentElement;
    const unitBox = input.name === 'amount' ? input.previousElementSibling : input.nextElementSibling;

    inputContainer.classList[action]("input-focused");
    unitBox.classList[action]("unit-focused");
  };

  const handleInputFocus = (input) => {
    input.addEventListener("focus", () => toggleFocusClass(input, "add"));
    input.addEventListener("blur", () => toggleFocusClass(input, "remove"));
  };

  radioInputContainers.forEach(container => {
    container.addEventListener('click', () => {
      const selectedRadio = container.querySelector("input[type='radio']");
      mortgageType = selectedRadio.id;

      radioInputs.forEach((radioInput) => {
        const isSelected = radioInput === selectedRadio;
        const action = isSelected ? 'add' : 'remove';
        radioInput.parentElement.classList[action]("input-focused-background");
        radioInput.parentElement.classList[action]("input-focused");
        radioInput.checked = isSelected;

      })
    })
  });

  inputs.forEach(handleInputFocus);


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    inputs.forEach((input,) => {
      const value = input.value;

      try {
        if (value) {
          switch (input.name) {
            case "amount":
              mortgageAmount = value;
              break;
            case "term":
              mortgageTerm = value;
              break;
            case "rate":
              interestRate = value;
              break;
          }
        }
        validateInput(input, value);
      } catch (error) {
        console.error("Error during switch processing:", error);
      }

    });

    if (!mortgageType) {
      calculateButton.previousElementSibling.classList.remove("hidden");
    } else {
      calculateButton.previousElementSibling.classList.add("hidden");
    }


    if (!mortgageAmount || !mortgageTerm || !mortgageType || !interestRate) return;

    const { monthlyRepayment, totalRepaymentAmount } = calculateRepayments(mortgageAmount, mortgageTerm, interestRate);

    emptyResultContainer.classList.add("hidden");
    notEmptyResultContainer.classList.remove("hidden");

    monthlyRepaymentTag.textContent = `£${monthlyRepayment}`;
    totalRepaymentTag.textContent = `£${totalRepaymentAmount}`;
  });

});


const formatNumber = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};


const calculateRepayments = (amount, term, rate) => {
  const monthlyInterestRate = rate / 1200;
  const totalMonths = term * 12;
  const monthlyRepayment =
    (amount * (monthlyInterestRate * (1 + monthlyInterestRate) ** totalMonths)) / ((1 + monthlyInterestRate) ** totalMonths - 1);
  const totalRepaymentAmount = monthlyRepayment * totalMonths;

  return {
    monthlyRepayment: formatNumber(monthlyRepayment.toFixed(2)),
    totalRepaymentAmount: formatNumber(totalRepaymentAmount.toFixed(2)),
  };
};

const validateInput = (input, value) => {
  const showError = !value;
  const inputContainer = input.parentElement;
  const errorMessage = inputContainer.nextElementSibling;
  const unitBox = input.name === 'amount' ? input.previousElementSibling : input.nextElementSibling;

  errorMessage.classList.toggle("hidden", !showError);
  unitBox.classList.toggle("error-unit", showError);
  inputContainer.classList.toggle("error-border", showError);

  return value;
};



