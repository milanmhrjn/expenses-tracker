// Getting the active user's name
  const userName = localStorage.getItem('userName');
  document.getElementById('userExpensesHeading').textContent = userName + "'s Expenses";
  // Getting all expenses from localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  // Filtering expenses for the active user
  const userExpenses = expenses.filter(exp => exp.user === userName);

  // Getting the table body
  const tableBody = document.getElementById('expenseTableBody');

  // Adding each expense as a row
  userExpenses.forEach((exp, idx) => {
    const tr = document.createElement('tr');
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
  });

