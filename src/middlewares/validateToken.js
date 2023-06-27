import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js"

export const authRequired = (req, res, next) => {

    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "no hay token, no podes entrar mostro" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) res.status(401).json({ message: "token invalido man" })
        req.user = user
        next()
    })


}