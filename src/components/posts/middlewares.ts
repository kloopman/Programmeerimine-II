import { Request, Response, NextFunction } from "express";

//Postituse andmete kontrollimise Middleware test
const postsMiddlewares = {
    checkPostData: (req: Request, res: Response, next: NextFunction) => {
        console.log("Middleware for Post Data Check");
        const { title, content, userId, statusId } = req.body;
        if (!title || !content || !userId || !statusId) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (title, content, userId, statusId)`,
            });
        };
        console.log("Andmed olemas, good job!");
        next();
    },
};


/* Näidis user middlewarest 
import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
    checkCreateUserData: (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (firstName, lastName, email, password)`,
            });
        };
        next();
    }
};
*/

export default postsMiddlewares;