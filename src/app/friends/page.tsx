'use client'
import DesktopSidebar from '@/elements/DesktopSidebar'
import MobileSidebar from '@/elements/MobileSidebar'
import Overlay from '@/elements/Overlay'
import { useUsers } from '@/stores/useUsers'
import Nav from '@/templates/Nav'
import React, { useEffect, useRef, useState } from 'react'
import { useAxiosAPI } from "@/hooks/axiosAPI"
import type { Post } from "@/interfaces/postInterface"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

function page() {
    const { users, loading, error, fetchUsers } = useUsers()
    const burgerBtnRef = useRef<HTMLButtonElement | null>(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  // Возврат фокуса на кнопку после закрытия
  useEffect(() => {
    if (!open && burgerBtnRef.current) burgerBtnRef.current.focus()
  }, [open])

    useEffect(() => {
        if (!users.length) fetchUsers()
    }, [users.length, fetchUsers])

  return (
    
    <div className="min-h-dvh md:grid md:grid-cols-[16rem_1fr] w-full">
      {/* Мобильная кнопка бургер */}
      {!open && (
  <button
    ref={burgerBtnRef}
    onClick={() => setOpen(true)}
    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-700 rounded-md text-white"
    aria-label="Open menu"
    aria-expanded={open}
  >
    ☰
  </button>
)}

      {/* Desktop sidebar (в сетке) */}
      <DesktopSidebar>
        <Nav />
      </DesktopSidebar>

      {/* Main (всегда 100% ширины на мобилке, колонка на md+) */}
      <main className="flex min-h-dvh w-full min-w-0 overflow-hidden md:overflow-y-auto">
        <div className="w-full h-screen overflow-y-auto no-scrollbar p-4
            sm:p-6">
        <div className='w-full h-screen overflow-y-auto no-scrollbar 
  p-4 sm:p-6
  grid grid-cols-1 gap-4
  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
      </main>


      {/* Mobile overlay + sliding sidebar (поверх main) */}
      <Overlay show={open} onClick={() => setOpen(false)} />
      <MobileSidebar open={open} onClose={() => setOpen(false)}>
        <Nav />
      </MobileSidebar>
    </div>
       )
}

export default page