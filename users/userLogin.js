
function userLoginHandle(event) {
  event.preventDefault();

  const userName = $("#username").val();
  const password = $("#password").val();

  if (userName === "admin" && password === "admin") {
    alert("Login successful!");
    window.location.href = "../user_details/userDetail.html";
  } else {
    alert("Invalid username or password.");
  }
}

$(document).ready(function () {
  $("#loginForm").on("submit", userLoginHandle);
});
