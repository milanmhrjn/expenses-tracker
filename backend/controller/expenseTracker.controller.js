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
  const { amount, category, description, expenseDate, miscellaneous } = req.body; 

  let parsedDate = new Date(expenseDate);  
  if (!expenseDate || isNaN(parsedDate.getTime())) {   
    return res.status(400).send("Invalid or missing expenseDate.");
  }
    const expenseDateValue = parsedDate.toISOString();
    const miscValue = (category.toLowerCase() === "others" && miscellaneous && miscellaneous.trim() !== "")
    ? miscellaneous.trim()
    : null;
    
  try {
    await db.query(
      `INSERT INTO expensesTracker (UserId, Amount, Category, Description, ExpenseDate, Miscellaneous)
       VALUES (@UserId, @Amount, @Category, @Description, @ExpenseDate, @Miscellaneous)`,  
      {
        UserId: parseInt(userId),         
        Amount: amount,                   
        Category: category,               
        Description: description,          
        ExpenseDate: expenseDateValue  ,
        Miscellaneous: miscValue            
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
  const { userId, UserId, amount, category, description,miscellaneous } = req.body;

  const finalUserId = parseInt(userId || UserId);
  const dateModified = new Date(); 

  if (!finalUserId || isNaN(finalUserId)) {
    return res.status(400).send("Invalid or missing userId.");
  }
   const miscValue = (category && category.trim().toLowerCase() === "others" && miscellaneous)
    ? miscellaneous.trim()
    : null;

  try {
    const result = await db.query(
      `UPDATE expensesTracker
       SET UserId = @UserId,
           Amount = @Amount,
           Category = @Category,
           Description = @Description,
           DateModified = @DateModified, 
           Miscellaneous = @Miscellaneous
       WHERE Id = @Id`,
      {
        Id: parseInt(id),
        UserId: finalUserId,
        Amount: parseFloat(amount),
        Category: category,
        Description: description,
        DateModified: dateModified,
        Miscellaneous: miscValue
      }
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("No expense found with the given ID.");
    }

    res.send("Expense updated successfully.");
  } catch (err) {
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



