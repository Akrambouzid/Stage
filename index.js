import express from 'express';
import bodyParser from 'body-parser'
import mysql from 'mysql'
const app = express();
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

const PORT = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
})
app.post('/users', (req, res) => {
    const role = '1';
    const password = 'staticpassword';
    const username = 'staticuser';
    const email = 'staticuser@example.com';
    
    db.query(
        'INSERT INTO User (role, password, username, email) VALUES (?, ?, ?, ?)',
        [role, password, username, email],
        (err, result) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(400).send('Error creating user');
                return;
            }
            res.status(201).send('User created successfully');
        }
    );  
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

