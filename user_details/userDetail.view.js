export const View = {
  // finding html element with id="list" where it will show the users
  listElement: $("#list"),

  // function that make a button with a class, icon, and what happens when clicked
  createButton(className, iconClass, clickHandler) {
    return $("<button></button>")         
      .addClass(className)                
      .html(`<i class="${iconClass}"></i>`) 
      .on("click", clickHandler); // when button is clicked it will run the clickHandler function and will run createButton function
  },

  // will show all users on the page, with buttons(add expenses, view expenses, update user, delete) for each user
  renderUsers(users, controller) {
    this.listElement.empty(); // will clear the list so it starts with new

    users.forEach(user => {
      const $li = $("<li></li>");              
      const $name = $("<span></span>").text(user.name);  
      const $buttons = $("<div></div>").addClass("buttons"); 

      
      const $addBtn = this.createButton("add-btn", "fa-solid fa-plus", controller.handleAdd);
      const $viewBtn = this.createButton("view-btn", "fa-regular fa-eye", () => controller.handleView(user));
      const $updateBtn = this.createButton("update-btn", "fa-regular fa-pen-to-square", () => controller.handleUpdate(user));
      const $deleteBtn = this.createButton("delete-btn", "fa-solid fa-trash", () => controller.handleDelete(user, $li));

      // adding all buttons inside the buttons div
      $buttons.append($addBtn, $viewBtn, $updateBtn, $deleteBtn);
      // adding the user's name and buttons inside the list item
      $li.append($name, $buttons);
      // adding the list item to the main list element on the page
      this.listElement.append($li);
    });
  }
};
