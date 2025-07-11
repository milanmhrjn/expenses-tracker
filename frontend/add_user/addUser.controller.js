import * as Model from "./addUser.model.js";
import * as View from "./addUser.view.js";

export const Controller = {
  async init() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (userId) {
      try {
        const editUser = await Model.fetchUserById(userId);
        this.editUser = editUser;
        View.prefillForm(editUser);
      } catch (err) {
        console.error("Failed to fetch user for editing:", err);
      }
    }

    $("#addUserForm").on("submit", this.handleFormSubmit.bind(this));
  },

  async handleFormSubmit(event) {
    event.preventDefault();
    const formData = Model.getFormData();
    if (!View.validateInputs(formData.phone, formData.age)) {
      return;
    }
    try {
      await Model.saveUser(this.editUser, formData);
      window.location.href = "../user_details/userDetail.html";
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Error saving user.");
    }
  },
};
