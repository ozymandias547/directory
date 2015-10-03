'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var secretConfig = require('../../config/local.env.js');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var moment = require('moment');
var nodemailer = require('nodemailer');
var crypto = require('crypto');



var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.secrets.email,
    pass: config.secrets.emailPassword
  }
});

var resetTokens = [];

var validationError = function(res, err) {
    return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword')
        .populate('tags')
        .exec(function(err, users) {
            if (err) return res.send(500, err);
            res.json(200, users);
        });
};

/**
 * Get list of user public info
 * restriction: 'user'
 */
exports.getPublic = function(req, res) {
    User.find({}, '-salt -hashedPassword -provider -role')
        .populate('tags')
        .exec(function(err, users) {
            if (err) return res.send(500, err);
            res.json(200, users);
        });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User
        .findById(userId)
        .populate("tags")
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return res.send(401);
            res.json(user.profile);
        });


};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.send(500, err);
        return res.send(204);
    });
};

exports.updateAsAdmin = function(req, res) {
    var userId = req.body.userData._id;
    var userData = _.omit(req.body.userData, '_id');

    User.update({
        _id: userId
    }, userData, function(err, user) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            console.log(user);
            res.send(200);
        }
    });
};

/**
 * Updates a user
 * restriction: 'user'
 */
exports.update = function(req, res) {

    var userId = req.body._id;
    var userData = _.omit(req.body, '_id');

    User.update({
        _id: userId
    }, userData, function(err, user) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            console.log(user);
            res.send(200);
        }
    });
};

exports.sendPasswordResetEmail = function(req, res, next) {

  var resetToken = crypto.randomBytes(16).toString('base64');

  resetTokens.push({
    email: req.body.email,
    resetToken: resetToken,
    expireTime: moment().add(15, "minutes").unix()
  });

  var mailOptions = {
    from: 'CIEFC Directory ✔ <foo@blurdybloop.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'CIEFC Reset Password ✔', // Subject line
    html: '<a href="http://directory-josephjung.rhcloud.com/resetPassword?resetToken=' + encodeURIComponent(resetToken) + '">Click here to reset your password</a>' // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      return res.send(500);
    }
    console.log('Message sent: ' + info.response);
    res.send(200);
  });

};

exports.resetPassword = function(req, res) {

  var newPass = req.body.newPass;
  var resetToken = _.findWhere(resetTokens, {resetToken: req.body.resetToken});

  if (resetToken) {

    if (resetToken.expireTime > moment().unix()) {

      var query  = User.where({ email: resetToken.email });
      query.findOne(function(err, user) {

        if (err) {
          console.log(err);
          return res.send(404);
        }

        if (user) {
          user.password = newPass;
          user.save(function(err) {
            if (err) return validationError(res, err);
            else {
              resetTokens.splice( resetTokens.indexOf(resetToken), 1);
              res.send(200);
            }
          });
        } else {
          return res.json(403, "Couldn't find a user with that email.");
        }

      });
    } else {

      resetTokens.splice( resetTokens.indexOf(resetToken), 1);

      return res.json(403, "Page has expired");
    }
  } else {
    return res.json(403, "Page has expired");
  }



};


/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.send(200);
            });
        } else {
            res.send(403);
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;

    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.json(401);
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
