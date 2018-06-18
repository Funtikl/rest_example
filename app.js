const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const cn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'samsung793',
  database: 'rest',
  debug: true,
});


app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'));

  let insertSQL = 'INSERT INTO contact(name, email, subject, message) VALUES (?, ?, ?, ?)';
  cn.query(insertSQL, [req.query.name, req.query.email, req.query.subject, req.query.message], (err, result, field)=>{
    if (err) throw err;
    let deleteDuplicate = 'DELETE n1 FROM contact n1, contact n2 WHERE n1.id > n2.id AND n1.name = n2.name';
    cn.query(deleteDuplicate);
  });


  console.log(req.query.name);
});
app.listen(3001, ()=>{
  console.log('Server is running on port 3001');
});
