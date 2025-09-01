"use client"

import React from "react"

export default function MobileSidebar({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <aside
      role="dialog"
      aria-hidden={!open}
      className={[
        "fixed inset-y-0 left-0 z-40 w-64 bg-[var(--foreground)] text-white",
        "transform transition-transform duration-300 md:hidden",
        open ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
    >
      {/* Контент меню */}
      {children}
      {/* Кнопка закрыть */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute top-3 right-3 rounded-md p-2 bg-black/30"
      >
        ✖
      </button>
    </aside>
  )
}
