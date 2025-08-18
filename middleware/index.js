const jwt = require('jsonwebtoken')


const requireAuth = (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(403).json({ message: "Access Denied. No token provided"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Decoded token:', decoded)
        req.user = decoded
        next()
    } catch (error) {
        console.error('JWT verify error:', error)
        res.status(401).json({ message: "Invalid or expired token"})
    }
}


const requireAdmin = (req, res, next) => {
    if ( req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only."})
    }
    next()
}

const requireRider = ( req, res, next) => {
    if (req.user.role !== "rider") {
        return res.status(403).json({ message: "Forbidden: Riders only."})
    }
    next()
}

module.exports = {
    requireAuth,
    requireAdmin,
    requireRider
}