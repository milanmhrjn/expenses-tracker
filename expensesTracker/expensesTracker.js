import{getEditExpense, getFormData, getAllExpenses} from "./expensesTracker.model"
import {prefillForm,addNewExpense, updateExpense, saveExpenses,redirectToUserExpensesPage} from "./expensesTracker.controller.js";

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


