import { createExpense, updateExpense, populateForm } from "./expensesTracker.controller.js";

$(document).ready(() => {
  const editExpense = JSON.parse(localStorage.getItem("editExpense"));

  if (editExpense) {
    populateForm(editExpense);       
    updateExpense(editExpense.id);   
  } else {
    createExpense();                 
  }
});
