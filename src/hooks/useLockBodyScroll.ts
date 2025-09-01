"use client"
import { useEffect } from "react"

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    const { body } = document
    const prevOverflow = body.style.overflow
    const prevPaddingRight = body.style.paddingRight
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth

    if (locked) {
      body.style.overflow = "hidden"
      if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`
    } else {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPaddingRight
    }
  }, [locked])
}
