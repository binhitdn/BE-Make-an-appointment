import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];    
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({
            errCode: 10,
            errMessage: "Token is invalid.User is not authenticated"
        });
        req.email = decoded.email;
        next();
    })
}