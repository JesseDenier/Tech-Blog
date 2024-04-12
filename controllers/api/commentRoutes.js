const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// This route creates a new user based on input from the signup form, and logs them in
router.post("/addComment", async (req, res) => {
  try {
    const newComment = {
      ...req.body,
      user_id: req.session.user_id,
      date: new Date(), // Attach the current date to the comment
    };
    const newCommentData = await Comment.create(newComment);
    /* req.body should look like this...
        {
          content: "Blah blah blah.",
          post_id: "1",
        }
    */
    res.status(200).json(newCommentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
