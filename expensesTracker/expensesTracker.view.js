// filling form with old data when editing
export function prefillForm(expense) {
  $("#category").val(expense.category);
  $("#description").val(expense.description);
  $("#amount").val(expense.amount);
  $("#date").val(expense.date);
}

