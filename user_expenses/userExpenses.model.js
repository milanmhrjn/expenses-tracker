// getting current user name
export function getUserName() {
  return localStorage.getItem("userName");
}

// getting all expenses
export function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// filtering expenses by date and rendering
export function filterByDays(days, userName, expenses) {
  clearTable();
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const filteredExpenses = expenses.filter((exp) => {
    if (exp.user !== userName) return false;
    const expenseDate = new Date(exp.date);
    return expenseDate >= pastDate && expenseDate <= today;
  });

  renderExpenses(filteredExpenses, expenses);
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