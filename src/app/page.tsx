"use client"
import Nav from "./templates/Nav";
import { useAxiosAPI } from "@/hooks/axiosAPI";
import type { Post } from "@/interfaces/postInterface";
import PostElement from "./templates/PostElement";

export default function Home() {
    const { data, loading, error } = useAxiosAPI<Post[]>('https://jsonplaceholder.typicode.com/posts')

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-50 h-full">
        <Nav/>
      </div>
      <div className="w-4/5 bg-gray-30 h-full overflow-y-auto p-6">
        <ul className="space-y-6">
          {data?.map((u)=>(
            <li key={u.id} className=" relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)]/80 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.5)] transition-shadow p-4 md:p-6 ">
              <PostElement
                userId={u.userId}
                id={u.id}
                title={u.title}
                body={u.body}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
