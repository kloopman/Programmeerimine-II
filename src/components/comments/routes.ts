import express from 'express';
import commentsController from './controllers';
const commentsRoutes = express.Router();

commentsRoutes
    .get('/', commentsController.getComments)
    .get('/:id', commentsController.getCommentById)
    .post('/', commentsController.createComment)
    .delete('/:id', commentsController.deleteComment);


export default commentsRoutes;