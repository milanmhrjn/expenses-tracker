// getting editExpense from localStorage
export function getEditExpense() {
  return JSON.parse(localStorage.getItem("editExpense"));
}

// getting form input values and return as object
export function getFormData() {
  const category = $("#category").val();
  const description = $("#description").val();
  const amount = $("#amount").val();
  const date = $("#date").val();
  const user = localStorage.getItem("userName");

  return { user, category, description, amount, date };
}

//getting all expenses from localStorage
export function getAllExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// adding  new expense to the array
export function addNewExpense(expenses, expense) {
  expenses.push(expense);
}

// replacing old expense with updated one
export function updateExpense(expenses, oldExp, newExp) {
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
export function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}