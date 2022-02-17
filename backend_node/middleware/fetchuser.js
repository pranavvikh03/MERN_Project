const jwttoken = require("jsonwebtoken");
const JWT_TOKEN = "Abc@123";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token")
    if(!token)
    {
        res.status(401).json({error:"Invalid Token or Unauthorised access"})
    }
    try {
        const data = jwttoken.verify(token, JWT_TOKEN)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error:"Invalid Token or Unauthorised access"})
    }
}

module.exports = fetchuser;