import { clearTable, renderExpenses, setHeading } from "./userExpenses.view.js";
import { getAllExpensesByUserId,getUserById } from "../expensesTracker/expensesTracker.model.js";

$(document).ready(async function () {
  const userId = parseInt(localStorage.getItem("userId"));
  const userName = localStorage.getItem("userName");

  if (!userId) {
    alert("No user selected.");
    return;
  }

  try {
    const expenses = await getAllExpensesByUserId(userId);
    setHeading(`${userName}'s Expenses`);
    renderExpenses(expenses); // you can apply filtering if needed
  } catch (err) {
    console.error("Failed to load expenses:", err);
    alert("Could not load expenses.");
  }
});



function filterByDays(days, expenses) {
  clearTable();
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const filtered = expenses.filter((exp) => {
    const date = new Date(exp.Date || exp.date); 
    return date >= pastDate && date <= today;
  });

  renderExpenses(filtered, expenses);
}


export async function userExpenses() {
  debugger;
  const userId = parseInt(localStorage.getItem("userId"));
  if (!userId) {
    alert("No user selected");
    return;
  }

  try {
    const [user, expenses] = await Promise.all([
      getUserById(userId),
      getAllExpensesByUserId(userId)
    ]);

    setHeading(`${user.name}'s Expenses`);

    const defaultDays = parseInt($("#statementSelect").val());
    filterByDays(defaultDays, expenses);

  
    $("#statementSelect").on("change", function () {
      const days = parseInt($(this).val());
      filterByDays(days, expenses); 
    });

  } catch (err) {
    console.error("Error loading user expenses:", err);
    alert("Failed to load expenses");
  }
}

