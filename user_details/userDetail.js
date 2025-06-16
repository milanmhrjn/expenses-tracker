const users = JSON.parse(localStorage.getItem('users')) || [];
const list = document.getElementById("list");

users.forEach(function(user) {
  // Creating list item from li tag
  const li = document.createElement("li");
  list.appendChild(li);

  // User name on left
  const name = document.createElement("span");
  name.innerText = user.name;

  // Buttons container on right
  const buttons = document.createElement("div");
  buttons.className = "buttons";

  // Add Expenses button
  const addExpensesBtn = document.createElement("button");
  addExpensesBtn.className = "add-btn";
  addExpensesBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  addExpensesBtn.addEventListener("click",function() {
    window.location.href = "index.html";
  });

  // View button
  const viewBtn = document.createElement("button");
  viewBtn.className = "view-btn";
  viewBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
  viewBtn.addEventListener("click", function() {
  localStorage.setItem('userName', user.name); // Save the selected user's name
  window.location.href = "userExpenses.html";
});

  // Update button
  const updateBtn = document.createElement("button");
  updateBtn.className = "update-btn";
  updateBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  updateBtn.addEventListener("click", function () {
  localStorage.setItem("editUser", JSON.stringify(user));
  window.location.href = "addUser.html";
});


  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML='<i class="fa-solid fa-trash"></i>';

  // Adding event listener to delete user
  deleteBtn.addEventListener("click", function() {
  // Finding all users
  let findUser = JSON.parse(localStorage.getItem('users')) || [];
  // Removing the user with the matching name
  deleteUser = findUser.filter(u => u.name !== user.name);
  // Saving the updated list back to localStorage
  localStorage.setItem('users', JSON.stringify(deleteUser));
  // Removing the user from the page
  li.remove();
});

  // Adding  buttons to container
  buttons.appendChild(addExpensesBtn);
  buttons.appendChild(viewBtn);
  buttons.appendChild(updateBtn);
  buttons.appendChild(deleteBtn);

  // Adding name and buttons to li
  li.appendChild(name);
  li.appendChild(buttons);

  // Adding li to list
  list.appendChild(li);
});
