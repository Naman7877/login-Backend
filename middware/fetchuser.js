const jwt = require('jsonwebtoken');
const JWT_SECRET = "hiithisisnamanfromjaipur";

featchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send("error please give write token");
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send("error please give write token");
    }

}

module.exports = featchuser;