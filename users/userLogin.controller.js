export function userLoginHandle(event) {
  event.preventDefault();

  const userName = $("#username").val().trim();
  const password = $("#password").val().trim();

  if (userName === "admin" && password === "admin") {
    alert("Login successful!");
    window.location.href = "../user_details/userDetail.html";
  } else {
    alert("Invalid username or password.");
  }
}
