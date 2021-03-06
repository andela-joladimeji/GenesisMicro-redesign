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
    app.route('/blogs/:blogId/selected')
        .put(users.requiresLogin, blogs.selectedOne);

    app.route('/selected')
        .get(users.requiresLogin, blogs.chosenBlog);

    // users
    app.route('/blogs/:blogId/like')
        .post(users.requiresLogin, blogs.likePost);

    // all users
    app.route('/blogs/:blogId/comments')
        .post(users.requiresLogin, comments.addComment);
// localhost:3000/blogs//comment/54520327ad61fbe13a8d6576/likeComment
    // admin
    app.route('/blogs/:blogId/comments/:commentId')
        // .get(comments.showComment)
        .delete(users.requiresLogin, comments.hasAuthorization, comments.deleteComment);

    // like Comment
    app.route('/blogs/:blogId/comments/:commentId/like')
        .post(users.requiresLogin, comments.likeComment);


    app.route('/blogs/:blogId/comments/:commentId/inappropriate')
        .post(users.requiresLogin, comments.inappropriateComment);

    // app.route('/blogs/:blogId/comments/:commentId/approved')
    //     .post(users.requiresLogin, comments.hasAuthorization, comments.approvedComment);


    // Finish by binding the blog middleware
    app.param('blogId', blogs.blogByID);

    // Finish by binding the comment middleware
    app.param('commentId', comments.commentByID);
};
