  export function populateForm(expense) {
    $("#category").val(expense.Category || expense.category);
    $("#description").val(expense.Description || expense.description);
    $("#amount").val(expense.Amount || expense.amount);
     if (expense.Category === "Others") {
    $("#miscField").show();
    $("#miscellaneous").val(expense.Miscellaneous || "");
  } else {
    $("#miscField").hide();
    $("#miscellaneous").val("");
  }
    $("#addExpense").text("Update Expense");
  }
