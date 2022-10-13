import express from 'express';
import lecturersControllers from './controllers';

const lecturersRoutes = express.Router();

lecturersRoutes
    .get('/', lecturersControllers.getLecturer)
    .post('/', lecturersControllers.addLecturer)
    .patch('/:id', lecturersControllers.editLecturer)
    .delete('/:id', lecturersControllers.deleteLecturer);


export default lecturersRoutes;
