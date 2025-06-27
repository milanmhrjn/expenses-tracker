const db = require('../dbConfig');

const getExpensesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM expensesTracker WHERE userId = @userId',
      { userId: parseInt(userId) }
    );
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const deleteExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM expensesTracker WHERE Id = @Id`, { id });
    res.send('Expenses deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.params; 
  const { amount, category, description, date } = req.body;

  let parsedDate = new Date(date);
  if (!date || isNaN(parsedDate.getTime())) {
    return res.status(400).send("Invalid or missing date.");
  }

  try {
    await db.query(
      `INSERT INTO expensesTracker (UserId, Amount, Category, Description, Date)
       VALUES (@UserId, @Amount, @Category, @Description, @Date)`,
      {
        UserId: parseInt(userId),         
        Amount: amount,                   
        Category: category,               
        Description: description,          
        Date: parsedDate                 
      }
    );
    res.status(201).json({ message: "Expense added successfully." });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send(err.message);
  }
};


const updateExpenseById = async (req, res) => {
  const { id } = req.params;
  const { userId, amount, category, description, date } = req.body;

  const parsedDate = new Date(date);
  if (!date || isNaN(parsedDate.getTime())) {
    return res.status(400).send("Invalid or missing date.");
  }

  console.log(" Updating expense:", {
    Id: id,
    UserId: userId,
    Amount: amount,
    Category: category,
    Description: description,
    Date: parsedDate
  });

  try {
    const result = await db.query(
      `UPDATE expensesTracker
       SET UserId = @UserId,
           Amount = @Amount,
           Category = @Category,
           Description = @Description,
           Date = @Date
       WHERE Id = @Id`,
      {
        Id: parseInt(id),
        UserId: parseInt(userId),
        Amount: parseFloat(amount),
        Category: category,
        Description: description,
        Date: parsedDate
      }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("No expense found with the given ID.");
    }

    res.send("Expense updated successfully.");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send(err.message);
  }
};


const getAllExpenses = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM expensesTracker`);
    res.json(result.recordset); 
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM expensesTracker WHERE Id = @id`,
      { id: parseInt(id) }
    );
    if (result.recordset.length === 0) {
      return res.status(404).send("Expense not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



module.exports = {
   deleteExpenseById, createExpense, updateExpenseById, getAllExpenses, getExpensesByUserId, getExpenseById
};



