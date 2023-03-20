import prisma from "../../libs/prisma";
import { UsersOnProjects } from "@prisma/client";
import { ProjectWithId } from "../schemas/project.schema";

const addUserToProject = async (groupMembership: UsersOnProjects): Promise<UsersOnProjects> => {
    return prisma.usersOnProjects.create({
        data: groupMembership
    })
}

const removeUserFromProject = async (groupMembership: UsersOnProjects) => {
    return prisma.usersOnProjects.deleteMany({
        where: {
            userId: groupMembership.userId,
            projectId: groupMembership.projectId
        }
    })
}

// TODO: Update user role in project

const getUserRoleInProject = async (userId: number, projectId: number): Promise<UsersOnProjects|null> => {
    return prisma.usersOnProjects.findFirst({
            where: {
                userId: userId,
                projectId: projectId
            }
        }
    );
}


const getAllProjectsOfUser = async (userId: number, expandProject: boolean, expandUser: boolean): Promise<ProjectWithId[]> => {
    return prisma.project.findMany({
        where: {
            users: {
                some: {
                    userId: userId
                }
            }
        }
    });
}

const getAllUsersOfProject = async (projectId: number): Promise<UsersOnProjects[]> => {
    return prisma.usersOnProjects.findMany({
        where: {
            projectId: projectId
        }
    })
}

const UsersOnProjectsService = {
    addUserToProject,
    getAllProjectsOfUser,
    getAllUsersOfProject,
    getUserRoleInProject,
    removeUserFromProject
}

export default UsersOnProjectsService;