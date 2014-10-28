'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * HomePage Schema
 */
var HomePageSchema = new Schema({
	sectionOne: {
		type: String,
		trim: true
	},
	sectionTwo: {
		type: String,
		trim: true
	},
	sectionThree: {
		type: String,
		trim: true
	},
	sectionFour: {
		type: String,
		trim: true
	},
	sectionFive: {
		type: String,
		trim: true
	},
	sectionSix: {
		type: String,
		trim: true
	},
	sectionSeven: {
		type: String,
		trim: true
	},
	sectionEight: {
		type: String,
		trim: true
	},
	sectionNine: {
		type: String,
		trim: true
	}
});

mongoose.model('HomePage', HomePageSchema);