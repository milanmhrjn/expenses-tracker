import{createAddButton,createViewButton,createUpdateButton,createDeleteButton} from './userDetail.controller'
$(document).ready(function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const $list = $("#list");

  users.forEach(function (user) {
    const $li = $("<li></li>");
    const $name = $("<span></span>").text(user.name);
    const $buttons = $("<div></div>").addClass("buttons");

    // calling the functions to get buttons
    const $addBtn = createAddButton();
    const $viewBtn = createViewButton(user);
    const $updateBtn = createUpdateButton(user);
    const $deleteBtn = createDeleteButton(user, $li);

    // appending
    $buttons.append($addBtn, $viewBtn, $updateBtn, $deleteBtn);
    $li.append($name, $buttons);
    $list.append($li);
  });
});
