

// Getting the active user's name
const userName = localStorage.getItem("userName");

// Getting all expenses from localStorage
const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Getting the table body and heading elements
const tableBody = document.getElementById("expenseTableBody");
const heading = document.getElementById("userExpensesHeading");

// Setting heading text
heading.textContent = userName + "'s Expenses";

// Function to clear table
function clearTable() {
  tableBody.innerHTML = "";
}

// Function to filter and show expenses by days
function filterByDays(days) {
  clearTable(); // clear existing rows

  // Get today's date
  const today = new Date();

  // Calculate the date 'days' ago
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  // Filter expenses for the active user and within the date range
  const filteredExpenses = expenses.filter((exp) => {
    if (exp.user !== userName) return false; // only user's expenses

    const expenseDate = new Date(exp.date);
    // Check if expenseDate is between pastDate (inclusive) and today (inclusive)
    return expenseDate >= pastDate && expenseDate <= today;
  });

  // Show filtered expenses in the table
  filteredExpenses.forEach((exp, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
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
    `;
    tableBody.appendChild(tr);

    // deleting button event
    tr.querySelector(".delete-btn").addEventListener("click", function () {
      const i = expenses.findIndex(
        (e) =>
          e.user === exp.user &&
          e.category === exp.category &&
          e.description === exp.description &&
          e.amount === exp.amount &&
          e.date === exp.date
      );
      if (i !== -1) {
        expenses.splice(i, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        tr.remove();
      }
    });

    // editing button event
    tr.querySelector(".edit-btn").addEventListener("click", function () {
      localStorage.setItem("editExpense", JSON.stringify(exp));
      window.location.href = "index.html";
    });
  });
}

// listening to dropdown change
document.getElementById("statementSelect").addEventListener("change", function () {
  const days = parseInt(this.value);
  filterByDays(days);
});

// loading default data (e.g. 1 Day Statement) on page load
filterByDays(parseInt(document.getElementById("statementSelect").value));
