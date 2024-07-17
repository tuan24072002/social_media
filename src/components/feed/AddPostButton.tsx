import React from 'react'
import { useFormStatus } from 'react-dom'
import { CgSpinner } from 'react-icons/cg'

const AddPostButton = () => {
    const { pending } = useFormStatus()
    return (
        <button disabled={pending} className='py-2 px-4 bg-blue-500 disabled:bg-opacity-50 disabled:cursor-not-allowed text-white rounded-md text-xs'>
            {
                pending ? <p className='flex items-center gap-2'>Sending...<CgSpinner className='animate-spin' /></p> : 'Send'
            }
        </button>
    )
}

export default AddPostButton