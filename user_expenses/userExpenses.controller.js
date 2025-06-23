import { clearTable, renderExpenses, setHeading} from "./userExpenses.view.js";
import {getUserName, getExpenses} from "./userExpenses.model.js"
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


export function userExpenses(){
    const userName = getUserName();
  const expenses = getExpenses();
  setHeading(userName);

  const defaultDays = parseInt($("#statementSelect").val());
  filterByDays(defaultDays, userName, expenses);

  $("#statementSelect").on("change", function () {
    const days = parseInt($(this).val());
    filterByDays(days, userName, expenses);
  });
}