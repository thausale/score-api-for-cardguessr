import express from "express";
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

let scores = [];

app.post("/scores", (req, res) => {
  scores.push(req.body.score);
  res.send({ message: "Score saved successfully!" });
});

app.get("/scores", (req, res) => {
  res.send({ scores });
});

app.get("/average", (req, res) => {
  let sum = scores.reduce((a, b) => a + b, 0);
  let average = sum / scores.length;
  res.send({ average });
});

app.listen(3000, () => {
  console.log("API listening on port 3000");
});
