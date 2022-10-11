import { Request, Response } from 'express';
import { courses, lecturers } from '../../mockData';
import { ILecturer } from './interfaces';

const lecturersControllers = {
    getLecturer: (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'List of lecturers',
            lecturers
        });
    },
    addLecturer: (req: Request, res: Response) => {
        const { lecturerName } = req.body;
        if (!lecturerName) {
            return res.status(400).json({
                success: false,
                message: `Lecturer name missing`,
            });
        }
        const id = lecturers.length + 1;
        const newLecturer: ILecturer = {
            id,
            lecturerName,
        };
        lecturers.push(newLecturer);

        return res.status(201).json({
            success: true,
            message: `Lecturer with id ${newLecturer.id} created`,
        });
    },
    editLecturer: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { lecturerName } = req.body;
        const lecturer = lecturers.find(element => {
            return element.id === id;
        });

        if (!lecturer) {
            return res.status(404).json({
                success: false,
                message: `Lecturer not found`,
            });
        }
        if (!lecturerName) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }
        if (lecturerName) lecturer.lecturerName = lecturerName;
        return res.status(200).json({
            success: true,
            message: `Lecturer updated`,
        });
    },
    deleteLecturer: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = courses.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Lecturer not found`,
            });
        }
        lecturers.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `Lecturer deleted`,
        });
    }


}

export default lecturersControllers;