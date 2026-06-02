// middleware to check if the user is an owner and grant access to owner-only routes
function ownerOnly(req, res, next) {
    if (req.user.role !== 'owner') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
}

module.exports = ownerOnly;