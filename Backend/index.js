import express from'express';
import path from'path';
import mysql from'mysql';
import cors from'cors';
import { fileURLToPath } from'url';
import { dirname } from'path';

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); 
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'projet'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

// API route to handle signup
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert user into the database
    const query = 'INSERT INTO user (email, username, password,role) VALUES (?, ?, ?,?)';
    db.query(query, [email, username, password,1], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
