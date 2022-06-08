const verifyRoles = (allowedRole) => {
    return (req, res, next) => {
        if (!req?.role) return res.sendStatus(401);
        const result = req.role == allowedRole;
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles