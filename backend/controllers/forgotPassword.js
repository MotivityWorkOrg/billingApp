'use strict';
let user = require('../models/user');
let nodeMailer = require('nodemailer');
let console = require('console');
let transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vsfoodjumbo@gmail.com',
        pass: 'vsfood@123'
    }
});

// reset a users password:

function resetPassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz123456789";
    let newPass = '';

    for (let i = 0; i < 8; i++) {
        newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPass;
}
module.exports = {
    changePassword: function (req, res) {
        // setup e-mail
        console.log(" ::: ::: ", req.body);
        let newPass = resetPassword();
        user.findOne({email: req.body.email}, function (err, user) {
            user.password = newPass;
            user.save(function (err) {
                if (err) {
                    console.log("error saving password");
                }
            });
        });
        let mailOptions = {
            from: 'VSFood Team <vsfoodjumbo@gmail.com>', // sender address
            to: req.query.email,
            subject: 'New VSFood password.', // Subject line
            html: '<b>Your new password is ' + newPass + '.  </b><a href="http://localhost:3000/login">Login here.</a>' // html body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
        res.end();
    }
};
