export function getEditExpense() {
  return JSON.parse(localStorage.getItem("editExpense"));
}

export function getFormData() {
  const category = document.querySelector("#category").value;
  const description = document.querySelector("#description").value;
  const amount = document.querySelector("#amount").value;
  const rawDate = document.querySelector("#date").value; 

  let formattedDate = null;

  if (rawDate) {
    formattedDate = rawDate.length === 16 ? `${rawDate}:00` : rawDate;
  }
  return { category, description, amount, date: formattedDate };
}

export async function getUserById(userId) {
  const res = await fetch(`http://localhost:5000/userDetails/${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}


export async function getAllExpensesByUserId(userId) {
  const res = await fetch(`http://localhost:5000/expensesTracker/user/${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}


export async function addNewExpense(formData) {
  const userId = localStorage.getItem("userId");
  const response = await fetch(
    `http://localhost:5000/expensesTracker/user/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) {
    const errorText = await response.text(); 
    throw new Error(errorText);              
  }
  return await response.json();
}



export async function deleteExpenseById(id) {
  const res = await fetch(`http://localhost:5000/expensesTracker/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete expense");
  return await res.text(); 
}



export async function getExpenseById(id) {
  const res = await fetch(`http://localhost:5000/expensesTracker/${id}`);
  if (!res.ok) throw new Error("Failed to fetch expense");
  return await res.json();
}

export function populateForm(expense) {
  $("#category").val(expense.Category || expense.category);
  $("#description").val(expense.Description || expense.description);
  $("#amount").val(expense.Amount || expense.amount);
  const date = expense.Date || expense.date;
  if (date) {
    const local = new Date(date).toISOString().slice(0, 16); // ✅ "yyyy-MM-ddThh:mm"
    $("#date").val(local);
  }
  $("#addExpense").text("Update Expense");
}



export async function updateExpenseById(id, updatedData) {
  const res = await fetch(`http://localhost:5000/expensesTracker/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Failed to update expense");
  return await res.text();
}



export function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
