export function getFormData() {
  let category = $("#category").val();
  const description = $("#description").val()?.trim();
  const amount = $("#amount").val();
  const rawDate = $("#date").val();
  let miscellaneous = null;

  if (category === "Others") {
    const misc = $("#miscellaneous").val();
    if (misc && misc.trim()) {
      miscellaneous = misc.trim();
    }
  }

  let formattedDate = null;
  if (rawDate) {
    formattedDate = rawDate.length === 16 ? `${rawDate}:00` : rawDate;
  }

  return {
    category,
    description,
    amount,
    expenseDate: formattedDate,
    miscellaneous,
  };
}

export async function getUserById(userId) {
  const res = await fetch(`http://localhost:5000/userDetails/${userId}`);
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getAllExpensesByUserId(userId) {
  try {
    const response = await fetch(
      `http://localhost:5000/expensesTracker/user/${userId}`
    );
    if (!response.ok) throw new Error("Failed to fetch expenses");
    return await response.json();
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return [];
  }
}

export async function addNewExpense(formData) {
  const response = await fetch(`http://localhost:5000/expensesTracker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
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

export async function updateExpenseById(id, updatedData) {
  const res = await fetch(`http://localhost:5000/expensesTracker/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error("Failed to update expense");
  }

  return text;
}
