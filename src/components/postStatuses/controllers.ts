import { Request, Response } from 'express';
import { postStatuses } from '../../mockData';
import { IPostStatus } from './interfaces';
import postStatusesService from './services';

const postStatusesControllers = {
    getPostStatuses: (req: Request, res: Response) => {
        const postStatuses: IPostStatus[] = postStatusesService.getPostStatuses();
        res.status(200).json({
            success: true,
            message: 'List of post statuses',
            postStatuses,
        });
    },
    getPostStatusById: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const postStatuses: IPostStatus | undefined = postStatusesService.getPostStatusById(id);
        if (!postStatuses) {
            return res.status(404).json({
                success: false,
                message: `Post status not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: `Post status`,
            data: {
                postStatuses,
            },
        });
    }
};

export default postStatusesControllers;