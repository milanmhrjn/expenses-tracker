import {
  getFormData,
  addNewExpense,
  updateExpenseById,
  getUserById,
  getExpenseById
} from "./expensesTracker.model.js";

import { populateForm } from "./expensesTracker.view.js";

export async function handleExpenseForm() {
  const params = new URLSearchParams(window.location.search);
  const userId = parseInt(params.get("userId"));
  const expenseId = parseInt(params.get("editExpenseId"));
  const isUpdateMode = !!expenseId;

  if (!userId) {
    alert("User ID not found. Please go back and select a user.");
    return;
  }
  try {
    const user = await getUserById(userId);
    $("#user-name").text(user.name);
    $("#user-email").text(user.email);
    $("#user-phone").text(user.phone);
  } catch (err) {
    alert("Could not load user info.");
  }
  if (isUpdateMode) {
    $("label[for='date']").hide();
    $("#date").hide();
    try {
      const editExpense = await getExpenseById(expenseId);
      populateForm(editExpense);
    } catch (err) { 
      alert("Failed to load expense for editing.");
    }
  }

  $("#addExpense")
    .off("click")
    .on("click", async function (e) {
      e.preventDefault();
      const formData = getFormData();
      formData.userId = userId;
      if (!formData.amount || isNaN(formData.amount)) {
        alert("Amount is required and must be a number.");
        return;
      }

      if (parseFloat(formData.amount) < 0) {
        alert("Amount should not be less than 0.");
        return;
      }

      try {
        if (isUpdateMode) {
          await updateExpenseById(expenseId, formData);
          alert("Expense updated successfully.");
        } else {
          await addNewExpense(formData, userId);
          alert("Expense added successfully.");
        }
        redirectToUserExpensesPage(userId);
      } catch (err) {
        console.error("Error submitting expense:", err);
        alert("Submission failed: " + err.message);
      }
    });
}

function redirectToUserExpensesPage(userId) {
  window.location.href = `../user_expenses/userExpenses.html?userId=${userId}`;
}
