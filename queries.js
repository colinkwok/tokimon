const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'tokimon',
  password: '123',
  port: 5432,
})
const getTokimon = (request, response) => {
    pool.query('SELECT * FROM Tokimon', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
module.exports = {
    getTokimon
  }