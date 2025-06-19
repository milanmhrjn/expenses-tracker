// getting editUser data from localStorage
export function getEditUser() {
  return JSON.parse(localStorage.getItem("editUser"));
}


// getting user input data from form
export function getFormData() {
  return {
    name: $("#username").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    age: parseInt($("#age").val().trim(), 10),
    email: $("#email").val().trim(),
    gender: $("#gender").val(),
    address: $("#address").val().trim()
  };
}


// saving or update user in localStorage
export function saveUser(editUser, newUser) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (editUser) {
    const index = users.findIndex(u =>
      u.name === editUser.name &&
      u.phone === editUser.phone &&
      u.age === editUser.age &&
      u.email === editUser.email &&
      u.gender === editUser.gender &&
      u.address === editUser.address
    );

    if (index !== -1) {
      users[index] = newUser;
    }
    localStorage.removeItem("editUser");
  } else {
    users.push(newUser);
  }

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("userName", newUser.name);
}
