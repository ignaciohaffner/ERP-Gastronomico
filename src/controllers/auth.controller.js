import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'


export const register = async (req, res) => {
    const { email, password, username, role, rank, dateAdmission } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(["El email ya esta en uso"])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            rank,
            dateAdmission
        })
        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: newUser._id, role: newUser.role })
        console.log(token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            rank: userSaved.rank,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const changePassword = async (req, res) => {
    const { password } = req.body
    console.log(password)
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
        const user = await User.findByIdAndUpdate(req.params.id, { password: passwordHash })

    } catch (error) {
        console.log(error)
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body


    try {
        const userFound = await User.findOne({ email })

        if (!userFound) return res.status(400).json({
            message: 'User not found'
        })



        const isMatch = await bcrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({
            message: 'Contraseña invalida'
        })

        const token = await createAccessToken({ id: userFound._id, role: userFound.role })

        res.cookie("token", token)

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({
        message: 'User not found'
    })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
    res.send('profile')
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No autorizado' })
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' })
        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'No autorizado' })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        })
    })
}
