$(document).ready(() => {
  const editUser = getEditUser();
  if (editUser) {
    prefillForm(editUser);
  }

  $("#addUserForm").on("submit", handleFormSubmit);
});

// getting editUser data from localStorage
function getEditUser() {
  return JSON.parse(localStorage.getItem("editUser"));
}

// prefilling form inputs when editing
function prefillForm(user) {
  $("#username").val(user.name);
  $("#phoneNumber").val(user.phone);
  $("#age").val(user.age);
  $("#email").val(user.email);
  $("#gender").val(user.gender);
  $("#address").val(user.address);
}

// validating phone and age inputs, return true if valid, else false
function validateInputs(phone, age) {
  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return false;
  }
  if (age < 18 || age > 100) {
    alert("Age must be between 18 and 100.");
    return false;
  }
  return true;
}

// getting user input data from form
function getFormData() {
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
function saveUser(editUser, newUser) {
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

// form submit handler
function handleFormSubmit(event) {
  event.preventDefault();

  const editUser = getEditUser();
  const formData = getFormData();

  if (!validateInputs(formData.phone, formData.age)) {
    return;
  }

  saveUser(editUser, formData);

  window.location.href = "../user_details/userDetail.html";
}
