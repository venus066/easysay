const isAuthenticated = function(req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.status(403).send("Forbidden");
    }
}

export default isAuthenticated;