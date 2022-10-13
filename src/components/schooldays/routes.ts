import express from 'express';
import schooldaysControllers from './controllers';

const schooldaysRoutes = express.Router();

schooldaysRoutes
    .get('/', schooldaysControllers.getSchoolDays)
    .post('/', schooldaysControllers.addSchoolDay)
    .patch('/:id', schooldaysControllers.editSchoolDay)
    .delete('/:id', schooldaysControllers.deleteSchoolDay);


export default schooldaysRoutes;
