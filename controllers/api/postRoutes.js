const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// This route creates a new post based on input from the user, and the current date.
router.post("/addPost", async (req, res) => {
  try {
    const newPost = {
      ...req.body,
      user_id: req.session.user_id,
      date: new Date(), // Attach the current date to the comment
    };
    const newPostData = await Post.create(newPost);
    /* req.body should look like this...
        {
          title: "Blah",
          content: "Blah blah blah.",
        }
    */
    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
