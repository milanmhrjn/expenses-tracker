// filling form with old data when editing
export function prefillForm(expense) {
  $("#category").val(expense.category);
  $("#description").val(expense.description);
  $("#amount").val(expense.amount);
  $("#date").val(expense.date);
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

// redirecting to user expenses page
function redirectToUserExpensesPage() {
  window.location.href = "../user_details/userDetail.html";
}