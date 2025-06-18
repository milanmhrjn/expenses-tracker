export function createAddButton() {
  const $btn = $("<button></button>")
    .addClass("add-btn")
    .html('<i class="fa-solid fa-plus"></i>')
    .on("click", function () {
      localStorage.removeItem("editExpense");
      window.location.href = "../expensesTracker/index.html";
    });
  return $btn;
}

export function createViewButton(user) {
  const $btn = $("<button></button>")
    .addClass("view-btn")
    .html('<i class="fa-regular fa-eye"></i>')
    .on("click", function () {
      localStorage.setItem("userName", user.name);
      window.location.href = "../user_expenses/userExpenses.html";
    });
  return $btn;
}

export function createUpdateButton(user) {
  const $btn = $("<button></button>")
    .addClass("update-btn")
    .html('<i class="fa-regular fa-pen-to-square"></i>')
    .on("click", function () {
      localStorage.setItem("editUser", JSON.stringify(user));
      window.location.href = "../add_user/addUser.html";
    });
  return $btn;
}

export function createDeleteButton(user, $li) {
  const $btn = $("<button></button>")
    .addClass("delete-btn")
    .html('<i class="fa-solid fa-trash"></i>')
    .on("click", function () {
      let findUser = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = findUser.filter((u) => u.name !== user.name);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      $li.remove();
    });
  return $btn;
}
