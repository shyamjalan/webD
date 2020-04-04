module.exports.home = function (request, response) {
    return response.render('home', {
        title: "Home"
    });
}

module.exports.homeAlternate = function (request, response) {
    return response.render('alternate_home', {
        title: "Alternate Home"
    });
}
// module.exports.actionName = function(request,response){}