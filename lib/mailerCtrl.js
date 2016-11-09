/**
 * Created by john.nana on 10/12/2016.
 */
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}));

exports.welcomeMail= function(user){
    transporter.sendMail({
        from: process.env.MAIL_USER+'@gmail.com',
        to: user.email,
        subject: 'Welcome ',
        html: '<p>Thank you for signing up!</p>'
    });

};

exports.forgotPassword= function(req,user, token){

    console.log("forgot middleware");
    transporter.sendMail({
        from: process.env.MAIL_USER+'@gmail.com',
        to: user.email,
        subject: 'Password Reset ',
        html: '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>\n\n' +
        '<p>Please click on the following link, or paste this into your browser to complete the process: </p>\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        '<p>If you did not request this, please ignore this email and your password will remain unchanged. </p>\n'
    }, (err)=> {if (err) console.log(err)});



};

exports.passwordConfirmation= function(user){
    transporter.sendMail({
        from: process.env.MAIL_USER+'@gmail.com',
        to: user.email,
        subject: 'Welcome ',
        html: '<p>This is to inform you that your password has been successfully changed! \n\n</p>'+
            '<p>If you did not make this request, please contact us immediately.</p>'
    });

};

