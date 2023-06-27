import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js"


export function verifyRole(role) {
    return function (req, res, next) {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, TOKEN_SECRET);
            if (decoded.role !== role) {
                return res.status(401).json({ msg: 'User not authorized' });
            }
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
}

