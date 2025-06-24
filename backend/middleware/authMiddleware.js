const jwt= require("jsonwebtoken");

function verifyToken(req, res, next){
    const token= req.cookies.token;

    if(!token) {
        return res.status(401).json({msg: "Unauthorized: No Token"});
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user= decode;
        next();
    } catch (err) {
        console.log("Auth Middleware Catch")
      return res.status(403).json({ msg: "Forbidden: Invalid token" });
    }

}

module.exports= {verifyToken};