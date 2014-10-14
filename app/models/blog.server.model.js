'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * Like Schema
 */
var LikeSchema = new Schema({
	liker: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * InappropriateComment Schema
 */
var InappropriateCommentSchema = new Schema({
	judge: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	commentContent:{
		type: String,
		default: '',
		required: 'Please fill in your comment',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	commentLikes: [LikeSchema],
	inappropriate: [InappropriateCommentSchema]
});



/**
 * Blog Schema
 */
var BlogSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill a title',
		trim: true
	},
	content: {
		type: String,
		default: '',
		required: 'Please put in your news for the week',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comments: [CommentSchema],
	likes: [LikeSchema]
});

mongoose.model('Blog', BlogSchema);