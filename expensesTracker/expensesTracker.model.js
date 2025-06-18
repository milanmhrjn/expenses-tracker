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
