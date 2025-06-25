import { Model } from "./userDetail.model.js";
import { View } from "./userDetail.view.js";

export const Controller = {
  async init() {
    try {
      const users = await Model.getUsers(); 
      View.renderUsers(users, this); 
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  },
  handleAdd() {
    localStorage.removeItem("editExpense");
    window.location.href = "../expensesTracker/expensesTracker.html";
  },

  handleView(user) {
    localStorage.setItem("userName", user.name);
    window.location.href = "../user_expenses/userExpenses.html";
  },
  handleUpdate(user) {
    window.location.href = `../add_user/addUser.html?id=${user.id}`;
  },
  async handleDelete(user, listItem) {
    if (user.name) {
      try {
        await Model.deleteUser(user.id);
        listItem.remove();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  },
};
