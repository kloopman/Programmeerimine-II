import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { IUser } from '../users/interfaces';

const saltRounds = 10;
const jwtSecret = 'sajf0w89f8dsfjdsfdfsf32j3mffw+0f832';

const authServices = {
    hash: async (password: string): Promise<string> => {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(hash);
        return hash;
    },
    compare: async (password: string, hash: string): Promise<Boolean> => {
        const match = await bcrypt.compare(password, hash);
        return match;
    },
    sign: async (user: IUser): Promise<string> => {
        const payload = {
            id: user.id,
            email: user.role,
            role: user.role,
        }
        const token = await jwt.sign(payload, jwtSecret, { expiresIn: '2h' });
        return token;
    },
    verify: async (token: string) => {
        const decoded = await jwt.verify(token, jwtSecret);
        return decoded;
    },
};

export default authServices;