"use client"
import { useUser } from '@clerk/nextjs'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'
import AddPostButton from './AddPostButton'
import { addPost } from '@/lib/action'

const AddPost = () => {
    const { user } = useUser()
    const [desc, setDesc] = useState('')
    const [img, setImg] = useState<any>()
    return (
        <form action={(formData) => { addPost(formData, img?.url || ''); setDesc(''); setImg('') }} className='p-4 bg-white shadow-md rounded-lg text-sm grid grid-cols-1 gap-4'>
            <div className='flex gap-4 justify-between'>
                <Image src={user?.imageUrl || '/noAvatar.png'} width={48} height={48} alt='' className='w-12 h-12 object-cover rounded-full' />
                <div className='flex-1'>
                    <div className='bg-slate-100 rounded-lg relative'>
                        <textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="What's on your mind?" name='desc' className='bg-transparent w-full h-full overflow-hidden outline-none p-2' rows={3}></textarea>
                        <Image src={'/emoji.png'} width={20} height={20} alt='' className='w-5 h-5 cursor-pointer absolute right-4 top-[50%] -translate-y-1/2' />
                    </div>
                    <div className='flex flex-wrap items-center gap-4 mt-4 text-gray-400'>
                        <CldUploadWidget uploadPreset='social' onSuccess={
                            (rs, { widget }) => {
                                setImg(rs.info)
                                widget.close()
                            }
                        }>
                            {({ open }) => {
                                return (
                                    <div className='flex items-center justify-between hover:bg-slate-100 w-20 px-2 py-1 rounded-md gap-2 cursor-pointer' onClick={() => open()}>
                                        <Image src={'/addImage.png'} width={20} height={20} alt='' className='w-5 h-5 cursor-pointer self-end' />
                                        Photo
                                    </div>
                                );
                            }}
                        </CldUploadWidget>

                        <div className='flex items-center justify-between hover:bg-slate-100 w-20 px-2 py-1 rounded-md gap-2 cursor-pointer'>
                            <Image src={'/addVideo.png'} width={20} height={20} alt='' className='w-5 h-5 cursor-pointer self-end' />
                            Video
                        </div>
                        <div className='flex items-center justify-between hover:bg-slate-100 w-20 px-2 py-1 rounded-md gap-2 cursor-pointer'>
                            <Image src={'/poll.png'} width={20} height={20} alt='' className='w-5 h-5 cursor-pointer self-end' />
                            Poll
                        </div>
                        <div className='flex items-center justify-between hover:bg-slate-100 w-20 px-2 py-1 rounded-md gap-2 cursor-pointer'>
                            <Image src={'/addEvent.png'} width={20} height={20} alt='' className='w-5 h-5 cursor-pointer self-end' />
                            Event
                        </div>
                    </div>
                </div>
            </div>
            <AddPostButton />
        </form>
    )
}

export default AddPost