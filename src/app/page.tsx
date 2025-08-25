"use client"
import Nav from "./templates/Nav";
import { useAxiosAPI } from "@/hooks/axiosAPI";
import type { Post } from "@/interfaces/postInterface";

export default function Home() {
    const { data, loading, error } = useAxiosAPI<Post[]>('https://jsonplaceholder.typicode.com/posts')

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-50 h-full">
        <Nav/>
      </div>
      <div className="w-4/5 bg-gray-30 h-full overflow-y-auto p-6">
        <ul>
          {data?.map((u)=>(
            <li key={u.id}>
              <h2>{u.title}</h2>
              <p>{u.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
