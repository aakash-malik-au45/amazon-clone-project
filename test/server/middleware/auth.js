const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(400)
            .send({ message: "Access denied, no token provided." });

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, validToken) => {
        if (err) {
            return res.status(400).send({ message: "invalid token" });
        } else {
            req.user = validToken;
            next();
        }
    });
};
module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send({ message: "Invalid ID." });

    next();
};