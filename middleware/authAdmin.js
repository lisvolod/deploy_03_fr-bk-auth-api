import User from "../models/userModel.js";

export const authAdmin = async (req, res, next) => {
    console.log(req.user.id);
    try {
        await User.findOne({_id: req.user.id})
        .then( user => {
            if (user.isAdmin === false)
                return res.status(400).json({msg: "Доступ до адмін панелі заблоковано"})
            next()
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}