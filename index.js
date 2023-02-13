import express from "express";
const app = express();

app.use(express.json());

let scores = [];

app.post("/scores", (req, res) => {
  scores.push(req.body.score);
  res.send({ message: "Score saved successfully!" });
});

app.get("/average", (req, res) => {
  let sum = scores.reduce((a, b) => a + b, 0);
  let average = sum / scores.length;
  res.send({ average });
});

app.listen(3000, () => {
  console.log("API listening on port 3000");
});
