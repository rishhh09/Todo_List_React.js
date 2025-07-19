import React from 'react'

function Navbar() {
    return (
        <>
            <nav className='bg-violet-500 flex gap-8 justify-between items-center h-12 w-[100%]'>
                <div className="logo text-xl font-bold mx-4 cursor-pointer">
                    <span>iTask</span>
                </div>
                <ul className='flex gap-8 mx-4 '>
                    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                    <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar