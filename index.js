const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const multer = require('multer')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'K@du1904',
    database: 'nodejstask'
})
connection.connect(function(error) {
    if (!!error)
        console.log(error);
    else
        console.log("database connected!");
});
//setting up the view engine
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/') // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

app.get('/', (req, res) => {
    let sql = "SELECT * FROM psychiatrist"
    const userId = req.params.id;
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        let count = "";
        res.render('home', {
            users: rows
        })
    });
});

//count of patient under single psychiatrist
app.get('/countPatient/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql2 = `select count (*) AS cp from patients where psy=${userId}`;
    let query = connection.query(sql2, (err, rows) => {
        if (err) throw err;
        //uncomment this part to see result inside postman
        // res.send(rows)
        res.render('count', {
            count: rows[0].cp,
        })
    });
});


app.get('/getPsy/:userId', (req, res) => {

    const userId = req.params.userId;
    let sql2 = `select HospitalName, FirstName,LastName from psychiatrist where id=${userId}`;
    let query = connection.query(sql2, (err, rows) => {
        if (err) throw err;
        //uncomment this part to see result inside postman
        // res.send(rows)
        res.render('psy', {
            user: rows,

        })
    });
});


//adding psychiatrist
app.get('/save', (req, res) => {
    res.render('psychiatristAdd', {});
});

//sends user to add patient form and retrives name and id of psychiatrist under which patient is going to be added
app.get('/addPatient/:userId', (req, res) => {

    const userId = req.params.userId;
    let sql = `select FirstName,id from psychiatrist where id=${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        //uncomment this part to see result inside postman
        // res.send(result);
        res.render('patientAdd', {
            user: result[0]
        });
    });
});

// fetching all patients for single psychiatrist
app.get('/viewPatients/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `select Name,Address,Email,Phone from patients where psy=${userId}`;
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        //uncomment this part to see result inside postman
        // res.send(rows);
        res.render('patientList', {
            patients: rows,
            cp: rows.length,
            count: rows
        });
    });
});


//adding psychiatrist
app.post('/save', (req, res) => {
    let data = { FirstName: req.body.FirstName, LastName: req.body.LastName, HospitalName: req.body.HospitalName, Pincode: req.body.Pincode, State: req.body.State, PhoneNumber: req.body.PhoneNumber };
    let sql = "INSERT INTO psychiatrist SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        console.log(results)
        res.send("inserted ");
    });
});
//saving patient details
app.post('/savePatient', upload.single('image'), (req, res) => {
    const userId = req.body.id;
    if (!req.file) {
        console.log("No file upload");
    } else {
        var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
        let sql = "insert into patients SET psy='" + userId + "', Name='" + req.body.Name + "',  Address='" + req.body.Address + "' , Email='" + req.body.Email + "', Phone='" + req.body.Phone + "', Password='" + req.body.Password + "', Photo='" + imgsrc + "'";
        let query2 = connection.query(sql, (err, results) => {
            if (err) throw err;
            res.redirect('/');
        });
    }

});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});