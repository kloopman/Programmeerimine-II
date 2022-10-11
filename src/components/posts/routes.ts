import express from 'express';
import postsController from './controllers';
const postsRoutes = express.Router();

postsRoutes
    .get('/', postsController.getPosts)
    .get('/:id', postsController.getPostById)


export default postsRoutes;