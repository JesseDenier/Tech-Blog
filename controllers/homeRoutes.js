const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");
const path = require("path");
const { Post } = require("../models");

// This directs / to homepage.handlebars, and fetches all posts from the API.
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["date", "ASC"]],
    });
    const posts = postData.map((project) => project.get({ plain: true }));
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
router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard", {
    // Passes the logged in flag to the template
    logged_in: req.session.logged_in,
  });
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

module.exports = router;
