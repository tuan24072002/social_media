import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Image from 'next/image'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ImSpinner2 } from "react-icons/im";
import { FaRegUserCircle } from 'react-icons/fa'
const Navbar = () => {
    return (
        <div className='h-24 flex items-center justify-between'>
            <div className='md:hidden lg:block w-[30%]'>
                <Link href={'/'} className='font-bold text-xl text-blue-600'>TS</Link>
            </div>
            <div className='hidden md:flex w-[50%] text-sm items-center justify-between'>
                <div className='flex gap-6 text-gray-600'>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src="/home.png" alt="Homepage" width={16} height={16} className='w-4 h-4' />
                        <span>Homepage</span>
                    </Link>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src="/friends.png" alt="Friends" width={16} height={16} className='w-4 h-4' />
                        <span>Friends</span>
                    </Link>
                    <Link href={'/'} className='flex items-center gap-2'>
                        <Image src="/stories.png" alt="Stories" width={16} height={16} className='w-4 h-4' />
                        <span>Stories</span>
                    </Link>
                </div>
                <div className='hidden xl:flex p-2 bg-slate-100 items-center rounded-xl'>
                    <input type="text" name="" id="" placeholder='Search...' className='bg-transparent outline-none' />
                    <Image src={'/search.png'} alt='Search' width={14} height={14} />
                </div>
            </div>
            <div className='w-[20%] flex items-center gap-4 xl:gap-8 justify-end'>
                <ClerkLoading>
                    <ImSpinner2 className='animate-spin' size={'1.5em'} />
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedIn>
                        <div className='flex items-center gap-4 w-fit'>
                            <div className='cursor-pointer'>
                                <Image src={'/people.png'} alt='' width={24} height={24} />
                            </div>
                            <div className='cursor-pointer'>
                                <Image src={'/messages.png'} alt='' width={20} height={20} />
                            </div>
                            <div className='cursor-pointer'>
                                <Image src={'/notifications.png'} alt='' width={20} height={20} />
                            </div>
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className='cursor-pointer items-center gap-2 text-sm md:flex hidden hover:text-blue-900'>
                            <FaRegUserCircle width={20} height={20} size={'1.5em'} />
                            <Link href={'/sign-in'}>Login / Register</Link>
                        </div>
                    </SignedOut>
                </ClerkLoaded>
                <MobileMenu />
            </div>
        </div>
    )
}

export default Navbar