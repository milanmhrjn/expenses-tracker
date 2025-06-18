// setting heading with user name
export function setHeading(userName) {
  $("#userExpensesHeading").text(`${userName}'s Expenses`);
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
    window.location.href = "../expensesTracker/index.html";
  });
}
