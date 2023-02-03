const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const e = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};

const connection = mysql.createConnection(mysqlConfig);

app.get('/attendees', (req,res) => { 
    const { userId } = req.query;   
    connection.execute('SELECT * FROM attendees WHERE userId=?', [userId], (err, attendees) => {
        res.send(attendees);
    });
});

app.post('/attendees', (req, res) => {  
    const { name, surname, email, telephone, userId } = req.body;

    connection.execute(
        'INSERT INTO attendees (name, surname, email, telephone, userId) VALUES (?, ?, ?, ?, ?)',
        [name, surname, email, telephone, userId],
        (err, result) => {
            connection.execute('SELECT * FROM attendees WHERE userID=?',
            [userId],
            (err, attendees) => {
                res.send(attendees);
            })
        }
    )
});

app.post('/register', (req,res) => {  // prisiregistruoja naujas useris
    const { userName, userSurname, userEmail, userPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(userPassword, 12);

    connection.execute(
        'INSERT INTO users (userName, userSurname, userEmail, userPassword) VALUES (?, ?, ? ,?)',
        [userName, userSurname, userEmail, hashedPassword],
        (err, result) => {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.sendStatus(400);
                }
            }
    )
});

app.post('/login', (req, res) => {
    const { userEmail, userPassword } = req.body;
    
    connection.execute(
        'SELECT * FROM users WHERE userEmail=?',
        [userEmail],
        (err, result) => {
            if (result.length === 0) {
                res.sendStatus(401);
            } else {
                const passwordHash = result[0].userPassword
                const isPasswordCorrect = bcrypt.compareSync(userPassword, passwordHash);
                if (isPasswordCorrect) {
                    res.send(result[0]);
                } else {
                    res.sendStatus(401);
                }
            }  
        }
    );
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));