import { deleteExpenseById } from "../expensesTracker/expensesTracker.model.js";


export function setHeading(text) {
  $("#userExpensesHeading").text(text);
}
export function renderExpenses(expenses, userId) {
  console.log("renderExpenses called, expenses:", expenses);

  const $tableBody = $("#expenseTableBody");
  $tableBody.empty();

  expenses.forEach((exp, idx) => {
    const rawDate = exp.ExpenseDate;
    const dateStr = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";
    const $row = $(`
      <tr>
        <td>${idx + 1}</td>
        <td>${exp.Category || exp.category}</td>
        <td>${exp.Description || exp.description}</td>
        <td>${exp.Amount || exp.amount}</td>
        <td>${dateStr}</td>
        <td>
          <div class="btn">
            <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `);

    addEditButtonFunctionality($row, exp, userId);
    addDeleteButtonFunctionality($row, exp);
    $tableBody.append($row);
  });
}


export function clearTable() {
  $("#expenseTableBody").empty();
}

export function addDeleteButtonFunctionality($row, exp) {
  $row.find(".delete-btn").on("click", async function () {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const expenseId = exp.id || exp.Id;
      console.log("Deleting from backend:", expenseId);

      await deleteExpenseById(expenseId); 
      $row.remove(); 
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete expense.");
    }
  });
}


export function addEditButtonFunctionality($row, exp, userId) {
  $row.find(".edit-btn").on("click", function () {
    window.location.href = `../expensesTracker/expensesTracker.html?userId=${userId}&editExpenseId=${exp.id || exp.Id}`;
  });
}


