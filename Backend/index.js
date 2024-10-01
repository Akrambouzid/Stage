import express from 'express';
import path from 'path';
import mysql from 'mysql';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: '192.168.14.127',
    port: '3306',
    user: 'oussama',
    password: 'oussama',
    database: 'projet'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ' + db.threadId);
});

app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO user (email, username, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [email, username, password, 1], (err, results) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying user:', err);
            return res.status(500).json({ message: 'Error signing in' });
        }

        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.session.user = results[0];
        return res.status(200).json({ message: 'User signed in successfully', user: req.session.user });
    });
});

app.post('/ajoutevent', upload.single('image'), (req, res) => {
    const { titre, description, date, lieu, prix, nombrePlace, numTel, lien } = req.body;
    const image = req.file ? req.file.filename : null;

    console.log('File upload details:', req.file);  // Log file upload info
    console.log('Upload directory:', uploadDir);  // Log the path to uploads folder

    if (!titre || !description || !date || !lieu || !prix || !nombrePlace || !numTel) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!image) {
        return res.status(400).json({ message: 'Image is required' });
    }

    const query = 'INSERT INTO event (titre, description, date, lieu, prix, nombrePlace, placeReservee, numTel, lien, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [titre, description, date, lieu, prix, nombrePlace, 0, numTel, lien, image], (err, result) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).json({ message: 'Error adding event', error: err.message });
        }
        return res.status(201).json({ message: 'Event added successfully' });
    });
});



app.get('/affevent', (req, res) => {
    const query = 'SELECT * FROM event';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error querying events:', err);
            return res.status(500).json({ message: 'Error getting events' });
        }
        res.status(200).json(results);
    });
});

app.get('/affevent/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM event WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error querying event:', err);
            return res.status(500).json({ message: 'Error getting event' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(results[0]);
    });
});

// Serve static files from the frontend build directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
