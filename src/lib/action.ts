"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"
import { z } from "zod"
import { revalidatePath } from "next/cache"

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        })
        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        } else {
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })
            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id
                    }
                })
            } else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: userId
            }
        })
        if (existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id
                }
            })
        } else {
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        const exsitingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (exsitingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: exsitingFollowRequest.id
                }
            })
            await prisma.follower.create({
                data: {
                    followerId: userId,
                    followingId: currentUserId
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const declineFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        const exsitingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (exsitingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: exsitingFollowRequest.id
                }
            })
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const updateProfile = async (prevState: { success: boolean, error: boolean }, payload: { formData: FormData, cover: string }) => {
    const { formData, cover } = payload

    const fields = Object.fromEntries(formData)

    const filterFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    )

    const profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    })
    const validatedFields = profile.safeParse({ ...filterFields, cover })

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            error: true
        }
    }
    const { userId } = auth()
    if (!userId) {
        return {
            success: false,
            error: true
        }
    }
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: validatedFields.data
        })
        return {
            success: true,
            error: false
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const switchLike = async (postId: number) => {
    const { userId } = auth()
    try {
        const existingLike = await prisma.like.findFirst({
            where: { postId, userId }
        })
        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id
                }
            })
        } else {
            await prisma.like.create({
                data: { postId, userId }
            })
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const addComment = async (postId: number, desc: string) => {
    const { userId } = auth()
    if (!userId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        const createdComment = await prisma.comment.create({
            data: {
                userId,
                desc,
                postId
            },
            include: {
                user: true
            }
        })
        return createdComment
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const addPost = async (formData: FormData, img: string) => {
    const { userId } = auth()
    if (!userId) {
        throw new Error(`User is not authenticated !`);
    }
    const desc = formData.get('desc') as string
    const validateDesc = z.string().min(1).max(255).safeParse(desc)
    if (!validateDesc.success) {
        return;
    }
    try {
        await prisma.post.create({
            data: {
                userId,
                desc: validateDesc.data,
                image: img || ''
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const deletePost = async (postId: number) => {
    const { userId } = auth()
    if (!userId) {
        throw new Error(`User is not authenticated !`);
    }
    try {
        await prisma.post.delete({
            where: {
                id: postId,
                userId,
            }
        })
        revalidatePath('/')
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}

export const addStory = async (img: string) => {
    const { userId } = auth()
    if (!userId) {
        throw new Error(`User is not authenticated !`);
    }

    try {
        const existingStory = await prisma.story.findFirst({
            where: {
                userId
            }
        })
        if (existingStory) {
            await prisma.story.delete({
                where: {
                    userId
                }
            })
        }
        const createdStory = await prisma.story.create({
            data: {
                userId,
                image: img,
                expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include: {
                user: true
            }
        })
        return createdStory;
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong !`);
    }
}