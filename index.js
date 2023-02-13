import express from "express";
import mysql from "mysql2";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://cardguessr.cnopssyntra.surge.sh"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connection = mysql.createConnection({
  host: "ID396978_watergroep.db.webhosting.be",
  user: "ID396978_watergroep",
  password: "88rb89L64lBYWC209C3o",
  database: "ID396978_watergroep",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to MySQL database");
});

app.post("/scores", (req, res) => {
  connection.query(
    "INSERT INTO scores (score) VALUES (?)",
    [req.body.score],
    (error, results) => {
      if (error) throw error;
      res.send({ message: "Score saved successfully!" });
    }
  );
});

app.get("/scores", (req, res) => {
  connection.query("SELECT * FROM scores", (error, results) => {
    if (error) throw error;
    res.send({ scores: results });
  });
});

app.get("/average", (req, res) => {
  connection.query(
    "SELECT AVG(score) as average FROM scores",
    (error, results) => {
      if (error) throw error;
      res.send({ average: results[0].average });
    }
  );
});

app.listen(3000, () => {
  console.log("API listening on port 3000");
});
