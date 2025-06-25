const dbConfig = require('../dbConfig');

export const getAllExpenses = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM expensesTracker');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export const createExpense = async (req, res) => {
  const { userId, amount, category, description } = req.body;

  try {
    const request = new sql.Request(); 
    request.input("UserId", sql.Int, userId);
    request.input("Amount", sql.Decimal(10, 2), amount); 
    request.input("Category", sql.VarChar(20), category);
    request.input("Description", sql.VarChar(255), description);
    if (!userId) {
      return res.status(400).send("userId is required");
    }
    await request.query(`
      INSERT INTO expensesTracker (UserId, Amount, Category, Description)
      VALUES (@UserId, @Amount, @Category, @Description)
    `);
    res.status(201).send("Expenses added successfully.");
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM expensesTracker WHERE id = @id`, { id });
    res.send('Expenses deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
}
