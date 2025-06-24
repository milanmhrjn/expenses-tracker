import {userLoginHandle} from "../users/userLogin.controller.js"
$(document).ready(function () {
  $("#loginForm").on("submit", userLoginHandle);
});

