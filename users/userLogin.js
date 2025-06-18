import {userLoginHandle} from './userLogin.controller'
$(document).ready(function () {
  $("#loginForm").on("submit", userLoginHandle);
});

