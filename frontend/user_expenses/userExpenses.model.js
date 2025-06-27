// getting current user name
export function getUserName() {
  return localStorage.getItem("userName");
}

// getting all expenses
export function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}


