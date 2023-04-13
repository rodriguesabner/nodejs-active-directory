const passport = require("passport");

function adMiddleware(req, res, next) {
    const opts = {failWithError: true};
    const callback = (err, user, info) => {
        if (err) {
            res.status(401).json({...err});
            return;
        }

        if (!user) {
            res.status(401).json({message: "Unauthorized", metadata: info});
            return;
        }

        req.user = user;
        next();
    }

    passport.authenticate('ActiveDirectory', opts, callback)(req, res, next);
}

module.exports = adMiddleware;
