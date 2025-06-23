// getting editUser data from localStorage
export function getEditUser() {
  return JSON.parse(localStorage.getItem("editUser"));
}


export function getFormData() {
  const formData = {
    name: $("#username").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    age: parseInt($("#age").val().trim()),
    email: $("#email").val().trim(),
    gender: $("#gender").val(),
    address: $("#address").val().trim()
  };
  //retrieving user object from local storage
  const editUser = getEditUser();
  //storing new id in formData, after that it checks if form has prefilled data and has an id if not it creates and random special id
  formData.id = editUser?.id || crypto.randomUUID();

  return formData;
}

// saving or update user in localStorage
export function saveUser(editUser, newUser) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (editUser) {

    const index = users.findIndex(u => u.id === editUser.id); 
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
