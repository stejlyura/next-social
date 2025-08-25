"use clien"

import React from 'react'
import { useAxiosAPI } from '@/hooks/axiosAPI'
import type { User } from '@/interfaces/userInterface'

function Nav() {
  const { data, loading, error } = useAxiosAPI<User>('https://jsonplaceholder.typicode.com/users/1')




  return (
    <nav className="h-full w-full flex flex-col items-center justify-start bg-[var(--foreground)] text-white">
        <ul className='w-full p-2'>
            <li><div className='bg-gray-500 border rounded-2xl w-10 h-10'></div></li>
            <li>
              <h1>
                {loading
                  ? "User name"
                  : data?.name
                }
              </h1>
            </li>
        </ul>
        <ul className='w-full p-2'>
            <li><a href="/">Home</a></li>
            <li><a href="/friends">Friends</a></li>
            <li><a href="/discovering">Discovering</a></li>
        </ul>
    </nav>
  )
}

export default Nav