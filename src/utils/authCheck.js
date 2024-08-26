const apiKey = process.env.API_KEY;

function isAuthorized(req_api){
    if (req_api === apiKey) return true
    else return false
}

module.exports = {
    isAuthorized
};