import { IComment } from "./components/comments/interfaces";
import { ICourse } from "./components/courses/interfaces";
import { IGroup } from "./components/groups/interfaces";
import { ILecturer } from "./components/lecturers/interfaces";
import { IPost } from "./components/posts/interfaces";
import { IPostStatus } from "./components/postStatuses/interfaces";
import { ISchoolDay } from "./components/schooldays/interfaces";
import { IUser } from "./components/users/interfaces";

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Kerli',
        lastName: 'Loopman',
        email: 'kloopman@tlu.ee',
        password: 'kerli',
    },
    {
        id: 2,
        firstName: 'Maali',
        lastName: 'Maasikas',
        email: 'maali@maasikas.ee',
        password: 'maasikas',
    },
];

const posts: IPost[] = [
    {
        id: 1,
        title: 'Esimene postitus',
        content: 'Esimese postituse sisu',
        userId: 2,
        statusId: 7,
    },
    {
        id: 2,
        title: 'Teine postitus',
        content: 'Teise postituse sisu',
        userId: 1,
        statusId: 2,
    },
];

const postStatuses: IPostStatus[] = [
    {
        id: 1,
        status: 'Draft',
    },
    {
        id: 2,
        status: 'Public',
    },
    {
        id: 3,
        status: 'Private',
    },
];

const comments: IComment[] = [
    {
        id: 1,
        userId: 1,
        postId: 1,
        content: 'Esimese postituse esimene kommentaar',
    },
    {
        id: 2,
        userId: 1,
        postId: 2,
        content: 'Teise postituse esimene kommentaar',
    },
    {
        id: 3,
        userId: 1,
        postId: 2,
        content: 'Teise postituse teine kommentaar',
    },
]

const courses: ICourse[] = [
    {
        id: 1,
        courseName: 'Programmeerimine I',
        courseCode: 'HKI3503.HK',
    },
    {
        id: 2,
        courseName: 'Programmeerimine II',
        courseCode: 'HKI5003.HK',
    },
];

const lecturers: ILecturer[] = [
    {
        id: 1,
        lecturerName: 'Martti Raavel',
    },
    {
        id: 2,
        lecturerName: 'Priidu Paomets',
    },
];

const groups: IGroup[] = [
    {
        id: 1,
        groupName: 'RIF2',
    },
    {
        id: 2,
        groupName: 'KTD2',
    },
];

const schooldays: ISchoolDay[] = [
    {
        id: 1,
        dayName: '28. september, 2022',
    },
    {
        id: 2,
        dayName: '28. september, 2022',
    },
];

export { schooldays, groups, lecturers, courses, comments, postStatuses, posts, users };

