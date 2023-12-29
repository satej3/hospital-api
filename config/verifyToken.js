const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization');
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
    console.log("Token we got = ", token);
 const decoded = jwt.verify(token, 'secret');
 console.log("decoded ",decoded);
 req.userId = decoded.userId;
 console.log(req.userId);
 next();
 } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;