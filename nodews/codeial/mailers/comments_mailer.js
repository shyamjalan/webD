const nodeMailer = require('../config/nodemailer');


//This is another way of exporting a method
exports.newComment = (comment) => {
    //passing data and relative path as specified in the nodemailer config
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'codeial.mail@gmail.com',
        to: comment.user.email,
        subject: "Your new comment is published!",
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