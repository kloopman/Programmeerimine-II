import { Request, Response } from 'express';
import { courses, lecturers } from '../../mockData';
import { ICourse } from './interfaces';

const coursesControllers = {
    getCourses: (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'List of courses',
            courses
        });
    },
    createCourse: (req: Request, res: Response) => {
        const { courseName, courseCode } = req.body;
        if (!courseName || !courseCode) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (courseCode, courseName)`,
            });
        }
        const id = courses.length + 1;
        const newCourse: ICourse = {
            id,
            courseName,
            courseCode,
        };
        courses.push(newCourse);

        return res.status(201).json({
            success: true,
            message: `Course with id ${newCourse.id} created`,
        });
    },
    editCourse: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { courseName, courseCode } = req.body;
        const course = courses.find(element => {
            return element.id === id;
        });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Course not found`
            });
        }
        if (!courseName && !courseCode) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }
        if (courseName) course.courseName = courseName;
        if (courseCode) course.courseCode = courseCode;

        return res.status(200).json({
            success: true,
            message: `Course updated`,
        });
    },
    deleteCourse: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = courses.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Course not found`,
            });
        }
        courses.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `Course deleted`,
        });
    },
}

export default coursesControllers;