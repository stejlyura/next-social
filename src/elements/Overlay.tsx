"use client"

export default function Overlay({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      aria-hidden={!show}
      className={[
        "fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden",
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      ].join(" ")}
    />
  )
}
