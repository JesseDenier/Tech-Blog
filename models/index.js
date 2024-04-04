// Compiles all the models in one central location, and explains relationships.
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Posts belong to a User.
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Users have many Posts.
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belong to a User.
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Users have many Comments.
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comments belong to a User.
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Posts have many Comments.
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Post, Comment };
