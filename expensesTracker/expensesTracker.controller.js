import {
  getEditExpense,
  getFormData,
  getAllExpenses,
  addNewExpense,
  updateExpense,
  saveExpenses,
} from "./expensesTracker.model.js";
import { prefillForm } from "./expensesTracker.view.js";
// redirecting to user expenses page
export function redirectToUserExpensesPage() {
  window.location.href = "../user_details/userDetail.html";
}

export function expenses() {
  const editExpense = getEditExpense();
  if (editExpense) {
    prefillForm(editExpense);
  }

  $("#addExpense").on("click", function (e) {
    e.preventDefault();
    const amt = getFormData();
    if (amt.amount < 0) {
      alert("Amount should not be less than 0");
      return;
    }

    const editExpense = getEditExpense();
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
}
