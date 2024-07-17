import Image from 'next/image'
import React from 'react'

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
    return (
        <div className='p-4 bg-white rounded-lg shadow-md text-sm'>
            <div className='flex items-center justify-between text-gray-500 font-medium'>
                <span>Sponsored Ads</span>
                <Image src={'/more.png'} alt='' height={16} width={16} className='cursor-pointer' />
            </div>
            <div className={`flex flex-col mt-4 ${size === 'sm' ? 'gap-2' : 'gap-4'}`}>
                <div className={`relative w-full ${size === 'sm' ? 'h-24' : size === 'md' ? 'h-36' : 'h-48'}`}>
                    <Image src={'https://images.pexels.com/photos/13770293/pexels-photo-13770293.png?auto=compress&cs=tinysrgb&w=300&lazy=load'} alt='' fill className='rounded-lg object-cover' />
                </div>
                <div className='flex items-center gap-4'>
                    <Image src={'https://images.pexels.com/photos/13770293/pexels-photo-13770293.png?auto=compress&cs=tinysrgb&w=300&lazy=load'} alt='' width={24} height={24} className='rounded-full w-6 h-6 object-cover' />
                    <span className='text-blue-500 font-medium'>TS Company</span>
                </div>
                <p className={size === 'sm' ? 'text-xs line-clamp-2' : size === 'md' ? 'text-sm line-clamp-3' : 'text-sm line-clamp-4'}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum autem accusamus ab harum illo dolorum odio veniam ex, explicabo animi, facere, laboriosam corrupti maxime. Voluptate dignissimos repellendus tempora maiores dolor.
                </p>
                <button className='bg-gray-200 text-gray-500 p-2 text-xs rounded-lg'>Learn more</button>
            </div>
        </div>
    )
}

export default Ad