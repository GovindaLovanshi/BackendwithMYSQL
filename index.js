const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    database: 'test'
});
// // insertoing new data
// let query = "INSERT INTO user(id,username,email,password) VALUES(?,?,?,?)";
// let data = [];
// for (let i = 1; i <= 100; i++) {
//     data.push(getRandomeUser()); // 100 fake users
// }
let getRandomeUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),

    ];
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Home Route

app.get("/", (req, res) => {
    let q = `SELECT count (*) FROM user`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let count = result[0]['count(*'];
            res.render("home.ejs", { count });

        });
    } catch { err } {
        console.log(err);
        res.send("some errorin db");
    }

});

// get rout
app.get("/user", (req, res) => {
    res.send()
})

app.listen("8080", () => {
    let q = `SELECT * FROM user`;
    try {
        connection.query(q, (err, users) => {
            if (err) throw err;

            res.render("showusers.ejs", { users });

        });
    } catch { err } {
        console.log(err);
        res.send("some errorin db");
    }
});

// try {
//     connection.query(query, [data], (err, result) => {
//         if (err) throw err;
//         console.log(err);
//         console.log(result);

//     });
// } catch { err } {
//     console.log(err);
// }

// connection.end();