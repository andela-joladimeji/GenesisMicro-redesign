'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Blog = mongoose.model('Blog'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Blog already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

/**
 * Create a blog
 */
exports.create = function(req, res) {

    if (req.user.role ==='admin'){
        var blog = new Blog(req.body);
        blog.user = req.user;
   
        blog.save(function(err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(blog);
            }
        });
    }else{
        return res.send( 401,{
            message: 'User is not authorized'
        });
    }
    
};

/**
 * Show the current blog
 */
exports.read = function(req, res) {
    if (req.user.role ==='admin'){
        res.jsonp(req.blog);
    } 
    else{
        return res.send( 401,{
            message: 'User is not authorized'
        });
    }
};

/**
 * Update a blog
 */
exports.update = function(req, res) {
    if (req.user.role === 'admin'){
        
        var blog = req.blog;

        blog = _.extend(blog, req.body);

        blog.save(function(err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(blog);
            }
        });
    }
    else{
        return res.send( 401,{
            message: 'User is not authorized'
        });
    }
};

// exports.postBlog= function(req, res) {
//   if (user.roles='admin') || (post){
//         res.jsonp(req.blog);
//     }  
// };

/**
 * Delete a blog
 */
exports.delete = function(req, res) {
    if (req.user.role ==='admin'){

        var blog = req.blog;

        blog.remove(function(err) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(blog);
            }
        });
    }  

    else{
        return res.send( 401,{
            message: 'User is not authorized'
        });
    }
};

/**
 * List of Blogs
 */
exports.list = function(req, res, next) {
    if (req.user.role === 'admin') {
        
        Blog.find().sort('-created').populate('user', 'username').exec(function(err, blogs) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(blogs);
            }
        });
    }
    else{
        return res.send( 401,{
            message: 'User is not authorized'
        });
    }
};

 /**
 * Like a Post
 */
 exports.likePost = function(req, res) {
    var blog = req.blog,
        like = req.body;
        like.liker = req.user;
    var hasLiked = false; 
    
    if (req.user.id === blog.user._id.toString()) { 
        return res.send(400, {
               message: 'You cannot like your own post'
        });
    } else {
        for(var i = 0; i < blog.likes.length; i++) {
           if (req.user.id === blog.likes[i].user.toString()) {
               hasLiked = true;
               break;
            }
        }
        if (!hasLiked) {
            blog.likes.push(like);

            blog.save(function(err) {
               if (err) {
                   return res.send(400, {
                      message: getErrorMessage(err)
                   });
                } else {
                    res.jsonp(blog);
                }
            });
        } 
        else {
            return res.send(400, {
               message: 'you have already liked this post before'
            });
        }
    }

 };

 
/**
 * Blog middleware
 */
exports.blogByID = function(req, res, next, id) {
    Blog.findById(id).populate('user', 'username').populate('comments.creator').exec(function(err, blog) {
        if (err) return next(err);
        if (!blog) return next(new Error('Failed to load blog ' + id));
        req.blog = blog;
        next();
    });
};

/**
 * Blog authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.blog.user.id !== req.user.id) {
        return res.send(403, {
            commMessage: 'User is not authorized'
        });
    }
    next();
};

