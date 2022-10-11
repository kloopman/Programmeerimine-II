import { Request, Response } from 'express';
import { posts } from '../../mockData';
import commentsService from '../comments/services';
import { IPost } from './interfaces';
import postsServices from './services';

const postsControllers = {
    getPosts: (req: Request, res: Response) => {
        const postsWithStatusesAndUsers = postsServices.getPosts();
        res.status(200).json({
            success: true,
            message: 'List of posts',
            posts: postsWithStatusesAndUsers,
        });
    },
    getPostById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = postsServices.getPostById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        };

        const postWithStatusAndUser = postsServices.getPostWithStatusAndUser(post);
        return res.status(200).json({
            success: true,
            message: `Post`,
            data: {
                post: postWithStatusAndUser,
            },
        });
    },
    createPost: (req: Request, res: Response) => {
        const { title, content, userId, statusId } = req.body;
        if (!title || !content || !userId || !statusId) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (title, content, userId, statusId)`,
            });
        }
        const id = posts.length + 1;
        const newPost: IPost = {
            id,
            title,
            content,
            userId,
            statusId,
        };
        posts.push(newPost);

        return res.status(201).json({
            success: true,
            message: `Post with id ${newPost.id} created`,
        });
    },
    editPost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { title, content, statusId } = req.body;
        const post = posts.find(element => {
            return element.id === id;
        });
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        }
        if (!title && !content && !statusId) {
            return res.status(400).json({
                success: false,
                message: `Nothing to change`,
            });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (statusId) post.statusId = statusId;

        return res.status(200).json({
            success: true,
            message: `Post updated`,
        });
    },
    deletePost: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = posts.findIndex(element => element.id === id);
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: `Post not found`,
            });
        }
        posts.splice(index, 1);
        return res.status(200).json({
            success: true,
            message: `Post deleted`,
        });
    },
    getPostComment: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const comments = commentsService.findCommentsByPostId(id);
        return res.status(200).json({
            success: true,
            message: `Comments of post with id: ${id}`,
            data: {
                comments,
            },
        });
    }
};

export default postsControllers;