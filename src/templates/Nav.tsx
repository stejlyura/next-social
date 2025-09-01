"use client"

import Link from "next/link"
import React from 'react'
import { useAxiosAPI } from '@/hooks/axiosAPI'
import type { User } from '@/interfaces/userInterface'

function Nav() {
  const { data, loading } = useAxiosAPI<User>('https://jsonplaceholder.typicode.com/users/1')

  return (
    <nav className="h-full w-full flex flex-col items-start justify-start bg-[var(--foreground)] text-white">
      <ul className="w-full p-4 space-y-2">
        <li><div className="bg-gray-500/60 border border-white/10 rounded-xl w-10 h-10"></div></li>
        <li className="text-lg font-semibold">
          {loading ? "User name" : data?.name}
        </li>
      </ul>
      <ul className="w-full p-2 space-y-2">
        <li><Link href="/" className="block">Home</Link></li>
        <li><Link href="/friends" className="block">Friends</Link></li>
        <li><Link href="/discovering" className="block">Discovering</Link></li>
      </ul>
    </nav>
  )
}

export default Nav
