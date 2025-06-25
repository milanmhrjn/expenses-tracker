export function getFormData() {
  return {
    name: $("#username").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    age: parseInt($("#age").val().trim()),
    email: $("#email").val().trim(),
    gender: $("#gender").val(),
    address: $("#address").val().trim()
  };
}

export async function saveUser(editUser, newUser) {
  const url = editUser
    ? `http://localhost:5000/userDetails/${editUser.id}`
    : "http://localhost:5000/userDetails";

  const method = editUser ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  if (!res.ok) {
    throw new Error("Failed to save user");
  }
}

export async function fetchUserById(id) {
  const res = await fetch(`http://localhost:5000/userDetails/${id}`);
  if (!res.ok) throw new Error("User fetch failed");
  return await res.json();
}