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
import coursesControllers from './components/courses/controllers';
import lecturersControllers from './components/lecturers/controllers';
import groupsControllers from './components/groups/controllers';
import schooldaysControllers from './components/schooldays/controllers';

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




app.listen(PORT, () => {
    console.log('Server is running');
});

