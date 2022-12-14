const {
  getCategoryList,
  getSingleReviewByID,
  getUserList,
  addReviewVotes,
  getCommentsArrayForReview,
  postCommentToSpecificReview,
  getReviewListComments,
  deleteCommentFromIDModel,
  getOwnerList,
  getDesignerList,
} = require("../models/gamesM.js");

const fs = require("fs/promises");

exports.getCategories = (req, res) => {
  return getCategoryList().then((data) => {
    res.status(200).send(data);
  });
};

exports.getUsers = (req, res) => {
  return getUserList().then((users) => {
    res.status(200).send({ users });
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

exports.getCommentsFromReview = (req, res, next) => {
  let reviewID = req.params.review_id;
  return getCommentsArrayForReview(reviewID)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentToReview = (req, res, next) => {
  const reviewID = req.params.review_id;
  const objToPost = req.body;
  return postCommentToSpecificReview(reviewID, objToPost)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewListWithCommentCount = (req, res, next) => {
  let categoryObj = req.query;
  return getReviewListComments(categoryObj)
    .then((reviewList) => {
      res.status(200).send({ reviewList });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentByID = (req, res, next) => {
  let commentID = req.params.comment_id;
  return deleteCommentFromIDModel(commentID)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

//Bonus questions for extra functionality
exports.getOwners = (req, res, next) => {
  return getOwnerList()
    .then((data) => {
      data = data.map((ownerObj) => {
        return ownerObj.username;
      });
      res.status(200).send(data);
    })
    .catch((err) => {
      return err;
    });
};

exports.getDesigners = (req, res, next) => {
  return getDesignerList()
    .then((data) => {
      designerArr = [];
      for (let i = 0; i < data.length; i++) {
        if (!designerArr.includes(data[i].designer)) {
          designerArr.push(data[i].designer);
        }
      }
      res.status(200).send({ designers: designerArr });
    })
    .catch((err) => {
      return err;
    });
};

exports.getJSONinstructions = (req, res, next) => {
  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data) => {
    data = JSON.parse(data);
    res.status(200).send({ data });
  });
};

exports.getIntroduction = (req, res, next) => {
  return Promise.all([]).then((data) => {
    data = {
      msg: "use /api in order to get the instructions for different endpoints for the backend API",
    };
    res.status(200).send({ data });
  });
};
