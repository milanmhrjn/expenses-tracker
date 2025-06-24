const express = require('express');
const router = express.Router();
const db = require('../dbConfig');


router.get('/userDetails', async (req, res) => {
  try {
    
    const result = await db.query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

  router.post('/userDetails', async (req, res) => {
  const { name, email, phone, age, gender, address} = req.body;
  
const query = `
  INSERT INTO expensesTracker (UserId, Amount, Category, Description)
  VALUES (${userId}, ${amount}, '${category}', '${description}')
`;
  try {
    await db.query(
        `INSERT INTO Users (name, email, phone, age, gender, address) VALUES (@name, @email, @phone, @age, @gender, @address)`,
        { name, email, phone, age, gender, address }
    );
    res.status(201).send('User created successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/userDetails/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email,phone, age,gender, address } = req.body;
  try {
    await db.query(
      `UPDATE Users SET name = @name, email = @email, phone = @phone, age = @age, gender = @gender, address = @address WHERE id = @id`,
      { id, name, email, phone, age, gender, address}
    );
    res.send('User updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete('/userDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM Users WHERE id = @id`, { id });
    res.send('User deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
