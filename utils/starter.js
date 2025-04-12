import dotenv from "dotenv";

dotenv.config();
const EXPRESS_PORT = process.env.EXPRESS_PORT;

export async function Listen(app) {
    try {
        app.listen(EXPRESS_PORT, () => {
            console.log('Сервер успешно запущен на порте', EXPRESS_PORT)
        })
    } catch(e) {
        console.error(`
            Произошла ошибка при запуске:

            ${e}
        `)
    }
}
