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
handleAddExpenses(user) {
  window.location.href = `../expensesTracker/expensesTracker.html?userId=${user.id}&userName=${encodeURIComponent(user.name)}`;
},

handleViewExpenses(user) {
  window.location.href = `../user_expenses/userExpenses.html?userId=${user.id}&userName=${encodeURIComponent(user.name)}`;
},


  handleUpdateUser(user) {
    window.location.href = `../add_user/addUser.html?id=${user.id}`;
  },

  async handleDeleteUser(user, listItem) {
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
