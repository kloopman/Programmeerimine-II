import { Request, Response } from 'express';
import { schooldays } from '../../mockData';
import { ISchoolDay } from './interfaces';

const schooldaysControllers = {
    getSchoolDays: (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'List of schooldays',
            schooldays
        });
    },
    addSchoolDay: (req: Request, res: Response) => {
        const { dayName } = req.body;
        if (!dayName) {
            return res.status(400).json({
                success: false,
                message: `Day name name missing`,
            });
        }
        const id = schooldays.length + 1;
        const newSchoolday: ISchoolDay = {
            id,
            dayName,
        };
        schooldays.push(newSchoolday);

        return res.status(201).json({
            success: true,
            message: `Day with id ${newSchoolday.id} created`,
        });
    },
    editSchoolDay: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { dayName } = req.body;
        const day = schooldays.find(element => {
            return element.id === id;
        });
        if (!day) {
            return res.status(404).json({
                success: false,
                message: `Day not found`,
            });
        }
        if (!dayName) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }
        if (dayName) day.dayName = dayName;
        return res.status(200).json({
            success: true,
            message: `Schoolday updated`,
        });
    },
    deleteSchoolDay: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = schooldays.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Schoolday not found`,
            });
        }
        schooldays.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `Schoolday deleted`,
        });
    }
}

export default schooldaysControllers;