import express from'express';
import path from'path';
import mysql from'mysql';
import cors from'cors';
import { fileURLToPath } from'url';
import { dirname } from'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json()); 
app.use(cors());
app.use(session({
    secret : 'secret',
    resave : false,
    saveUninitialized : false,
    cookie : {maxAge : 1000*60*60*24}

}));



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
    console.log('Request to /register');
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

app.post('/login', (req, res) => {
    console.log('Request to /login');
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists in the database
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ message: 'Error signing in' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.user = user;
        res.status(200).json({ message: 'User signed in successfully' });
        console.log(req.session.user);
    });
});


app.post('/ajoutevent',(req,res)=>{
    const {titre,description,date,lieu,prix,nombrePlace,placeReservee,numTel,lien} = req.body;
    lien = "aaaa";

   if(!titre||!description||!date||!lien||!lieu||!prix||!nombrePlace||!placeReservee||!numTel){
       return res.status(400).json({message:'All fields are required'});
   }
   const query = 'INSERT INTO event (titre,description,date,lieu,prix,nombrePlace,placeReservee,numTel,lien) VALUES (?,?,?,?,?,?,?,?,?)';
    db.query(query,[titre,description,date,lieu,prix,nombrePlace,placeReservee,numTel,lien],(err,res)=>{
         if(err){
              console.error('Error inserting event:',err);
              return res.status(500).json({message:'Error adding event'});
         }
         res.status(201).json({message:'Event added successfully'});
    });

})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
   
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
