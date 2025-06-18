import { getEditUser, getFormData } from "./addUser.models";
import {prefillForm,validateInputs,saveUser,handleFormSubmit} from './addUser.controller'

$(document).ready(() => {
  const editUser = getEditUser();
  if (editUser) {
    prefillForm(editUser);
  }
  $("#addUserForm").on("submit", handleFormSubmit);
});









