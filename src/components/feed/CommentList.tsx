"use client"
import { addComment } from '@/lib/action'
import { useUser } from '@clerk/nextjs'
import { Comment, User } from '@prisma/client'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useOptimistic, useState } from 'react'

type CommentWithUser = Comment & { user: User }
const CommentList = ({ comments, postId }: { comments: CommentWithUser[], postId: number }) => {
    const { user } = useUser()
    const [commentState, setCommentState] = useState(comments)
    const [desc, setDesc] = useState('')
    const [optimisticComments, addOptimisticComment] = useOptimistic(
        commentState,
        (state, value: CommentWithUser) => [...state, value]
    )
    const add = async () => {
        if (!user || desc === '') return
        addOptimisticComment({
            id: Math.random(),
            desc,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            userId: user.id,
            postId: postId,
            user: {
                id: user.id,
                avatar: user.imageUrl || 'noAvatar.png',
                name: "",
                surname: "",
                city: "",
                school: "",
                work: "",
                website: "",
                cover: "",
                createdAt: new Date(Date.now()),
                username: "Sending please wait...",
                description: ""
            }
        })
        try {
            const createdComment = await addComment(postId, desc)
            setCommentState(prev => [createdComment, ...prev])
            setDesc('')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                user &&
                <div className='flex items-center gap-4'>
                    <Image src={user.imageUrl || '/noAvatar.png'} alt='' width={32} height={32} className='w-8 h-8 rounded-full object-cover' />
                    <form action={add} className='flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full'>
                        <input type="text" placeholder='Write a comment...' className='bg-transparent flex-1 outline-none' onChange={(e) => setDesc(e.target.value)} value={desc} />
                        <Image src='/emoji.png' alt='' width={16} height={16} className='cursor-pointer' />
                    </form>
                </div>
            }
            <div className=''>
                {
                    optimisticComments.map(comment => {
                        return (
                            <div className='flex gap-4 justify-between mt-6' key={comment.id}>
                                <Link href={`/profile/${comment.user.username}`}><Image src={comment.user.avatar || 'noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' /></Link>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <div className='flex gap-2 items-center'>
                                        <Link href={`/profile/${comment.user.username}`} className='font-medium cursor-pointer hover:underline'>{(comment.user.name && comment.user.surname) ? comment.user.name + " " + comment.user.surname : "@" + comment.user.username}</Link>
                                        <p className='text-xs text-slate-400'>{moment(comment.createdAt).format(`DD/MM/yyyy HH:mm`)}</p>
                                    </div>
                                    <p>
                                        {comment.desc}
                                    </p>
                                    <div className='flex items-center gap-8 text-xs text-gray-500'>
                                        <div className='flex items-center gap-4'>
                                            <Image src={'/like.png'} alt='' width={12} height={12} className='cursor-pointer w-3 h-3' />
                                            <span className='text-gray-300'>|</span>
                                            <span className='text-gray-500'>123 Likes</span>
                                        </div>
                                        <div className='cursor-pointer'>Reply</div>
                                    </div>
                                </div>
                                <Image src={'/more.png'} alt='' width={16} height={16} className='cursor-pointer w-4 h-4' />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CommentList