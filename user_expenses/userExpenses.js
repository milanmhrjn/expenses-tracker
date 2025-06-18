import{getUserName, getExpenses, filterByDays,renderExpenses,clearTable } from "userExpenses.model"
import{setHeading, addDeleteButtonFunctionality, addEditButtonFunctionality} from "userExpenses.controller"
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


