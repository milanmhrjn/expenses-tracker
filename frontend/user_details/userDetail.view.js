export const View = {
  listElement: $("#list"),
  
  createButton(className, iconClass, clickHandler) {
    return $("<button></button>")         
      .addClass(className)                
      .html(`<i class="${iconClass}"></i>`) 
      .on("click", clickHandler);
  },

  renderUsers(users, controller) {
    this.listElement.empty(); 
    users.forEach(user => {
      const $li = $("<li></li>");              
      const $name = $("<span></span>").text(user.name);  
      const $buttons = $("<div></div>").addClass("buttons"); 
      const $addBtn = this.createButton("add-btn", "fa-solid fa-plus",() => { localStorage.removeItem("editExpense"); localStorage.setItem("userId", user.id); controller.handleAddExpenses(user); });
      const $viewBtn = this.createButton("view-btn", "fa-regular fa-eye", () => controller.handleViewExpenses(user));
      const $updateBtn = this.createButton("update-btn", "fa-regular fa-pen-to-square", () => controller.handleUpdateUser(user));
      const $deleteBtn = this.createButton("delete-btn", "fa-solid fa-trash", () => controller.handleDeleteUser(user, $li));
      $buttons.append($addBtn, $viewBtn, $updateBtn, $deleteBtn);
      $li.append($name, $buttons);
      this.listElement.append($li);
    });
  }
};
export function clearTable() { /* clears #expensesTable tbody */ }
export function renderExpenses(expenses) { /* loops and appends rows */ }
export function setHeading(text) { $("#userHeading").text(text); }
