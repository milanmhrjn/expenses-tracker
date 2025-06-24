import * as Model from "./addUser.model.js";
import * as View from "./addUser.view.js";

//controller object that controls everything
export const Controller = {
  //starts the whole thing when page loads
  init() {
    const editUser = Model.getEditUser(); // checks if there is a user saved to edit from local storage
    if (editUser) { 
      View.prefillForm(editUser);
    }
    $("#addUserForm").on("submit", this.handleFormSubmit.bind(this));
  },

  handleFormSubmit(event) {
    event.preventDefault();

    const formData = Model.getFormData();
    if (!View.validateInputs(formData.phone, formData.age)) {
      return;
    }

    const editUser = Model.getEditUser();
    Model.saveUser(editUser, formData);

    window.location.href = "../user_details/userDetail.html";
  },
};
