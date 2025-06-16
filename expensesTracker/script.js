document.addEventListener("DOMContentLoaded", function () {
  // check if we are editing
  const editExpense = JSON.parse(localStorage.getItem("editExpense"));

  if (editExpense) {
    // put the old data into the form
    document.getElementById("category").value = editExpense.category;
    document.getElementById("description").value = editExpense.description;
    document.getElementById("amount").value = editExpense.amount;
    document.getElementById("date").value = editExpense.date;
  }

  // when addExpense button is clicked
  document.getElementById("addExpense").addEventListener("click", function () {
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const user = localStorage.getItem("userName");

    const newExpense = { user, category, description, amount, date };

    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (editExpense) {
      // we are editing, so find the old one and replace it
      const index = expenses.findIndex(
        (e) =>
          e.user === editExpense.user &&
          e.category === editExpense.category &&
          e.description === editExpense.description &&
          e.amount === editExpense.amount &&
          e.date === editExpense.date
      );

      if (index !== -1) {
        expenses[index] = newExpense;
      }

      localStorage.removeItem("editExpense"); // remove edit mode
    } else {
      // we are adding new
      expenses.push(newExpense);
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    alert("Expense saved!");
    window.location.href = "userExpenses.html";
  });
});
