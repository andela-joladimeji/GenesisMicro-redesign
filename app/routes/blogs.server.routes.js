'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    blogs = require('../../app/controllers/blogs'),
    comments = require('../../app/controllers/comments');

module.exports = function(app) {

        //admin only 
    app.route('/blogs')
        .get(users.requiresLogin, blogs.list)
        .post(users.requiresLogin, blogs.create);

    app.route('/blogs/:blogId')
    // only admin
        .get(blogs.read)
        // .get(blogs.postBlog)
        // only admin
        .put(users.requiresLogin, blogs.hasAuthorization, blogs.update)
        .delete(users.requiresLogin, blogs.hasAuthorization, blogs.delete);

// users
    app.route('/blogs/:blogId/like')
        .post(users.requiresLogin, blogs.likePost);

    // all users
    app.route('/blogs/:blogId/comments')
        .post(users.requiresLogin, comments.addComment);

// admin
    app.route('/blogs/:blogId/comments/:commentId')
        // .get(comments.showComment)
        .delete(users.requiresLogin, comments.hasAuthorization, comments.deleteComment);

    // app.route('/blogs/:blogId/comments/:commentId/like')
    //     .post(users.requiresLogin, comments.likeComment);

    // like Comment
     app.route('/blogs/:blogId/comments/:commentId/inappropriate')
        .post(users.requiresLogin, comments.inappropriateComment);

    app.route('/blogs/:blogId/comments/:commentId/approved')
        .post(users.requiresLogin, comments.hasAuthorization, comments.approvedComment);
    // Finish by binding the blog middleware
    app.param('blogId', blogs.blogByID);

    // Finish by binding the comment middleware
    app.param('commentId', comments.commentByID);
};

