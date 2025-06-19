import{getEditExpense,getFormData,getAllExpenses,addNewExpense,updateExpense,saveExpenses} from "./expensesTracker.model.js"
import{prefillForm} from "./expensesTracker.view.js"
import {redirectToUserExpensesPage} from "./expensesTracker.controller.js"

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


