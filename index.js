const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
var app = express();


var mysqlConnection = require('./database');

//Configuring express server
app.use(cors());
app.use(bodyparser.json());

    
var pool = mysqlConnection.getPool(); // re-uses existing if already created or creates new one


    pool.getConnection((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });

        //Establish the server connection


        app.get("/", (req, res) => {
            res.json({ message: "Welcome" });
          });


//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));



//Creating GET Router to fetch all the employee details from the MySQL Database
app.get('/employee' , (req, res) => {
    pool.query('SELECT * FROM employee.employees', (err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
    } );


    //Router to GET specific employee detail by id from the MySQL database
     app.get('/employee/:id' , (req, res) => {
    pool.query('SELECT * FROM employees WHERE emp_no = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


    //Router to GET specific departments from the MySQL database
    app.get('/dep' , (req, res) => {
        pool.query('SELECT * FROM departments', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );

//Creating GET Router to fetch all the manager details from the MySQL Database
app.get('/manager' , (req, res) => {
    pool.query('SELECT * FROM dept_manager INNER JOIN employees ON employees.emp_no=dept_manager.emp_no', (err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
    } );

    //Creating GET Router to fetch all the dept_employee details from the MySQL Database
    app.get('/deptemp' , (req, res) => {
    pool.query('SELECT * FROM dept_emp INNER JOIN employees ON employees.emp_no=dept_emp.emp_no', (err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
    } );
    

//Creating GET Router to fetch all the title details from the MySQL Database
app.get('/title' , (req, res) => {
    pool.query('SELECT * FROM titles INNER JOIN employees ON employees.emp_no=titles.emp_no', (err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
    } );


    //Creating GET Router to fetch all the salary details from the MySQL Database
app.get('/salary' , (req, res) => {
    pool.query('SELECT * FROM salaries INNER JOIN employees ON employees.emp_no=salaries.emp_no', (err, rows) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
    })
    } );


    //Router to INSERT/POST a learner's detail
    app.post('/insert' , (req, res) => {
        

        const{id,bd,fn,ln,hd} = req.body;

        pool.query('INSERT INTO employees VALUES (?, ?, ?, ?, ?)',[id,bd,fn,ln,hd], (err, rows) => {
        if (!err)
            res.send("posted");
        else
            console.log(err);
        })
        } );

        app.put('/update/:id' , (req, res) => {
        
            const id = req.params.id;
            const{bd,fn,ln,hd} = req.body;
    
            pool.query('UPDATE employees SET birth_date = ?, first_name = ?, last_name = ?, hire_date = ? WHERE employees.emp_no = ?',[bd,fn,ln,hd,id], (err, rows) => {
            if (!err)
                res.send("updated");
            else
                console.log(err);
            })
            } );   


 