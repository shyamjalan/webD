const queue = require('../config/kue');
const resetPassMailer = require('../mailers/reset_pass_mailer');

queue.process('reset-emails', function(job, done){
    // console.log('inside emails worker ', job.data);
    resetPassMailer.sendTokenLink(job.data);
    done();
});
