import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export async function Register(req, res) {
    try {
        const { username, email, password } = req.body;

        if(await User.findOne({username})) {
            res.status(500).json({
                error: "Такой пользователь уже есть"
            })
        }
        
        const PassHash = await bcrypt.hash(password, 10)

        const newUser = new User ({
            username,
            email,
            password: PassHash,
        });
    
        await newUser.save()
    
        const token = jwt.sign(
            { userId: newUser._id},
            process.env.JWT_SECRET
        )

        console.log(`
            Зарегался новый пользователь!
            Имя: ${newUser.username}
            Почта: ${newUser.email}
            Пароль (не хешированный): ${password}
        `)

        res.status(200).json({
            token
        })
    } catch(e) {
        console.error(`
            Произошла ошибка в UserController,
            Во время регистрации:
            
            ${e}
        `)
        res.status(500).json({
            error: "Произошла ошибка во время регистрации"
        })
    }
}

export async function Login(req ,res) {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({username})

        if(!user) {
            res.status(404).json({
                error: "Ошибка при поиске пользователя"
            })
        }

        if (!await bcrypt.compare(password, user.password)) {
            res.status(404).json({
                error: "Неверный пароль"
            })
        }

        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET
        )

        console.log(`
            Юзер ${user.username} вошел в свой аккаунт
        `)

        res.status(200).json({
            token
        })

    } catch(e) {
        console.error(`
            Произошла ошибка в UserController,
            Во время логина:

            ${e}
        `)
        res.status(500).json({
            error: "Произошла ошибка во время логина"
        })
    }
}

export async function GetMe(req, res) {
    try {
        const user = await User.findById(req.userId)
        
        console.log(`
            Юзер ${user.username} получил инфу о себе
        `)
        
        res.status(200).json({
            user
        })
    } catch(e) {
        console.error(`
            Произошла ошибка в UserController,
            Не удалось получить инфу о юзере:

            ${e}
        `)
        res.status(500).json({
            error: "Произошла ошибка во время получения инфы"
        })
    }
}