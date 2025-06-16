$(document).ready(function () {
  const editExpense = getEditExpense();
  if (editExpense) {
    prefillForm(editExpense);
  }

  $("#addExpense").on("click", function () {
    const newExpense = getFormData();
    const expenses = getAllExpenses();
    const editMode = !!editExpense;

    if (editMode) {
      updateExpense(expenses, editExpense, newExpense);
    } else {
      addNewExpense(expenses, newExpense);
    }

    saveExpenses(expenses);
    localStorage.removeItem("editExpense");
    alert("Expense saved!");
    redirectToUserExpensesPage();
  });
});

// getting editExpense from localStorage
function getEditExpense() {
  return JSON.parse(localStorage.getItem("editExpense"));
}

// filling form with old data when editing
function prefillForm(expense) {
  $("#category").val(expense.category);
  $("#description").val(expense.description);
  $("#amount").val(expense.amount);
  $("#date").val(expense.date);
}

// getting form input values and return as object
function getFormData() {
  const category = $("#category").val();
  const description = $("#description").val();
  const amount = $("#amount").val();
  const date = $("#date").val();
  const user = localStorage.getItem("userName");

  return { user, category, description, amount, date };
}

//getting all expenses from localStorage
function getAllExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// adding  new expense to the array
function addNewExpense(expenses, expense) {
  expenses.push(expense);
}

// replacing old expense with updated one
function updateExpense(expenses, oldExp, newExp) {
  const index = expenses.findIndex(
    (e) =>
      e.user === oldExp.user &&
      e.category === oldExp.category &&
      e.description === oldExp.description &&
      e.amount === oldExp.amount &&
      e.date === oldExp.date
  );

  if (index !== -1) {
    expenses[index] = newExp;
  }
}

// saving expenses array back to localStorage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// redirecting to user expenses page
function redirectToUserExpensesPage() {
  window.location.href = "../user_details/userDetail.html";
}
