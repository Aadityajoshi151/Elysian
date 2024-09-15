const apiKey = process.env.API_KEY;

function isAuthorized(req_api) {
    try {
        if (req_api === apiKey) return true //Comparing the API key in request with one from .env file
        else return false
    }
    catch (err) {
        console.error(isAuthorized.name + ': ' + err)
    }
}

module.exports = {
    isAuthorized
};