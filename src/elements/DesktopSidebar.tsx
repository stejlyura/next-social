import React from "react"

export default function DesktopSidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="hidden md:block md:sticky md:top-0 md:h-dvh md:w-64 bg-[var(--foreground)] text-white">
      {children}
    </aside>
  )
}
