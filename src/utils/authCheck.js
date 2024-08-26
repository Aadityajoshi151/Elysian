const apiKey = process.env.API_KEY;

function isAuthorized(req_api){
    console.log(apiKey)
    console.log(req_api)
}

module.exports = {
    isAuthorized
};