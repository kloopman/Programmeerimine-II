import { Request, Response, NextFunction } from "express";
import authServices from "./services";

const authMiddleware = {
    isLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token not found',
            });
        }
        try {
            const decodd = await authServices.verify(token);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: `Token is not valid`,
            });
        };
        return next();
    },
    isAdmin: (req: Request, res: Response, next: NextFunction) => {
        if (res.locals.user.role !== 'Admin') {
            return res.status(401).json({
                success: false,
                Message: 'You have to be admin',
            });
        }
        return next();
    },
};

export default authMiddleware;