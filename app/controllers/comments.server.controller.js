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
            return res.status(400).send({
                message: blogs.getErrorMessage(err)
            });
        }   
        else {
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

        blog.save(function(err){
            if(err) {
                return res.status(400).send({
                    message: 'comment delete failed'
                });
            }
            else{
                res.jsonp(blog);
            }
        });
    }
     else{
        return res.status(401).send({
            message: 'User is not authorized'
        });
    }
};


// exports.likeComment = function(req, res) {
//     var index = 0;
//     var blog = req.blog;
//         like = req.body;

//         console.log(blog.comments);
//         like.liker = req.user;
//          // blog.comments[index].inappropriate.push(inappropriate);
// }
//     var hasLiked = false; 
    
//     if (req.user.id === blog.user._id.toString()) { 
//         return res.send(400, {
//                message: 'You cannot like your own post'
//         });
//     } else {
//         for(var i = 0; i < blog.comments[index].commentLikes.length; i++) {
//            if (req.user.id === blog.comments[index].commentLikes[i].user.toString()) {
//                hasLiked = true;
//                break;
//             }
//         }
//         if (!hasLiked) {
//             blog.likes.push(like);

//             blog.save(function(err) {
//                if (err) {
//                    return res.send(400, {
//                       message: blogs.getErrorMessage(err)
//                    });
//                 } else {
//                     res.jsonp(blog);
//                 }
//             });
//         } 
//         else {
//             return res.send(400, {
//                message: 'you have already liked this post before'
//             });
//         }
//     }

//  };

exports.approvedComment = function(){
    var blog = req.blog;
    // var blog.comments.comment.status = 0;
    var approvedComment = req.body;
    
    if (req.user.role === 'admin'){
        // blog.comments.comment.status = 1;
        blog.save(function(err) {
           if (err) {
               return res.status(400).send({
                  message: blogs.getErrorMessage(err)
               });
            } else {
                res.jsonp(blog);
            }
        });

    }
    console.log(blog.comments.comment.status);
};




exports.inappropriateComment = function(req, res) {

    var markedComment = false; 
    var blog = req.blog;
    var inappropriate = req.body;
    var index = 0;
    blog.comments[index].inappropriate.judge = req.user;
    console.log(req.user);

    res.jsonp(blog.comments[index].inappropriate);
// //         var index = 0;
// //     var blog = req.blog;
// //         like = req.body;

// //         console.log(blog.comments);
// //         like.liker = req.user;
// //          // blog.comments[index].inappropriate.push(inappropriate);
// // }1
// //     var hasLiked = false; 
   
//     if (!markedComment) {
//         blog.comments[index].inappropriate.push(inappropriate);

//         blog.save(function(err) {
//            if (err) {
//                return res.send(400, {
//                   message: blogs.getErrorMessage(err)
//                });
//             } else {
//                 res.jsonp(blog);
//             }
//         });
//     } 
//     else {
//         return res.send(400, {
//            message: 'you have already marked this comment as inappropriate'
//         });
//     }
    
};

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
