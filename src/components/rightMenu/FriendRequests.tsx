import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import FriendRequestList from './FriendRequestList'

const FriendRequests = async () => {
    const { userId } = auth()
    if (!userId) return null
    const requests = await prisma.followRequest.findMany({
        where: {
            receiverId: userId
        },
        include: {
            sender: true
        }
    })
    if (requests.length === 0) return null

    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
            <div className='flex justify-between items-center font-medium'>
                <span className='text-gray-500'>Friend Requests</span>
                <Link href={'/'} className='text-blue-500 text-xs cursor-pointer hover:underline'>See all</Link>
            </div>
            <FriendRequestList requests={requests} />
        </div>
    )
}

export default FriendRequests