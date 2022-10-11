import { comments, posts } from "../../mockData";
import postStatusesService from "../postStatuses/services";
import usersServices from "../users/services";
import { INewPost, IPost } from "./interfaces";
import { IUser } from "../users/interfaces";
import { IComment } from "../comments/interfaces";

const postsServices = {
    getPosts: () => {
        const postsWithStatusesAndUsers = posts.map(post => {
            const postWithStatusAndUser = postsServices.getPostWithStatusAndUser(post);
            return postWithStatusAndUser;
        });
        return postsWithStatusesAndUsers;
    },
    getPostById: (id: number): IPost | undefined => {
        const post = posts.find(element => {
            return element.id === id;
        });
        return post;
    },

    getPostWithStatusAndUser: (post: IPost) => {
        const postStatus = postStatusesService.getPostStatusById(post.statusId);
        let user: IUser | undefined = usersServices.findUserById(post.userId);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);

        const postWithStatusAndUser = {
            id: post.id,
            title: post.title,
            content: post.content,
            user: userWithoutPassword,
            status: postStatus,
        };
        return postWithStatusAndUser;
    },

};

export default postsServices;
