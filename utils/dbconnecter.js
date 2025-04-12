import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_ADMNAME = process.env.DB_ADMNAME
const DB_ADMPASS = process.env.DB_ADMPASS
const DB_LINK = process.env.DB_LINK
const DB_APPNAME = process.env.DB_APPNAME

export async function Connect() {
    try {
        const connect = await mongoose.connect(`mongodb+srv://${DB_ADMNAME}:${DB_ADMPASS}@${DB_LINK}/simpleauth?retryWrites=true&w=majority&appName=${DB_APPNAME}`)
        console.log('База данных успешно подключенна')
    } catch(e) {
        console.error(`
            !!! ВНИМАНИЕ !!!
            ПРОИЗОШЛА ОШИБКА ПРИ ПОДКЛЮЧЕНИИ К БД
            СКОРЕЕ ВСЕГО ВЫ ПРОСТО НЕ ПОДКЛЮЧИЛИ СВОЮ БД В .env
            
            ${e}
        `)
    }
}