import prisma from '@/lib/client'
import React from 'react'
import CommentList from './CommentList'

const Comments = async ({ postId }: { postId: number }) => {
    const comments = await prisma.comment.findMany({
        where: { postId },
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className=''>
            <CommentList comments={comments} postId={postId} />
        </div>
    )
}

export default Comments