   const sql = require('mssql');
   require('dotenv').config();

   const config = {
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       server: process.env.DB_SERVER,
       database: process.env.DB_NAME,
       options: {
           trustServerCertificate: true,
           encrypt: false
       }
   };

   const pool = new sql.ConnectionPool(config);
   const poolConnect = pool.connect();
   const poolPromise = sql.connect(config);

   async function query(queryText, params = {}) {
       await poolConnect;
       const request = pool.request();

       for (const key in params) {
           request.input(key, params[key]);
       }

       return request.query(queryText);
   }

   module.exports = { query ,poolPromise};
   