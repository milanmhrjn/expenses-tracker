const db = require("../dbConfig");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Users");
    res.json(result.recordset); 
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.createUsers = async (req, res) => {
    console.log("Request body:", req.body);
  const { name, email, phone, age, gender, address } = req.body;
  try {
    await db.query(
      `INSERT INTO Users (name, email, phone, age, gender, address) VALUES (@name, @email, @phone, @age, @gender, @address)`,
      { name, email, phone, age, gender, address }
    );
    res.status(201).send("User created successfully.");
  } catch (err) {
     console.error("DB Error:", err); 
    res.status(500).send(err.message);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM Users WHERE id = @id", { id });
    if (result.recordset.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


exports.updateUser = async (req, res) => {
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
}



exports.deleteUser= async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM Users WHERE id = @id`, { id });
    res.send('User deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
}