"use client"

import Nav from "../templates/Nav"
import { useAxiosAPI } from "@/hooks/axiosAPI"
import type { Post } from "@/interfaces/postInterface"
import PostsVirtual from "../templates/PostsVirtual"
import { useUsers } from "@/stores/useUsers"
import { useEffect, useRef, useState } from "react"
import Overlay from "@/elements/Overlay"
import MobileSidebar from "@/elements/MobileSidebar"
import DesktopSidebar from "@/elements/DesktopSidebar"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"

export default function Home() {
  const { data } = useAxiosAPI<Post[]>('https://jsonplaceholder.typicode.com/posts')
  const { fetchUsers } = useUsers()
  const [open, setOpen] = useState(false)
  const burgerBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => { fetchUsers() }, [fetchUsers])
  useLockBodyScroll(open)

  // Закрытие по ESC
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
        <div className="flex-1 min-w-0">
          <PostsVirtual data={data ?? []} />
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
