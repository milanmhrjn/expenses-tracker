import { clearTable, renderExpenses, setHeading } from "./userExpenses.view.js";
import { getAllExpensesByUserId, getUserById } from "../expensesTracker/expensesTracker.model.js";

export async function userExpenses() {
  const params = new URLSearchParams(window.location.search);
  const userId = parseInt(params.get("userId"));
  const userName = params.get("userName")
  if (!userId) {
    alert("No user selected");
    return;
  }
  
  try {
    const [user, expenses] = await Promise.all([
      getUserById(userId),
      getAllExpensesByUserId(userId),
    ]);

    setHeading(`${userName || user.name}'s Expenses`);
    

    const defaultDays = parseInt($("#statementSelect").val());

    $("#statementSelect").off("change");
    filterByDays(defaultDays, expenses, userId);

    $("#statementSelect").on("change", function () {
      const days = parseInt($(this).val());
      filterByDays(days, expenses, userId);
    });

   $("#addExpenseBtn").off("click").on("click", () => {
      window.location.href = `../expensesTracker/expensesTracker.html?userId=${userId}`;
    });

  } catch (err) {
    console.error("Error loading user expenses:", err);
    alert("Failed to load expenses");
  }
}

function filterByDays(days, expenses, userId) {
  clearTable();

  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - days);

  const filtered = expenses.filter((exp) => {
    let rawDate = exp.ExpenseDate;
    if (!rawDate) return false;
    if (typeof rawDate === "string" && rawDate.includes(" ")) {
      rawDate = rawDate.replace(" ", "T");
    }
    const date = new Date(rawDate);
    return !isNaN(date.getTime()) && date >= pastDate && date <= today;
  });

  renderExpenses(filtered, userId);
}


