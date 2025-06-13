

// Check if editing a user and pre-fill the form
const editUser = JSON.parse(localStorage.getItem("editUser"));
if (editUser) {
  document.getElementById("username").value = editUser.name;
  document.getElementById("phoneNumber").value = editUser.phone;
  document.getElementById("age").value = editUser.age;
}

// Form submit logic
document.getElementById('addUserForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('username').value;
  var phone = document.getElementById('phoneNumber').value;
  var age = document.getElementById('age').value;

  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return;
  }

  if (age < 18 || age > 100) {
    alert("Age must be between 18 and 100.");
    return;
  }

  var users = JSON.parse(localStorage.getItem('users')) || [];

  if (editUser) {
    // Editing existing user
    const index = users.findIndex(u => 
      u.name === editUser.name &&
      u.phone === editUser.phone &&
      u.age === editUser.age
    );
    if (index !== -1) {
      users[index] = { name, phone, age };
    }
    localStorage.removeItem("editUser");
  } else {
    // Adding new user
    users.push({ name, phone, age });
  }

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('userName', name);
  window.location.href = 'userDetail.html';
});
