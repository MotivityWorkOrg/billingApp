let express = require('express');
let User = require('../models/user');
let console = require('console');

module.exports = {
    login: function (req, res) {
        console.log(req.body);
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
        //req.check('username').isAlphanumeric(); // check to see if not empty
        let errors = req.validationErrors();
        let user = {};
        user = req.body;
        user.displayName = req.body.firstName+ ' '+req.body.lastName;
        //console.log(req.body.year, req.body.month, req.body.day);
        user.dob = new Date(req.body.year, req.body.month-1, req.body.day+1);
        console.log(user.dob, '  ::::');
        if (errors) {
            res.status(400).send(errors);
        } else {
            User.Create(user, function (err, user) {
                if (err) {
                    res.status(400).send(err.message);
                    console.log("err.message :::  ", err.message);
                } else {
                    res.sendStatus(200);
                    console.log("Register User is :::  ", user);
                }
            });
        }
    }
};