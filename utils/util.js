const pool = require('../config/database');

module.exports = {
  // Function to query the database
  query: async function(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res;
  },
  
  // ... add more utility functions as needed
};
