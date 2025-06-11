function addUsers(){

  //getting user input values
  var fullName = document.getElementById("username").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var age = document.getElementById("age").value;

  if(fullName==""||phoneNumber==""||age==""){
    alert("Please complete the form")
  }
  
}