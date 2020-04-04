module.exports.profile = function (request, response) {
    response.render('users',{
        title: 'Profile'
    })
}