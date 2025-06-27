import { getFormData, addNewExpense, updateExpenseById  } from "./expensesTracker.model.js";

export function createExpense() {
  $("#addExpense").on("click", async function (e) {
    e.preventDefault();
    const formData = getFormData();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please go back and select a user.");
      return;
    }
    formData.UserId = parseInt(userId);
    if (!formData.amount || isNaN(formData.amount)) {
      alert("Amount is required and must be a number.");
      return;
    }

    if (parseFloat(formData.amount) < 0) {
      alert("Amount should not be less than 0");
      return;
    }

    try {
      await addNewExpense(formData);
      alert("Expense added successfully.");
      redirectToUserExpensesPage();
    } catch (err) {
      console.error("Error adding expense:", err);
      alert("Failed to add expense: " + err.message);
    }
  });
}


export async function deleteExpenseById(id) {
  const res = await fetch(`http://localhost:5000/expensesTracker/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete expense");
  return await res.text();
}

export function populateForm(expense) {
  $("#category").val(expense.Category || expense.category);
  $("#description").val(expense.Description || expense.description);
  $("#amount").val(expense.Amount || expense.amount);
  const date = expense.Date || expense.date;
  if (date) {
  const local = new Date(date).toISOString().slice(0, 16);
  $("#date").val(local);
}
  $("#addExpense").text("Update Expense");
}




export function updateExpense(id) {
  $("#addExpense").on("click", async function (e) {
  e.preventDefault();

  const formData = getFormData();
  const editExpense = JSON.parse(localStorage.getItem("editExpense"));
  const id = editExpense?.id;

  console.log("ID from localStorage:", id);
  console.log("Data to update:", formData);

  if (!id) {
    alert("Expense ID not found for update.");
    return;
  }

  try {
    await updateExpenseById(id, formData);
    alert("Expense updated successfully.");
    localStorage.removeItem("editExpense");
    redirectToUserExpensesPage();
  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update expense: " + err.message);
  }
});

}

function redirectToUserExpensesPage() {
  window.location.href = "../user_details/userDetail.html";
}
