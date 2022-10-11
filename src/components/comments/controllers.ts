import { Request, Response } from 'express';
import { comments } from '../../mockData';
import { IUser } from '../users/interfaces';
import usersServices from '../users/services';
import { IComment } from './interfaces';
import commentsService from './services';

const commentsControllers = {
    getComments: (req: Request, res: Response) => {
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

        res.status(200).json({
            success: true,
            message: 'List of all comments',
            comments: commentsWithUsers,
        });
    },
    getCommentById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comment = commentsService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: `Comment not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Comment`,
            data: {
                comment,
            },
        });
    },
    createComment: (req: Request, res: Response) => {
        const { postId, content } = req.body;
        let { userId } = req.body;
        if (!postId || !content) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (postId, content)`,
            });
        }
        if (!userId) userId = null;
        const id = comments.length + 1;
        const comment: IComment = {
            id,
            userId,
            postId,
            content,
        };
        comments.push(comment);

        return res.status(201).json({
            success: true,
            message: `comment with id ${comment.id} created`,
        });
    },
    deleteComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const result = commentsService.deleteComment(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: `Comment not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Comment deleted`,
        });
    }
};

export default commentsControllers;