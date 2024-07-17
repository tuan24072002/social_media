"use client"
import { Story, User } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io';

type StoryWithUser = Story & { user: User }
const ViewStory = ({ story, setViewStory }: { story: StoryWithUser, setViewStory: any }) => {
    if (!story.image) return null;
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev === 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + (100 / 10)
            })
        }, 1000)
        if (progress === 100) {
            setViewStory(false)
        }
        return (() => clearInterval(interval))
    }, [progress])

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.9)] z-50 flex items-center justify-center'>
            <div className='relative bg-slate-600 h-[600px] w-[500px] rounded-md shadow-lg'>
                <Image src={story.image ? story.image : ''} alt='' fill className='object-cover rounded-md' />
                <IoMdCloseCircleOutline className='absolute top-0 right-0 text-white cursor-pointer' size={'2em'} onClick={() => setViewStory(false)} />
                <Link href={`profile/${story.user.username}`} className='flex items-center gap-2 absolute top-2 left-2 px-2 py-0.5 bg-[rgba(255,255,255,0.6)] rounded-md'>
                    <div className='w-10 h-10 relative'>
                        <Image src={story?.user?.avatar || '/noAvatar.png'} alt='' fill className='object-cover rounded-full' />
                    </div>
                    <div className='flex flex-col flex-1'>
                        <p className='text-black font-medium'>{(story.user.name && story.user.surname) ? story.user.name + " " + story.user.surname : "@" + story.user.username}</p>
                        <p className='text-xs capitalize'>{moment(story.createdAt).fromNow()}</p>
                    </div>
                </Link>

                <div className='w-full h-1 absolute bottom-0 bg-white rounded-full'>
                    <span className='h-full bg-red-600 block' style={{ width: `${progress}%` }}></span>
                </div>
            </div>
        </div>
    )
}

export default ViewStory