import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileCard = async () => {
    const { userId } = auth()
    if (!userId) return null
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            _count: {
                select: {
                    followers: true
                }
            },
            followers: {
                include: {
                    following: true
                }
            }
        }
    })

    if (!user) return null

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
            <div className='h-20 relative'>
                <Image src={user.cover || '/noCover.png'} alt='' fill className='rounded-md object-cover' />
                <Image src={user.avatar || '/noAvatar.png'} alt='' width={48} height={48} className='rounded-full w-12 h-12 object-cover absolute left-0 right-0 -bottom-6 m-auto ring-1 ring-white z-10' />
            </div>
            <div className='h-20 flex flex-col gap-2 items-center'>
                <span className='font-semibold flex items-center gap-2'>{(user.name && user.surname) ? user.name + " " + user.surname : "@" + user.username}<Image src={'/accept.png'} alt='' width={12} height={12} title='Identity verified' className='cursor-pointer' /></span>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        {
                            user.followers.length > 0 && user.followers.map((follower, index) => {
                                if (index < 3) {
                                    return (
                                        <Image src={follower.following.avatar || '/noAvatar.png'} alt='' width={12} height={12} className='rounded-full w-3 h-3 object-cover' key={follower.id} />
                                    )
                                }
                            })
                        }
                    </div>
                    <span className='text-xs text-gray-500'>{user._count.followers} Followers</span>
                </div>
                <Link href={`/profile/${user.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</Link>
            </div>
        </div>
    )
}

export default ProfileCard