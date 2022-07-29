const express = require("express");
const app = express();
const mysql = require ('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "amar11@",
  database: "myapp",
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


app.post("/api/insert",(req,res) => {
  const movie = req.body.movie;
  const rating = req.body.rating;
  const cast = req.body.cast;
  const genre= req.body.genre;
  const Releasedate= req.body.Releasedate;

  const sqlInsert = "INSERT INTO movie (movie, rating,cast, genre,Releasedate) VALUES (?,?,?,?,?)";
  db.query (sqlInsert,[movie, rating,cast, genre,Releasedate],(err, result) =>{
  console.log(err)
  });
});

app.get("/api/get",(req,res) => {
    const sqlInsert = "select * from movie";
    db.query (sqlInsert,(err, result) =>{
    // console.log(result);
    res.send(result);
    });
  });
  
app.delete("/api/delete/:movie", (req, res)=>{
  const name = req.params.movie;
  const sqlDelete = 
  "DELETE FROM movie WHERE movie = ?";
  db.query(sqlDelete,name,(err,result) =>{
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res)=>{
  const name = req.body.movie;
  const review = req.body.rating;
  const sqlUpdate = 
  "UPDATE movie SET movie = ? WHERE movieName = ?";

  db.query(sqlUpdate,[review, name], (err,result) =>{
    if (err) console.log(err);
  });
});

app.listen(3001,() =>{
    console.log("running on port 3001");
});