const express = require("express");
const { getCategories, getUsers,
  getReviewByID,
  patchReviewVotesByID } = require(`${__dirname}/controllers/gamesC`);


const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewByID);
app.patch("/api/reviews/:review_id", patchReviewVotesByID);

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send(err.msg);
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  let errorPSQLCodes = ["22P02", "22003"];
  if (errorPSQLCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
});

app.get("/api/users", getUsers);

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "general error catch" });
});

module.exports = app;