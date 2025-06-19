import { getUserName, getExpenses } from "./userExpenses.model.js";
import { setHeading } from "./userExpenses.view.js";
import { filterByDays } from "./userExpenses.controller.js";
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
