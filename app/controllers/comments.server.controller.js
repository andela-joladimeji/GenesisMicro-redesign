'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    BLog = mongoose.model('Blog'),
    _ = require('lodash');
var blogs = require('../../app/controllers/blogs');

/**
 * Add a comment
 */
exports.addComment = function(req, res) {
    var blog = req.blog;
    var comment = req.body;

    comment.creator = req.user;
    blog.comments.unshift(comment);

    blog.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: 'comment was not saved'
            });
        } else {
            res.jsonp(blog);
        }
    });
};


/**
 * Delete a comment
 */
exports.deleteComment = function(req, res) {
    if (req.user.role === 'admin') {

        var blog = req.blog;

        blog.comments.id(req.params.commentId).remove();
        // blog.comments.id(id).remove();

        blog.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: 'comment delete failed'
                });
            } else {
                res.jsonp(blog);
            }
        });
    } else {
        return res.status(401).send({
            message: 'User is not authorized'
        });
    }
};


exports.likeComment = function(req, res) {
    var index = 0;

    var blog = req.blog;
    var like = req.body;

    like.liker = req.user;


    var hasLikedComment = false;

    if (req.user.id === blog.comments.id(req.params.commentId).creator) {
        return res.send(400, {
            message: 'You cannot like your own comment'
        });
    } 


    else {
        
        for (var i = 0; i < blog.comments.id(req.params.commentId).commentLikes.length; i++) {
            if (req.user.id === blog.comments.id(req.params.commentId).commentLikes[i].liker.toString()) {
                hasLikedComment = true;
                break;
            }
        }


        if (!hasLikedComment) {
            blog.comments.id(req.params.commentId).commentLikes.push(like);

            blog.save(function(err) {
                if (err) {
                    return res.send(400, {
                        message: blogs.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(blog.comments.id(req.params.commentId));
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



exports.inappropriateComment = function(req, res) {
  
    var blog = req.blog;
    var comment = blog.comments.id(req.params.commentId);
    
    comment.status = req.body.status;
    
    console.log(blog.comments.id(req.params.commentId).status);
    blog.save(function(err) {
       if (err) {
           return res.status(400).send({
              message: 'bad request'
           });
        } else {
            res.jsonp(comment);
        }
    });
};




// exports.approvedComment = function(){
//     var blog = req.blog;
//     // var blog.comments.comment.status = 0;
//     var approvedComment = req.body;

//     if (req.user.role === 'admin'){
//         // blog.comments.comment.status = 1;
//         blog.save(function(err) {
//            if (err) {
//                return res.status(400).send({
//                   message: blogs.getErrorMessage(err)
//                });
//             } else {
//                 res.jsonp(blog);
//             }
//         });

//     }
//     console.log(blog.comments.comment.status);
// };




/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) {
    req.comment = req.blog.comments.id(id);
    next();
};


/**
 * comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.comment.creator._id !== req.user.id) {
        return res.status(403).send({
            message: 'You are not authorized'
        });
    }
    next();
};
