import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 5000;

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

app.use(bodyParser.json());
app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).send('Error fetching users');
            return;
        }
        res.status(200).send(result);
    });
});

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).send('Error fetching users');
            return;
        }
        res.status(200).send(result);
    });
});

app.post('/signup', (req, res) => {  // changed to lowercase to avoid case sensitivity issues
  console.log('Request Body:', req.body);
  
  // Validate request body
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields (name, email, password, role) are required' });
  }

  const sql = 'INSERT INTO User (name, email, password, role) VALUES (?, ?, ?, ?)';  
  bcrypt.hash(password.toString(), 5, (err, hash) => {
      if (err) return res.status(500).json("Error hashing password");
      
      const values = [name, email, hash, role];
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error executing query: ' + err.stack);
              return res.status(500).send('Error registering user');
          }
          res.status(200).send('User registered successfully');
      });
  });
});



app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
