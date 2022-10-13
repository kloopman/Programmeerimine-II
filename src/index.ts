import express from "express";
import logger from './components/general/middlewares';
import usersRoutes from "./components/users/routes";
import generalRoutes from './components/general/routes';
import authMiddleware from "./components/auth/middlewares";
import authController from "./components/auth/controllers";
import commentsRoutes from "./components/comments/routes";
import postsRoutes from "./components/posts/routes";
import postStatusesRoutes from "./components/postStatuses/routes";
import coursesRoutes from "./components/courses/routes";
import lecturersRoutes from "./components/lecturers/routes";
import groupsRoutes from "./components/groups/routes";
import schooldaysRoutes from "./components/schooldays/routes";

const app = express();
const PORT = 3000;
const apiPath = 'api/v1';

app.use(express.json());
app.use(logger);

app.post(`${apiPath}/login`, authController.login);
app.use(`${apiPath}/health`, generalRoutes);
app.use(authMiddleware.isLoggedIn);

app.use(`${apiPath}/health`, generalRoutes);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/postStatuses`, postStatusesRoutes);
app.use(`${apiPath}/comments`, commentsRoutes);
app.use(`${apiPath}/posts`, postsRoutes);
app.use(`${apiPath}/courses`, coursesRoutes);
app.use(`${apiPath}/lecturers`, lecturersRoutes);
app.use(`${apiPath}/groups`, groupsRoutes);
app.use(`${apiPath}/schooldays`, schooldaysRoutes);


app.listen(PORT, () => {
    console.log('Server is running');
});

