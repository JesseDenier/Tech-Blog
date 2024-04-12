const router = require("express").Router();
const withAuth = require("../utils/auth");
const path = require("path");
const { User } = require("../models");
const { Post } = require("../models");
const { Comment } = require("../models");

// This directs / to homepage.handlebars, and fetches all posts from the API.
router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["date", "ASC"]],
    });
    const posts = allPostData.map((project) => project.get({ plain: true }));
    res.render("homepage", {
      posts,
      // Passes the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This directs /dashboard to dashboard.handlebars.
// withAuth makes it so if the user isn't logged in then they are redirected to /login.
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.user_id;

    // Fetch posts made by the user with the given ID
    const userPostData = await Post.findAll({
      where: { user_id: userId }, // Filter by user ID
      include: [{ model: User, attributes: ["username"] }],
      order: [["date", "ASC"]],
    });

    const posts = userPostData.map((project) => project.get({ plain: true }));

    res.render("dashboard", {
      posts,
      // Passes the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This directs /login to login.handlebars.
router.get("/login", (req, res) => {
  // If a session exists, redirects the request to the homepage.
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// This directs /signup to signup.handlebars.
router.get("/signup", (req, res) => {
  // If a session exists, redirects the request to the homepage.
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

//! This has to be the laste homeRoute or else it overrides the routes under it and breaks the site.
// This directs /post.Id to post.handlebars, and fetches the correct post from the API.
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId; // Extract the postId parameter from the URL
    const postData = await Post.findOne({
      where: { id: postId }, // Filter posts based on postId
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment, // Include the Comment model
          include: [{ model: User, attributes: ["username"] }], // Include the User model for comments
          order: [["date", "ASC"]],
        },
      ],
    });
    if (!postData) {
      // Handle case where post is not found
      return res.status(404).json({ message: "Post not found" });
    }

    const chosenPost = postData.get({ plain: true });
    console.log(chosenPost); // Log the chosenPost object
    res.render("post", {
      chosenPost,
      // Passes the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: "Internal Server Error" }); // Send a generic error response
  }
});

module.exports = router;
