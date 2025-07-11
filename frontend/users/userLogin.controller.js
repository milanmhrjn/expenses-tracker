import{userLogin} from "./userLogin.model.js";

export async function userLoginHandle(event) {
  event.preventDefault();
  const userName = $("#username").val().trim();
  const password = $("#password").val().trim();
  try {
    const user = await userLogin(userName, password);
    alert("Login successful");
    if(user.role=="admin"){
      window.location.href = `../user_details/userDetail.html`;
    }
    else{
      window.location.href = `../user_expenses/userExpenses.html?userId=${user.id}&userName=${encodeURIComponent(user.name)}&role=${user.role}`;
    }
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}
