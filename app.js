const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new sqlite3.Database('users.db');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT,
        dob DATE,
        address TEXT,
        state TEXT
    )
`);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', (req, res) => {
    const { username, email, password, dob, address, state } = req.body;

    db.run(
        'INSERT INTO users (username, email, password, dob, address, state) VALUES (?, ?, ?, ?, ?, ?)',
        [username, email, password, dob, address, state],
        (err) => {
            if (err) {
                res.status(500).send('Error registering user.');
            } else {
                res.send('Registration successful!');
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
