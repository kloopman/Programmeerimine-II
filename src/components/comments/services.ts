import { comments } from "../../mockData";
import { IUser } from "../users/interfaces";
import usersServices from "../users/services";
import { IComment } from "./interfaces";


const commentsService = {
    getAllComments: () => {
        const commentsWithUsers = comments.map(comment => {
            let user: IUser | undefined = usersServices.findUserById(comment.id);
            if (!user) user = usersServices.unknownUser();
            const userWithoutPassword = usersServices.getUserWithoutPassword(user);
            const commentWithUser = {
                id: comment.id,
                content: comment.content,
                user: userWithoutPassword,
            };
            return commentWithUser;
        });
        return commentsWithUsers;
    },
    getCommentById: (id: number): IComment | undefined => {
        const comment = comments.find(element => {
            return element.id === id;
        });
        return comment;
    },
    findCommentsByPostId: (id: number): IComment | undefined => {
        const comment = comments.find(element => {
            return element.id === id;
        });
        return comment;
    },
    deleteComment: (id: number): Boolean => {
        const index = comments.findIndex(element => element.id === id);
        if (index === -1) return false;
        comments.splice(index, 1);
        return true;
    },
};

export default commentsService;