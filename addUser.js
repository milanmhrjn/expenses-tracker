
  document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the page from refreshing

    // Getting the value from the name input box
    var name = document.getElementById('username').value;
    var phone = document.getElementById('phoneNumber').value;
    var age = document.getElementById('age').value;

    //check if phone number is exactly 10 digits
    if(phone.length!==10){
      alert("Phone number must be exactly 10 digits");
      return;
    }

    //check if age is up to 100
    if (age < 18 || age > 100) {
    alert("Age must be between 18 and 100.");
    return;
  }

  // Get the old users list, or make a new one if it doesn't exist
  var users = JSON.parse(localStorage.getItem('users')) || [];

  // Add the new user to the list
  users.push({ name: name, phone: phone, age: age });

  // Save the updated users list back to localStorage
  localStorage.setItem('users', JSON.stringify(users));


    // Save the name in the browser (localStorage)
    localStorage.setItem('userName', name);

    // Go to the userDetail page
    window.location.href = 'userDetail.html';
  });