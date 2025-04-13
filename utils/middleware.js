import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export async function checkAuth(req, res, next) {
    try {
        
        const token = req.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId

        const user = await User.findById(req.userId)
        if(!user){
            res.status(404).json({
                error: "Такого пользователя не существует"
            })
        }

        next()
    } catch(e) {
        console.error(`
            Произошла ошибка в MiddleWare,
            Не удалось проверить токен:
            ${e}
        `)
        res.status(500).json({
            error: "Произошла ошибка во время проверки токена"
        })
    }
}