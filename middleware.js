module.exports = {
    logger,
};


// logger middleware
function logger(msg) {
    return function (req, res, next) {
        console.log(`${msg || 'requesting'}: ${req.url}`);
        next();
    }
}

function errorHandler(err, req, res) {
    return function (req, res) {

    }
}
