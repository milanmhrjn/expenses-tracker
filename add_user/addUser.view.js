// prefilling form inputs when editing
export function prefillForm(user) {
  $("#username").val(user.name);
  $("#phoneNumber").val(user.phone);
  $("#age").val(user.age);
  $("#email").val(user.email);
  $("#gender").val(user.gender);
  $("#address").val(user.address);
}

// validating phone and age inputs, return true if valid, else false
export function validateInputs(phone, age) {
   if(phone<0){
    alert("Phone number must be positive number")
  }
  if (phone.length !== 10) {
    alert("Phone number must be exactly 10 digits");
    return false;
  }
  if (age < 18 || age > 100) {
    alert("Age must be between 18 and 100.");
    return false;
  }
  return true;
}
