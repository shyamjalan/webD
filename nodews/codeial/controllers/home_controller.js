module.exports.home = function (request, response) {
    return response.end('<h1>Express is up for Codeial!</h1>');
}

module.exports.homeAlternate = function (request, response) {
    return response.end('<h1>Alternate home reached!</h1>');
}
// module.exports.actionName = function(request,response){}