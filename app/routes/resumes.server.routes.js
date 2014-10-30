'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    resumes = require('../../app/controllers/resumes');

module.exports = function(app) {

        //admin only 
    app.route('/resumes')
        .get(users.requiresLogin, users.checkPermission, resumes.list)
        .post(resumes.create);

    app.route('/resumes/:resumeId')
    // only admin
        .get(resumes.read)
        .delete(users.requiresLogin, resumes.hasAuthorization,  users.checkPermission, resumes.delete);

    // Finish by binding the resume middleware
    app.param('resumeId', resumes.resumeByID);
};

