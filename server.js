"use strict";


const express = require('express');
const server = express();

const bodyParser = require('body-parser');

const path = require('path');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));


const mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'todo',
    port: '8889'
});

server.use(express.static(path.join(__dirname, 'public')));



/*
connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
*/




server.get('/', function(req, res) {
    res.sendFile('testpost.html', {"root" : __dirname});
});




server.get('/login', function(req, res) {
    res.sendFile('testlogin.html', {"root" : __dirname});
});






server.post('/login', function (req, res, next) {
    var username = req.body.username;
    console.log(`try connection for username ${username} `);

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected ... ");
        var sql = "SELECT * FROM user WHERE user.username = '" + username + "'";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result.length);

            if(result.length === 0){
                //Existe pas en DB
                var sql = "INSERT INTO user (username) VALUES ('" + username + "')";
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    console.log(result);

                });

            }else{
                //Existe en DB
                console.log("User already in DB !!")

            }

        });
    });


    next();

});


server.post('/create/task', function (req, res, next) {

    var title_ = req.body.title;
    var content_ = req.body.content;
    var date_ = req.body.date;
    var task_status_ = req.body.task_status;
    var username_ = req.body.username;


    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected ... ");
        var sql = "INSERT INTO tasks (title, content, date, task_status, username) VALUES ('" + title_ + "', '" + content_ + "' , '" + date_ + "' ,'" + task_status_ + "', '" + username_ + "')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            console.log(result);
        });
    });


    next();
});


server.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});






