module.exports.posts = function (request, response) {
    return response.render('posts', {
        title: 'Posts'
    });
}