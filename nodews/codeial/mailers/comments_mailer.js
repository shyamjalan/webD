const nodeMailer = require('../config/nodemailer');


//This is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from: 'codeial.mail@gmail.com',
        to: comment.user.email,
        subject: "Your new comment is published!",
        html: '<h1>Your comment is now published!</h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail ',err);
            return;
        }
        console.log("Message Sent! ",info);
        return;
    })
}