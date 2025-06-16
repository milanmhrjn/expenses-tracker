$(document).ready(function () {
  const userName = getUserName();
  const expenses = getExpenses();
  setHeading(userName);

  const defaultDays = parseInt($("#statementSelect").val());
  filterByDays(defaultDays, userName, expenses);

  $("#statementSelect").on("change", function () {
    const days = parseInt($(this).val());
    filterByDays(days, userName, expenses);
  });
});

// getting current user name
function getUserName() {
  return localStorage.getItem("userName");
}

// getting all expenses
function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// setting heading with user name
function setHeading(userName) {
  $("#userExpensesHeading").text(`${userName}'s Expenses`);
}

// clearing the expenses table
function clearTable() {
  $("#expenseTableBody").empty();
}

// filtering expenses by date and rendering
function filterByDays(days, userName, expenses) {
  clearTable();
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const filteredExpenses = expenses.filter(exp => {
    if (exp.user !== userName) return false;
    const expenseDate = new Date(exp.date);
    return expenseDate >= pastDate && expenseDate <= today;
  });

  renderExpenses(filteredExpenses, expenses);
}

// rendering filtered expenses into table
function renderExpenses(filteredExpenses, allExpenses) {
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

// delete functionality
function addDeleteButtonFunctionality($row, exp, allExpenses) {
  $row.find(".delete-btn").on("click", function () {
    const index = allExpenses.findIndex(e =>
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
function addEditButtonFunctionality($row, exp) {
  $row.find(".edit-btn").on("click", function () {
    localStorage.setItem("editExpense", JSON.stringify(exp));
    window.location.href = "../expensesTracker/index.html";
  });
}
