export async function userLogin(userName, password) {
  const res = await fetch("http://localhost:5000/userDetails/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName,
      password: password,
    }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }
  const data = await res.json();
  return data;
}
