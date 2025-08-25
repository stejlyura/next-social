'use client'
import { useUsers } from '@/stores/useUsers'
import Nav from '@/templates/Nav'
import React, { useEffect } from 'react'

function page() {
    const { users, loading, error, fetchUsers } = useUsers()

    useEffect(() => {
        if (!users.length) fetchUsers()
    }, [users.length, fetchUsers])

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-50 h-full">
        <Nav/>
      </div>
      <div className="w-4/5 bg-gray-30 h-full overflow-y-auto no-scrollbar p-6">
        <div className='w-full grid grid-cols-3'>
            {users.map(u=>(
                <div key={u.id}>
                    <p>{u?.name}</p>
                    <p>{u?.email}</p>
                    <p>{u?.address.city}</p>
                    <p>{u?.address.street}</p>
                    <p>{u?.phone}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default page