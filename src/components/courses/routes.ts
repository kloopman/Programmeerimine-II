import express from 'express';
import coursesControllers from './controllers';

const coursesRoutes = express.Router();

coursesRoutes
    .get('/', coursesControllers.getCourses)
    .post('/', coursesControllers.createCourse)
    .patch('/:id', coursesControllers.editCourse)
    .delete('/:id', coursesControllers.deleteCourse);


export default coursesRoutes;
