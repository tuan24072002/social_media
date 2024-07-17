import React from 'react'
import Post from '@/components/feed/Post'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/client'

const Feed = async ({ username }: { username?: string }) => {
    const { userId } = auth()
    let posts: any = [];
    if (username) {
        posts = await prisma.post.findMany({
            where: {
                user: { username }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }
    if (!username && userId) {
        const following = await prisma.follower.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        })
        const followingId = following.map(f => f.followingId)
        const id = [userId, ...followingId]
        posts = await prisma.post.findMany({
            where: {
                userId: {
                    in: id
                }
            },
            include: {
                user: true,
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    return (

        posts.length ?
            posts.map(post => (
                <Post key={post.id} post={post} />
            )) : <div className='flex flex-col gap-4 p-4 mb-[100vh] bg-white shadow-md rounded-lg'>
                No post found
            </div>
    )
}

export default Feed