const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");
const path = require("path");
const { Post } = require("../models");

// Shows the homepage on load, and fills the homepage with all the posts.
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["email"] }],
      order: [["date", "ASC"]],
    });

    const posts = postData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// This directs /login to login.handlebars unless they are logged in and then it directs them to the homepage above.
router.get("/login", (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// This directs /signup to signup.handlebars.
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
