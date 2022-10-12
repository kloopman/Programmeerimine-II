import express, { Request, Response, NextFunction } from 'express';
import usersControllers from './components/users/controllers';
import postStatusesControllers from './components/postStatuses/controllers';
import postsControllers from './components/posts/controllers';
import commentsControllers from './components/comments/controllers';
import lecturersControllers from './components/lecturers/controllers';
import coursesControllers from './components/courses/controllers';
import groupsControllers from './components/groups/controllers';
import schooldaysControllers from './components/schooldays/controllers';

const app = express();
const PORT = 3000;

app.use(express.json());

//Middleware - logime, millal, millise endpointi poole pöörduti, millise meetodiga
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()} `);
    next();
}

app.use(logger);

//Kasutaja loomise andmete kontrollimiseks middleware
const checkUserData = (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware for user Data check");
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (firstName, lastName, email, password)`,
        });
    };
    console.log("Andmed olemas! Well done ;) ");
    next();
};

//Postituse andmete kontrollimise Middleware test
const checkPostData = (req: Request, res: Response, next: NextFunction) => {
    console.log("Middleware for Post Data Check");
    const { title, content, userId, statusId } = req.body;
    if (!title || !content || !userId || !statusId) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (title, content, userId, statusId)`,
        });
    };
    console.log("Andmed olemas, good job!");
    next();
};



// Endpoint API töötamise kontrollimisek
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello world!',
    });
});

/*
--------------------------------------------------
Kasutajatega seotud endpoindid
--------------------------------------------------
*/


// Kõikide kasutajate pärimise endpoint
app.get('/api/v1/users', usersControllers.getAllUsers);

// Kasutaja pärimine id alusel
app.get('/api/v1/users/:id', usersControllers.getUserById);

// Kasutaja muutmine
app.patch('/api/v1/users/:id', usersControllers.changeUser);

// Kasutaja loomine
app.post('/api/v1/users', checkUserData, usersControllers.createUser);

// Kasutaja kustutamine
app.delete('/api/v1/users/:id', usersControllers.deleteUser);

/*
--------------------------------------------------
Postituste staatustega seotud endpoindid
--------------------------------------------------
*/

// Kõikide postituste staatuste pärimise endpoint
app.get('/api/v1/posts/statuses', postStatusesControllers.getPostStatuses);

// Postituse staatus pärimine staatuse id alusel
app.get('/api/v1/posts/statuses/:id', postStatusesControllers.getPostStatusById);

/*
--------------------------------------------------
Postitustega seotud endpoindid
--------------------------------------------------
*/

// Kõikide postituste pärimise endpoint
app.get('/api/v1/posts', postsControllers.getPosts);

// Postituse pärimine id alusel
app.get('/api/v1/posts/:id', postsControllers.getPostById);

// Postituse loomine
app.post('/api/v1/posts', checkPostData, postsControllers.createPost);

// Postituse muutmine
app.patch('/api/v1/posts/:id', postsControllers.editPost);

// Postituse kustutamine
app.delete('/api/v1/posts/:id', postsControllers.deletePost);

/*
--------------------------------------------------
Kommentaaridega seotud endpoindid
--------------------------------------------------
*/

// Kõikide kommentaaride pärimise endpoint
app.get('/api/v1/comments', commentsControllers.getComments);

// Kommentaari pärimine id alusel
app.get('/api/v1/comments/:id', commentsControllers.getCommentById);

// Postitusega seotud kommentaaride pärimise endpoint //SIIN AJAB KÜLL SEGADUSSE, ET MIKS ON OSA COMMENTSIS JA OSA POSTSIS. 
app.get('/api/v1/posts/:id/comments', postsControllers.getPostComment);

// Kommentaari loomine
app.post('/api/v1/comments', commentsControllers.createComment);

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', commentsControllers.deleteComment);



/*
--------------------------------------------------
Õppeainetega seotud endpointid - 
--------------------------------------------------
*/

//õppeainete pärimise endpoint 
app.get('/api/v1/courses', coursesControllers.getCourses);


// Õppeaine loomine
app.post('/api/v1/courses', coursesControllers.createCourse);

//Õppeaine muutmine
app.patch('/api/v1/courses/:id', coursesControllers.editCourse);

//Õppeaine kustutamine



app.delete('/api/v1/courses/:id', coursesControllers.deleteCourse);
/*
--------------------------------------------------
Õppejõuga seotud endpointid - 
--------------------------------------------------
*/

//Õppejõud pärimise endpoint
app.get('/api/v1/lecturers', lecturersControllers.getLecturer);

//Õppejõu loomine

app.post('/api/v1/lecturers', lecturersControllers.addLecturer);

//Õppejõu muutmine

app.patch('/api/v1/lecturers/:id', lecturersControllers.editLecturer);

//Õppejõu kustutamine
app.delete('/api/v1/lecturers/:id', lecturersControllers.deleteLecturer);

/*
--------------------------------------------------
Gruppidega seotud endpointid - 
--------------------------------------------------
*/

//Kursusegrupid
app.get('/api/v1/groups', groupsControllers.getGroups);

//Kursusegrupi lisamine
app.post('/api/v1/groups/', groupsControllers.addGroup);

//Kursusegrupi muutmine
app.patch('/api/v1/groups/:id', groupsControllers.editGroup);


//Kursusegrupi kustutamine
app.delete('/api/v1/groups/:id', groupsControllers.deleteGroup);

/*
--------------------------------------------------
Koolipäevadega seotud endpointid - 
--------------------------------------------------
*/

//Koolipäevad
app.get('/api/v1/schooldays', schooldaysControllers.getSchoolDays);

//Koolipäeva lisamine
app.post('/api/v1/schooldays/', schooldaysControllers.addSchoolDay);


//Koolipäeva muutmine
app.patch('/api/v1/schooldays/:id', schooldaysControllers.editSchoolDay);


//Koolipäeva kustutamine
app.delete('/api/v1/schooldays/:id', schooldaysControllers.editSchoolDay);

app.listen(PORT, () => {
    console.log('Server is running');
});

