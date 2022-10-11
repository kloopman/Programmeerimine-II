import express, { Request, Response } from 'express';
import { INewUser, IUser, IUserWithoutPassword } from './components/users/interfaces';
import { IPost, INewPost } from './components/posts/interfaces';
import { IComment, INewComment } from './components/comments/interfaces';
import { INewPostStatus, IPostStatus } from './components/postStatuses/interfaces';
import { ICourse } from './components/courses/interfaces';
import { ILecturer } from './components/lecturers/interfaces';
import { IGroup } from './components/groups/interfaces';
import { ISchoolDay } from './components/schooldays/interfaces';
import { users, postStatuses, posts, comments, courses, lecturers, groups, schooldays } from './mockData';
import usersServices from './components/users/services';
import usersControllers from './components/users/controllers';
import postStatusesControllers from './components/postStatuses/controllers';
import postsControllers from './components/posts/controllers';
import commentsControllers from './components/comments/controllers';

const app = express();
const PORT = 3000;

app.use(express.json());

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
app.post('/api/v1/users', usersControllers.createUser);

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
app.post('/api/v1/posts', postsControllers.createPost);

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
Kodutööga seotud endpointid - 
--------------------------------------------------
*/

//õppeainete pärimise endpoint 
app.get('/api/v1/courses', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of courses',
        courses
    });
});


// Õppeaine loomine
app.post('/api/v1/courses', (req: Request, res: Response) => {
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
});

//Õppeaine muutmine
app.patch('/api/v1/courses/:id', (req: Request, res: Response) => {
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

    return res.status(200).json({ //See osa töötab aga minu meelest eelmised mitte. 
        success: true,
        message: `Course updated`,
    });
});

//Õppeaine kustutamine

app.delete('/api/v1/courses/:id', (req: Request, res: Response) => {
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
});

//ÕPPEJÕUGA SEOTUD ENDPOINTID
//Õppejõud pärimise endpoint
app.get('/api/v1/lecturers', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of lecturers',
        lecturers
    });
});

//Õppejõu loomine

app.post('/api/v1/lecturers', (req: Request, res: Response) => {
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
});

//Õppejõu muutmine

app.patch('/api/v1/lecturers/:id', (req: Request, res: Response) => {
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
});

//Õppejõu kustutamine
app.delete('/api/v1/lecturers/:id', (req: Request, res: Response) => {
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
});



//Kursusegrupid
app.get('/api/v1/groups', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of groups',
        groups
    });
});

//Kursusegrupi lisamine

app.post('/api/v1/groups/', (req: Request, res: Response) => {
    const { groupName } = req.body;
    if (!groupName) {
        return res.status(400).json({
            success: false,
            message: `Group name missing`,
        });
    }
    const id = groups.length + 1;
    const newGroup: IGroup = {
        id,
        groupName,
    };
    groups.push(newGroup);

    return res.status(201).json({
        success: true,
        message: `Group with id ${newGroup.id} created`,
    });
});



//Kursusegrupi muutmine

app.patch('/api/v1/groups/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { groupName } = req.body;
    const group = groups.find(element => {
        return element.id === id;
    });
    if (!group) {
        return res.status(404).json({
            success: false,
            message: `Group not found`,
        });
    }
    if (!groupName) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }
    if (groupName) group.groupName = groupName;
    return res.status(200).json({
        success: true,
        message: `Group updated`,
    });
});


//Kursusegrupi kustutamine

app.delete('/api/v1/groups/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = groups.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Group not found`,
        });
    }
    groups.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Group deleted`,
    });
});



//Koolipäevad
app.get('/api/v1/schooldays', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of schooldays',
        schooldays
    });
});

//Koolipäeva lisamine
app.post('/api/v1/schooldays/', (req: Request, res: Response) => {
    const { dayName } = req.body;
    if (!dayName) {
        return res.status(400).json({
            success: false,
            message: `Day name name missing`,
        });
    }
    const id = schooldays.length + 1;
    const newSchoolday: ISchoolDay = {
        id,
        dayName,
    };
    schooldays.push(newSchoolday);

    return res.status(201).json({
        success: true,
        message: `Day with id ${newSchoolday.id} created`,
    });
});


//Koolipäeva muutmine
app.patch('/api/v1/schooldays/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { dayName } = req.body;
    const day = schooldays.find(element => {
        return element.id === id;
    });
    if (!day) {
        return res.status(404).json({
            success: false,
            message: `Day not found`,
        });
    }
    if (!dayName) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }
    if (dayName) day.dayName = dayName;
    return res.status(200).json({
        success: true,
        message: `Schoolday updated`,
    });
});


//Koolipäeva kustutamine
app.delete('/api/v1/schooldays/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = schooldays.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Schoolday not found`,
        });
    }
    schooldays.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Schoolday deleted`,
    });
});

/*
--------------------------------------------------
Postitustega seotud funktsioonid
--------------------------------------------------
*/

const findPostById = (id: number): IPost | undefined => {
    const post = posts.find(element => {
        return element.id === id;
    });
    return post;
};

const getPostWithStatusAndUser = (post: IPost) => {
    const postStatus = getPostStatusById(post.statusId);
    let user: IUser | undefined = usersServices.findUserById(post.userId);
    if (!user) user = usersServices.unknownUser();
    const userWithoutPassword = usersServices.getUserWithoutPassword(user);

    const postWithStatusAndUser = {
        id: post.id,
        title: post.title,
        user: userWithoutPassword,
        status: postStatus,
    };
    return postWithStatusAndUser;
};

const getPostStatusById = (id: number): IPostStatus | undefined => {
    let postStatus: IPostStatus | undefined = postStatuses.find(element => element.id === id);
    if (!postStatus) {
        postStatus = {
            id: 0,
            status: 'Unknown',
        };
    };
    return postStatus;
}
/*
--------------------------------------------------
Kommentaaridega seotud funktsioonid
--------------------------------------------------
*/
const getCommentById = (id: number): IComment | undefined => {
    const comment = comments.find(element => {
        return element.id === id;
    });
    return comment;
};

const findCommentsByPostId = (id: number): IComment[] => {
    const postComments = comments.filter(comment => comment.postId === id);
    return postComments;
}

/*
--------------------------------------------------
Kodutööga seotud funktsioonid
--------------------------------------------------
*/

//ÕPPEAINED

//Õppeaine leidmine ID järgi
const findCourseById = (id: number): ICourse | undefined => {
    let course: ICourse | undefined = courses.find(element => element.id === id);
    return course;
};







// Õppeaine muutmine
app.patch('/api/v1/courses/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { courseName, courseCode } = req.body;
    const course: ICourse | undefined = findCourseById(id);
    if (!course) {
        return res.status(404).json({
            success: false,
            message: `Course not found`,
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
});


//ÕPPEJÕUD

//KURSUSED
//KOOLIPÄEVAD


app.listen(PORT, () => {
    console.log('Server is running');
});

