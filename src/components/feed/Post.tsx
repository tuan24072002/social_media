import Image from 'next/image'
import React, { Suspense } from 'react'
import Comments from './Comments'
import { Post as PostType, User } from '@prisma/client'
import PostInteraction from './PostInteraction'
import Link from 'next/link'
import PostInfo from './PostInfo'
import { auth } from '@clerk/nextjs/server'

type FeedPostType = PostType & { user: User } & { likes: [{ userId: string }] } & { _count: { comments: number } }
const Post = ({ post }: { post: FeedPostType }) => {
    const { userId } = auth()
    return (
        <div className='flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg'>
            <div className='flex items-center justify-between'>
                <Link href={`/profile/${post.user.username}`} className='flex items-center gap-4 group'>
                    <Image src={post.user.avatar || '/noAvatar.png'} alt='' width={40} height={40} className='w-10 h-10 rounded-full object-cover' />
                    <span className='font-medium group-hover:underline'>{(post.user.name && post.user.surname) ? post.user.name + " " + post.user.surname : "@" + post.user.username}</span>
                </Link>
                {
                    userId === post.user.id && <PostInfo postId={post.id} />
                }
            </div>
            <div className='flex flex-col gap-4'>
                {
                    post.desc &&
                    <p>
                        {post.desc}
                    </p>
                }
                {
                    post.image &&
                    <div className='w-full min-h-96 relative'>
                        <Image src={post.image} alt='' fill className='cursor-pointer object-cover rounded-md' />
                    </div>
                }
            </div>
            <Suspense fallback='Loading...'>
                <PostInteraction
                    postId={post.id}
                    likes={post.likes.map(like => like.userId)}
                    commentNumber={post._count.comments} />
            </Suspense>
            <Suspense fallback='Loading...'>
                <Comments postId={post.id} />
            </Suspense>
        </div>
    )
}

export default Post