import { Request, Response } from 'express';
import { groups } from '../../mockData';
import { IGroup } from './interfaces';

const groupsControllers = {
    getGroups: (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'List of groups',
            groups
        });
    },
    addGroup: (req: Request, res: Response) => {
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
    },
    editGroup: (req: Request, res: Response) => {
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
    },
    deleteGroup: (req: Request, res: Response) => {
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
    }
}

export default groupsControllers;