import React from 'react'

export type FriendsCardProps = {

  key?: number
  name: string
  email: string
  city: string
  street: string
  phone: string
  userId: number    
}

export const FriendsCard = ({userId, name, email,city, street, phone }: FriendsCardProps) => {

  return (
    <div className='w-full '>
        <h1 className='text-2xl'><a href={`/user-page/${userId}`}>{name}</a></h1>
        <p className='text-gray-500  before:content-["📧"] before:mr-1'>{email}</p>
        <p className='before:content-["🏙️"] before:mr-1'>{city}</p>
        <p className='before:content-["🏠"] before:mr-1'>{street}</p>
        <p className='before:content-["📱"] before:mr-1'>{phone}</p>
    </div>
  )
}
