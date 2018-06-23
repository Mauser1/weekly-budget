class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.budgetRemainder = this.budget;
  }

  substractFromBudget(amount) {
    return (this.budgetRemainder -= amount);
  }
}

class HTML {
  insertBudget(amount) {
    budgetTotal.innerHTML = `${amount}`;
    budgetRemainder.innerHTML = `${amount}`;
  }

  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    document
      .querySelector(".primary")
      .insertBefore(messageWrapper, addExpenseForm);

    setTimeout(function() {
      document.querySelector(".primary .alert").remove();
      addExpenseForm.reset();
    }, 2000);
  }

  addExpenseToList(name, amount) {
    const expensesList = document.querySelector("#expenses ul");

    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
               ${name}
               <span class="badge badge-primary badge-pill">$ ${amount}</span>
          `;

    expensesList.appendChild(li);
  }
  trackBudget(amount) {
    const budgetLeftDollars = budget.substractFromBudget(amount);
    budgetRemainder.innerHTML = `${budgetLeftDollars}`;

    if (budget.budget / 4 > budgetLeftDollars) {
      budgetRemainder.parentElement.parentElement.classList.remove(
        "alert-success",
        "alert-warning"
      );
      budgetRemainder.parentElement.parentElement.classList.add("alert-danger");
    } else if (budget.budget / 2 > budgetLeftDollars) {
      budgetRemainder.parentElement.parentElement.classList.remove(
        "alert-success"
      );
      budgetRemainder.parentElement.parentElement.classList.add(
        "alert-warning"
      );
    }
  }
}
const addExpenseForm = document.querySelector("#add-expense"),
  budgetTotal = document.querySelector("span#total"),
  budgetRemainder = document.querySelector("span#remainder");

let budget, userBudget;

const html = new HTML();

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", function() {
    userBudget = prompt(" What's your budget for this week? ");
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      budget = new Budget(userBudget);
      html.insertBudget(budget.budget);
    }
  });

  addExpenseForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const expenseName = document.querySelector("#expense").value;
    const amount = document.querySelector("#amount").value;

    if (expenseName === "" || amount === "") {
      html.printMessage("Please fill both name and amount", "alert-info");
    } else {
      html.addExpenseToList(expenseName, amount);
      html.trackBudget(amount);
    }
  });
}
