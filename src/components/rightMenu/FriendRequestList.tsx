"use client"
import { acceptFollowRequest, declineFollowRequest } from '@/lib/action'
import { FollowRequest, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'

type RequestWithUser = FollowRequest & {
    sender: User
}
const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
    const [requestState, setRequestState] = useState(requests)

    const accept = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await acceptFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
            console.log(error);
        }
    }

    const decline = async (requestId: number, userId: string) => {
        removeOptimisticRequest(requestId)
        try {
            await declineFollowRequest(userId)
            setRequestState(prev => prev.filter(req => req.id !== requestId))
        } catch (error) {
            console.log(error);
        }
    }

    const [optimisticRequests, removeOptimisticRequest] = useOptimistic(
        requestState,
        (state, value: number) => state.filter((req) => req.id !== value)
    )
    return (
        <div className=''>
            {
                optimisticRequests.map(req => (
                    <div className='flex items-center justify-between' key={req.id}>
                        <div className='flex items-center gap-4'>
                            <Image src={req.sender.avatar || '/noAvatar.png'} alt='' height={40} width={40} className='w-10 h-10 rounded-full object-cover' />
                            <span className='font-semibold'>{(req.sender.name && req.sender.surname) ? req.sender.name + " " + req.sender.surname : "@" + req.sender.username}</span>
                        </div>
                        <div className='flex items-center gap-3 justify-end'>
                            <form action={() => accept(req.id, req.senderId)}>
                                <button>
                                    <Image src={'/accept.png'} alt='' height={20} width={20} className='cursor-pointer' />
                                </button>
                            </form>
                            <form action={() => decline(req.id, req.senderId)}>
                                <button>
                                    <Image src={'/reject.png'} alt='' height={20} width={20} className='cursor-pointer' />
                                </button>
                            </form>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FriendRequestList