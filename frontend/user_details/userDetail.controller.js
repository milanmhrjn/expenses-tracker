import { Model } from "./userDetail.model.js";
import { View } from "./userDetail.view.js";

// controller object that controls everything
export const Controller = {
  //this function starts everything when page is load
  init() {
    const users = Model.getUsers();        // getting all users from localStorage using the Model
    View.renderUsers(users, this);         // telling the View to show all users and give it access to controller functions
  },

  // handling add button when it is clicked
  handleAdd() {
    localStorage.removeItem("editExpense"); // clearing old editExpense data
    window.location.href = "../expensesTracker/expensesTracker.html"; // redirecting to the expense adding page
  },

  // handling view button when it is clicked
  handleView(user) {
    localStorage.setItem("userName", user.name); // saving the user's name to localStorage
    window.location.href = "../user_expenses/userExpenses.html"; // redirecting to the user's expenses page
  },

  // handling update button when it is clicked
  handleUpdate(user) {
    localStorage.setItem("editUser", JSON.stringify(user)); // saving the user object in localStorage
    window.location.href = "../add_user/addUser.html"; // redirecting to the add user form
  },

  // handling delete button when it is clicked
  handleDelete(user, $li) {
    Model.deleteUser(user.name); // using the Model to delete this user from localStorage
    $li.remove();                // removing the user from the page
  }
};
