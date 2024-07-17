"use client"
import { addStory } from '@/lib/action'
import { useUser } from '@clerk/nextjs'
import { Story, User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
import ViewStory from './ViewStory'

type StoryWithUser = Story & { user: User }
const StoryList = ({ stories, userId }: { stories: StoryWithUser[], userId: string }) => {
    const [viewStory, setViewStory] = useState(false)
    const [story, setStory] = useState<StoryWithUser | null>(null);
    const [storyList, setStoryList] = useState(stories.sort((a, b) => (
        a.userId === userId ? -1 : b.userId === userId ? 1 : 0
    )))
    const [img, setImg] = useState<any>()
    const { user, isLoaded } = useUser()

    const [optimisticStories, addOptimisticStory] = useOptimistic(
        storyList,
        (state, value: StoryWithUser) => [value, ...state]
    )
    const add = async () => {
        if (!img?.url) return
        addOptimisticStory({
            id: Math.random(),
            image: img.url,
            createdAt: new Date(Date.now()),
            expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            userId: userId,
            user: {
                id: userId,
                avatar: user?.imageUrl || 'noAvatar.png',
                name: "",
                surname: "",
                city: "",
                school: "",
                work: "",
                website: "",
                cover: "",
                createdAt: new Date(Date.now()),
                username: "Sending...",
                description: ""
            }
        })
        try {
            const createdStory = await addStory(img.url)
            if (storyList.map(story => story.userId === createdStory.userId)) {
                setStoryList(storyList.filter(story => story.userId !== createdStory.userId))
                setStoryList(prev => [createdStory, ...prev])
            } else {
                setStoryList(prev => [createdStory, ...prev])
            }
            setImg(null)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CldUploadWidget uploadPreset='social' onSuccess={
                (rs, { widget }) => {
                    setImg(rs.info)
                    widget.close()
                }
            }>
                {({ open }) => {
                    return (
                        <div className='flex flex-col items-center gap-2 cursor-pointer'>
                            <div className='relative flex justify-center'>
                                <Image src={img?.url || user?.imageUrl || '/noAvatar.png'} alt='' width={80} height={80} className='w-20 h-20 rounded-full ring-2 object-cover opacity-95' onClick={() => open()} />
                                {
                                    img ?
                                        <IoIosClose className='w-6 h-6 absolute -top-2 -right-2 bg-gray-200 p-1/2 rounded-full' onClick={() => setImg('')} /> :
                                        <FaPlus className='w-6 h-6 text-white bg-blue-500 p-1 rounded-full absolute -bottom-2' onClick={() => open()} />
                                }
                            </div>
                            {
                                img ?
                                    <form action={add}>
                                        <button className='text-xs bg-blue-500 p-1 rounded-md text-white'>Send</button>
                                    </form> :
                                    <span className='font-medium'>Add a story</span>
                            }
                        </div>
                    );
                }}
            </CldUploadWidget>
            {
                optimisticStories.map(story => (
                    <div className='flex flex-col items-center gap-2 cursor-pointer' key={story.id} onClick={() => { setViewStory(true); setStory(story) }}>
                        <Image src={story.user.avatar || 'noAvatar.png'} alt='' width={80} height={80} className='w-20 h-20 rounded-full object-cover ring-2' />
                        <span className='font-medium'>{story.user.name || "@" + story.user.username}</span>
                    </div>
                ))
            }
            {
                viewStory && <ViewStory story={story} setViewStory={setViewStory} />
            }

        </>
    )
}

export default StoryList