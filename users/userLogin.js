document.getElementById("loginForm").addEventListener('submit',function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if(userName === 'admin' && password === 'admin') {
    alert('Login successful!');
     window.location.href = '../user_details/userDetails.html';
  }
  else{
    alert("Invalid username or password.");
  }
})

