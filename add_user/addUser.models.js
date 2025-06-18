// getting editUser data from localStorage
export function getEditUser() {
  return JSON.parse(localStorage.getItem("editUser"));
}


// getting user input data from form
export function getFormData() {
  return {
    name: $("#username").val().trim(),
    phone: $("#phoneNumber").val().trim(),
    age: parseInt($("#age").val().trim(), 10),
    email: $("#email").val().trim(),
    gender: $("#gender").val(),
    address: $("#address").val().trim()
  };
}
