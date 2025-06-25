export const Model = {
   async getUsers() {
    const res = await fetch('http://localhost:5000/userDetails');
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  },

  async addUser(user) {
    const res = await fetch('http://localhost:5000/userDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error('Failed to add user');
    return await res.text();
  },

   async deleteUser(id) {
    const res = await fetch(`http://localhost:5000/userDetails/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete user');
    return await res.text();
  },

  
  async updateUser(userId, updatedUser) {
    const res = await fetch(`http://localhost:5000/userDetails/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });
    if (!res.ok) throw new Error('Failed to update user');
    return await res.text();
  }
};
