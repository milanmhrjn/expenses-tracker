export const Model = {
  //getting all the list of users from storage
  getUsers() {
    return JSON.parse(localStorage.getItem("users")) || []; //will look in local storage for users, if nothing is found it will return empty list
  },

  //will save a list of users to storage
  saveUsers(users) {
    // will turn the list of users into a string and save it with the name "users"
    localStorage.setItem("users", JSON.stringify(users));
  },

  // will delete  a user by their name
  deleteUser(userName) {
    // will get all users from storage first
    const users = this.getUsers();
    // will make a new list without the user who has the given name
    const filteredUsers = users.filter(u => u.name !== userName);
    // will save the new list back into storage
    this.saveUsers(filteredUsers);
  }
};
