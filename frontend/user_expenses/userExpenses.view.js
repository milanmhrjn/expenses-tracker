import { deleteExpenseById } from "../expensesTracker/expensesTracker.model.js";


export function setHeading(text) {
  $("#userExpensesHeading").text(text);
}


// rendering filtered expenses into table
export function renderExpenses(filteredExpenses, allExpenses) {
  const $tableBody = $("#expenseTableBody");

  filteredExpenses.forEach((exp, idx) => {
    const $tr = $(`
        <tr>
          <td>${idx + 1}</td>
          <td>${exp.Category}</td>
          <td>${exp.Description}</td>
          <td>${exp.Amount}</td>
          <td>${new Date(exp.Date).toLocaleString()}</td>
          <td>
            <div class="btn">
              <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
              <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `);

    // Adding button functionality
    addEditButtonFunctionality($tr, exp);
    addDeleteButtonFunctionality($tr, exp, allExpenses);
    $tableBody.append($tr);
  });
}

// clearing the expenses table
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

export function addEditButtonFunctionality($row, exp) {
  $row.find(".edit-btn").on("click", function () {
    localStorage.setItem("editExpense", JSON.stringify(exp));
    window.location.href = "../expensesTracker/expensesTracker.html";
  });
}

