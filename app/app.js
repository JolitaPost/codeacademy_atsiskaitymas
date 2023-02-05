const cors = require ('cors');
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

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

const getUserFromToken = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return user;
}

const verifyToken = (req, res, next) => {
    try {
        getUserFromToken(req);
        next();
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
}

app.get('/attendees', verifyToken, (req,res) => { 
    const user = getUserFromToken(req);   

    connection.execute('SELECT * FROM attendees WHERE userId=?', [user.id], (err, attendees) => {
        res.send(attendees);
    });
});


app.post('/attendees', verifyToken, (req, res) => {  
    const { name, surname, email, telephone, timestamp } = req.body;
    const { id } = getUserFromToken(req);

    const sqlQuery = timestamp ?
    'INSERT INTO attendees (name, surname, email, telephone, timestamp, userId) VALUES (?, ?, ?, ?, ?, ?)':
    'INSERT INTO attendees (name, surname, email, telephone, userId) VALUES (?, ?, ?, ?, ?, ?)';

    const data = [name, surname, email, telephone, id];
    if (timestamp) {
        data.push(timestamp);
    }

    connection.execute(
        sqlQuery,
        data,
        () => {
            connection.execute(
                'SELECT * FROM attendees WHERE userId=?',
                [id],
                (err, attendees) => {
                    res.send(attendees);
                }
            )
        }
    )
});

app.delete('/attendees/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { id: userId } = getUserFromToken(req);

    connection.execute(
        'DELETE FROM attendees WHERE id=? AND userId=?',
        [id, userId],
        () => {
            connection.execute(
                'SELECT * FROM attendees WHERE userId=?',
                [userId],
                (err, attendees) => {
                    res.send(attendees);
                }
            )
        }
    )
});

app.post('/register', (req,res) => { 
    const { userName, userSurname, userEmail, userPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(userPassword, 12);

    connection.execute(
        'INSERT INTO users (userName, userSurname, userEmail, userPassword) VALUES (?, ?, ? ,?)',
        [userName, userSurname, userEmail, hashedPassword],
        (err, result) => {
            if (err?.code === 'ER_DUP_ENTRY') {
                res.sendStatus(400);
            }

            res.send(result);
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
                const userPasswordHash = result[0].userPassword
                const isPasswordCorrect = bcrypt.compareSync(userPassword, userPasswordHash);
                if (isPasswordCorrect) {
                    const { id, userEmail } = result[0];
                    const token = jwt.sign({ id, userEmail }, process.env.JWT_SECRET_KEY);
                    res.send({ token, id, userEmail });
                } else {
                    res.sendStatus(401);
                }
            }  
        }
    );
});

app.get('/token/verify', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.send(user);
    } catch(e) {
        res.send({ error: 'Invalid Token' });
    }
});

app.get('/test/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();

        connection.execute('INSERT INTO test(title) VALUES (?)', [data.title], (err, result) => {
            res.send(data);
        });
    } catch(e) {
        res.send('Something went wrong');
    }
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));