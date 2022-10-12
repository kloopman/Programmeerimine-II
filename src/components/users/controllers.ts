import { Request, Response } from 'express';
import { users } from '../../mockData';
import { INewUser, IUser } from './interfaces';
import usersServices from './services';

const usersControllers = {
    getAllUsers: (req: Request, res: Response) => {
        const userWithoutPassword = usersServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'List of users',
            users: userWithoutPassword,
        });
    },
    getUserById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: IUser | undefined = usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);

        return res.status(200).json({
            success: true,
            message: `User`,
            data: {
                user: userWithoutPassword
            },
        });
    },
    changeUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { firstName, lastName, email, password } = req.body;
        const user: IUser | undefined = usersServices.findUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        if (!firstName && !lastName && !email && !password) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (password) user.password = password;

        return res.status(200).json({
            success: true,
            message: `User updated`,
        });
    },
    createUser: (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const newUser: INewUser = {
            firstName,
            lastName,
            email,
            password
        };
        const id = usersServices.createUser(newUser);

        return res.status(201).json({
            success: true,
            message: `User with id ${id} created`,
        });
    },
    deleteUser: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = users.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `User not found`,
            });
        }
        users.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `User deleted`,
        });
    }


};

export default usersControllers;