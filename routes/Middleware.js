const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        try {   
            const decodedToken = jwt.verify(token, "jwtkey");
            req.userData = { id: decodedToken.id };
            next();
        } catch(err) {
            res.status(401).send('Invalid or expired token');
        }
    } else{
        return res.status(400).send("Authentication error")
    }
}