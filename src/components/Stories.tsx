import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import StoryList from './StoryList'

const Stories = async () => {
    const { userId: currentUserId } = auth()
    if (!currentUserId) return null;
    const following = await prisma.follower.findMany({
        where: {
            followerId: currentUserId
        },
        select: {
            followingId: true
        }
    })
    const followingId = following.map(f => f.followingId)
    const id = [...followingId, currentUserId]
    const stories = await prisma.story.findMany({
        where: {
            expiredAt: {
                gt: new Date(),
            },
            userId: {
                in: id
            }
        },
        include: {
            user: true
        }
    });

    return (
        <div className='p-4 bg-white rounded-lg shadow-md scrollbar-hide overflow-scroll text-sm'>
            <div className='flex gap-8 w-max'>
                <StoryList stories={stories} userId={currentUserId} />
            </div>
        </div>
    )
}

export default Stories