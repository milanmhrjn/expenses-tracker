// setting heading with user name
export function setHeading(userName) {
  $("#userExpensesHeading").text(`${userName}'s Expenses`);
}

// rendering filtered expenses into table
export function renderExpenses(filteredExpenses, allExpenses) {
  const $tableBody = $("#expenseTableBody");

  filteredExpenses.forEach((exp, idx) => {
    const $tr = $(`
        <tr>
          <td>${idx + 1}</td>
          <td>${exp.category}</td>
          <td class="desc-col">${exp.description}</td>
          <td>${exp.amount}</td>
          <td>${exp.date}</td>
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

// delete functionality
export function addDeleteButtonFunctionality($row, exp, allExpenses) {
  $row.find(".delete-btn").on("click", function () {
    const index = allExpenses.findIndex(
      (e) =>
        e.user === exp.user &&
        e.category === exp.category &&
        e.description === exp.description &&
        e.amount === exp.amount &&
        e.date === exp.date
    );

    if (index !== -1) {
      allExpenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(allExpenses));
      $row.remove();
    }
  });
}

// edit functionality
export function addEditButtonFunctionality($row, exp) {
  $row.find(".edit-btn").on("click", function () {
    localStorage.setItem("editExpense", JSON.stringify(exp));
    window.location.href = "/expensesTracker/expensesTracker.html";
  });
}
