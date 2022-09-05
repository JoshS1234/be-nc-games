const {
  getCategoryList,
  getSingleReviewByID,
  addReviewVotes,
} = require("../models/gamesM.js");

exports.getCategories = (req, res) => {
  return getCategoryList().then((data) => {
    res.status(200).send(data);
  });
};

exports.getReviewByID = (req, res, next) => {
  let reviewID = req.params.review_id;
  return getSingleReviewByID(reviewID)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVotesByID = (req, res, next) => {
  let reviewID = req.params.review_id;
  let voteInc = req.body.inc_votes;
  return addReviewVotes(reviewID, voteInc)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
