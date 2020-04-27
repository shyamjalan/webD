const nodeMailer = require('../config/nodemailer');


//This is another way of exporting a method
exports.sendTokenLink = (token) => {
    //passing data and relative path as specified in the nodemailer config
    let htmlString = nodeMailer.renderTemplate({token: token}, '/users/reset_password.ejs');
    nodeMailer.transporter.sendMail({
        from: 'codeial.mail@gmail.com',
        to: token.user.email,
        subject: "Your Password Reset link",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail ',err);
            return;
        }
        console.log("Message Sent!");
        return;
    })
}