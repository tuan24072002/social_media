"use client"
import { updateProfile } from '@/lib/action'
import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useActionState, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { CldUploadWidget } from "next-cloudinary"
import { useRouter } from 'next/navigation'
import UpdateButton from './UpdateButton'

const UpdateUser = ({ user }: { user: User }) => {
    const [open, setOpen] = useState(false)
    const [cover, setCover] = useState<any>({})
    const [state, formAction] = useActionState(updateProfile, { success: false, error: false })
    const router = useRouter()
    const handleClose = () => {
        setCover({})
        setOpen(false)
        state.success && router.refresh()
    }

    return (
        <div className=''>
            <span onClick={() => setOpen(true)} className='text-blue-500 text-xs cursor-pointer hover:underline'>Update</span>
            {
                open &&
                <div className='fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50'>
                    <form action={(formData) => formAction({ formData, cover: cover?.url || "" })} className='p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative'>
                        <h1>Update Profile</h1>
                        <div className='mt-4 text-xs text-gray-500'>
                            Use the navbar profile to change the avatar or username.
                        </div>
                        <CldUploadWidget uploadPreset='social' onSuccess={(rs) => setCover(rs?.info)}>
                            {({ open }) => {
                                return (
                                    <div className='flex flex-col gap-4 my-4' onClick={() => open()}>
                                        <label htmlFor="">Cover Picture</label>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <Image src={cover.url !== undefined ? cover.url : user.cover !== '' ? user.cover : '/noCover.png'} alt='' width={48} height={32} className='w-12 h-8 rounded-md object-cover' />
                                            <span className='text-xs underline text-gray-600'>Change</span>
                                        </div>
                                    </div>
                                );
                            }}
                        </CldUploadWidget>

                        <div className='flex justify-between gap-2 xl:gap-4'>
                            <div className='flex flex-col gap-4 xl:gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>First Name</label>
                                    <input type="text" name="name" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.name || 'John'} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>Surname</label>
                                    <input type="text" name="surname" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.surname || 'Doe'} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>Description</label>
                                    <input type="text" name="description" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.description || 'Have a nice day...'} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>City</label>
                                    <input type="text" name="city" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.city || 'Ho Chi Minh City'} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 xl:gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>School</label>
                                    <input type="text" name="school" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.school || 'HUIT'} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>Work</label>
                                    <input type="text" name="work" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.work || 'ABC Company'} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="" className='text-xs text-gray-500'>Website</label>
                                    <input type="text" name="website" className='ring-1 ring-gray-300 p-3 rounded-md text-sm' placeholder={user.website || 'http://localhost:3000/'} />
                                </div>
                            </div>
                        </div>
                        <UpdateButton />
                        {
                            state.success && <span className='text-green-500 text-center'>Profile has been updated !</span>
                        }
                        {
                            state.error && <span className='text-red-500 text-center'>Something went wrong !</span>
                        }
                        <IoMdClose className='absolute text-xl right-2 top-2 cursor-pointer' onClick={handleClose} />
                    </form>
                </div>
            }
        </div >
    )
}

export default UpdateUser