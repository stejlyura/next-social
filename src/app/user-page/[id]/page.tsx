"use client"

import { useAxiosAPI } from '@/hooks/axiosAPI'
import { User } from '@/interfaces/userInterface'
import { useUsers } from '@/stores/useUsers'
import Nav from '@/templates/Nav'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id)
  const users = useUsers(s => s.users);
  const loading = useUsers(s => s.loading);
  const fetchUsers = useUsers(s => s.fetchUsers);

  React.useEffect(() => {
    if (!users.length) fetchUsers();
  }, [users.length, fetchUsers]);

  const user = users.find(u => u.id === userId);

  return (
     <div className="flex h-screen">
      <div className="w-1/5 bg-gray-50 h-full">
        <Nav/>
      </div>
      <div className="w-4/5 bg-gray-30 h-full overflow-y-auto no-scrollbar p-6">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.address.city}</p>
        <p>{user?.address.street}</p>
        <p>{user?.phone}</p>
      </div>
    </div>
  )
}

export default page