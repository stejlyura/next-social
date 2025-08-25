import type { Post } from '@/interfaces/postInterface'

import React from 'react'

const PostElement: React.FC<Post> = ({userId, id, title, body}) => {
  return (
    <div className='w-full min-h-8'>
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[var(--accent)]" />
      {/* <div>{userId} {id}</div>
      <h2>{title}</h2>
      <p>{body}</p> */}
      <div className="mb-2 flex items-center gap-3 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          ID {id}
        </span>
        <span>User: {userId}</span>
      </div>

      <h2 className="mb-2 text-lg md:text-xl font-semibold tracking-tight text-white">
        {title}
      </h2>

      <p className="text-sm leading-relaxed text-white/85">{body}</p>
    </div>
  )
}

export default PostElement
