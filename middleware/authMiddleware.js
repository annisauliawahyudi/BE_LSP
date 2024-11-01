require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  let token;

 
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in!",
    });
  }

  try {
  
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log('Decoded Token:', req.user); 
    next();
  } catch (error) {
    console.error('Token Verification Error:', error); 
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    
    console.log('User role:', req.user.role);
    console.log('Allowed roles:', roles); 

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
