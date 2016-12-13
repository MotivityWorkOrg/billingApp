let express = require('express');
let User = require('../models/user');
let console = require('console');

module.exports = {
    login: function (req, res) {
        User.getAuthenticated(req.body, function (err, token) {
            if (err) {
                console.log(err.message);
                res.status(400).send(err.message);
            } else {
                res.send(token);
            }
        });
    },
    register: function (req, res) {
        req.check('username').isAlphanumeric(); // check to see if not empty
        let errors = req.validationErrors();
        if (errors) {
            res.status(400).send(errors);
        } else {
            User.Create(req.body, function (err, user) {
                if (err) {
                    res.status(400).send(err.message);
                } else {
                    res.sendStatus(200);
                    console.log("Register User is :::  ", user);
                }
            });
        }
    }
};