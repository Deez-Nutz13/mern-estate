import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import User from '../models/user.models.js'

export const test = async (req, res) => {
    res.json({message: "test"})
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'you can update only your account'))

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.body.id === req.params.id) return next(errorHandler(401, 'you can delete only your account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}