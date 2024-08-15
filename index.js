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
app.get('/users', (req, res) => {
    db.query('SELECT * FROM User', (err, result) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(400).send('Error fetching users');
            return;
        }
        res.status(200).send(result);
    });



})
app.post('/register', (req, res) => {
    const sql = 'INSERT INTO User (name, email, password,role) VALUES (?, ?, ?,?)';  
    bycrypt.hash(req.body.password.toString(),5,(err,hash)=>{
      if(err) return res.json("Error hashing password");
      const values = [req.body.name, req.body.email, hash,req.body.role];
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error executing query: ' + err.stack);
              res.status(400).send('Error registering user');
              return;
          }
          res.status(200).send('User registered successfully');
      });
    }
    )

});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

