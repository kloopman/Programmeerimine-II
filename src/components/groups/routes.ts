import express from 'express';
import groupsControllers from './controllers';

const groupsRoutes = express.Router();

groupsRoutes
    .get('/', groupsControllers.getGroups)
    .post('/', groupsControllers.addGroup)
    .patch('/:id', groupsControllers.editGroup)
    .delete('/:id', groupsControllers.deleteGroup);


export default groupsRoutes;

