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

// DELETE route for deleting a post by ID.
router.delete("/deletePost", async (req, res) => {
  try {
    // Extract postId from the request body.
    const { post_id } = req.body;
    console.log(post_id);
    // Delete the post from the database.
    await Post.destroy({ where: { id: post_id } });
    // Respond with a success or failure status.
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
