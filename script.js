document.getElementById('addExpense').addEventListener('click', function() {
    //Getting the values user typed in the form
    var category = document.getElementById('category').value;
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var date = document.getElementById('date').value;

    //Getting the name of the user from local storage who is adding the expense 
    var userName = localStorage.getItem('userName');

    // making an object with all the info
    var expense = {
      user: userName,         
      category: category,     
      description: description, 
      amount: amount,        
      date: date           
    };

    //  Getting all old expenses, or starting a new list if none
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Adding new expense to the list
    expenses.push(expense);

    // Saving the new list back to the browser
    localStorage.setItem('expenses', JSON.stringify(expenses));

    alert("Expense added!");

    //Redirecting to the user detail page
    window.location.href = 'userDetail.html';
  });