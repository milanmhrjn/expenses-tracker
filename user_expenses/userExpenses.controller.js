import { clearTable, renderExpenses } from "./userExpenses.view.js";
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
  console.log("Filtered expenses:", filteredExpenses);
  renderExpenses(filteredExpenses, expenses);
}
