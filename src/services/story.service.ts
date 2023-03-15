import prisma from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import type { StoryWithId, StoryCreate, StoryUpdate } from "../schemas/story.schema";

const getAllStories = async (): Promise<StoryWithId[]> => {
    return prisma.story.findMany({
        select: {
            id: true,
            projectId: true,
            name: true,
            description: true,
            priority: true,
            businessValue: true
        }
    });
};

const getStoryById = async (id: number): Promise<StoryWithId | null> => {
    return prisma.story.findUniqueOrThrow({
        where: {
            id
        },
    });
};

const createStory = async (projectId: number, story: StoryCreate): Promise<StoryWithId> => {
    let created_story = prisma.story.create({
        data: {
            projectId: projectId,
            name: story.name,
            description: story.description,
            priority: story.priority,
            businessValue: story.businessValue
        }
    });
    return created_story;
};

const deleteStory = async (id: number): Promise<StoryWithId> => {
    let res = prisma.story.delete({
        where: {
            id: id
        }
    });
    return res;
};

const updateStory = async (id: number, storyUpdate: StoryUpdate): Promise<StoryWithId> => {
    let res = prisma.story.update({
        where: {
            id
        },
        data: {
            name: storyUpdate.name,
            description: storyUpdate.description,
            priority: storyUpdate.priority,
            businessValue: storyUpdate.businessValue
        },
    });
    return res;
}


const StoryService = {
    getAllStories,
    getStoryById,
    createStory,
    deleteStory,
    updateStory
};

export default StoryService;