const mysql = require('mysql');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

class DB{
    Read(table){
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM '+ table, (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
                }
            );

        });
        
    }
}

module.exports=DB;