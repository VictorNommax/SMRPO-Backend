import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { general_error_handler } from "../utils/error_handling";
import UsersOnProjectsService from "../services/usersOnProjects.service";

const addUserToProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleAdded = await UsersOnProjectsService.addUserToProject(req.body);
        res.status(200).json(roleAdded);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const removeUserFromProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UsersOnProjectsService.removeUserFromProject(req.body);
        res.sendStatus(204);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const getSingle: RequestHandler = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        let userId = parseInt(req.params.userId, 10);
        let projectId = parseInt(req.params.projectId, 10);
        const userRoleInProject = await UsersOnProjectsService.getUserRoleInProject(userId, projectId);
        return res.status(200).json(userRoleInProject);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const getProjectsOfUser: RequestHandler = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        let userId = parseInt(req.params.userId, 10);
        const projectsOfUser = await UsersOnProjectsService.getAllProjectsOfUser(userId);
        return res.status(200).json(projectsOfUser);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const getUsersOfProject: RequestHandler = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        let projectId = parseInt(req.params.projectId, 10);
        const usersOfProject = await UsersOnProjectsService.getAllUsersOfProject(projectId);
        return res.status(200).json(usersOfProject);
    } catch (err) {
        general_error_handler(err, res, next);
    }
}

const UsersOnProjectsController = {
    getSingle,
    getUsersOfProject,
    getProjectsOfUser,
    addUserToProject,
    removeUserFromProject
}

export default UsersOnProjectsController;