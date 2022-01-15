const nodemailer = require('nodemailer');

exports.sendEmail= async (email, token) => {
    try {
        var email = email;
        var token = token;
 
        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Your email id
                pass: process.env.EPASS // Your password
            }
        });
    
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password Link - NONAME',
            html: '<p>You requested for reset password, kindly use this <a href='+ process.env.HOST+'reset-password?token=' + token + '> Link </a> to reset your password</p>'
    
        };
 
        await mail.sendMail(mailOptions, function(error) {
            if (error) {
                console.log(1, error)
            } else {
                console.log(0)
                mail.close();
            }
        });

    } catch (error) {
        console.log(error);
    }
}