module.exports.home = function (request, response) {
    return response.render('home', {
        title: "Home"
    });
}

// module.exports.actionName = function(request,response){}