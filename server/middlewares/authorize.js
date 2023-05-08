
const Authorize = (roles) => { 
    return (req, res, next) => {
        next();
    }
}

module.exports = Authorize;