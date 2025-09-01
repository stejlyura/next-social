'use client'
import type { Post } from '@/interfaces/postInterface'
import { memo } from 'react'
import { useEffect } from 'react'
import { useUsers } from '@/stores/useUsers'

const PostElement: React.FC<Post> = ({ userId, id, title, body }) => {

    const users = useUsers((s) => s.users)
  const user = users.find((u) => u.id === userId)
  return (
    <li
      className="
        relative overflow-hidden
        rounded-xl border border-white/5
        bg-[var(--panel)]/90 backdrop-blur
        shadow-md
        p-4 md:p-6 list-none
      "
    >
      {/* акцентная полоска слева */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--accent)]" />

      {/* мета-инфо */}
      <div className="mb-2 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          ID {id}
        </span>
        <span><a href={`/user-page/${userId}`}>{user ? user.name : `ID ${userId}`}</a></span>
      </div>

      {/* заголовок */}
      <h2 className="mb-2 text-lg md:text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>

      {/* текст */}
      <p className="text-sm leading-relaxed text-white/85">{body}</p>
    </li>
  )
}

export default memo(PostElement)
