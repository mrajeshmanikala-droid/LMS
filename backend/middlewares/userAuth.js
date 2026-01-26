const jwt = require("jsonwebtoken");


const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided");
    return res.status(403).json({error: true, message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user info:", decoded);
    req.userInfo = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    res.status(401).json({ message: "Invalid Token" });

  }
};


module.exports = {userAuth}
