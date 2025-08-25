"use client"
import Nav from "./templates/Nav";
import { useAxiosAPI } from "@/hooks/axiosAPI";
import type { Post } from "@/interfaces/postInterface";
import PostsVirtual from "./templates/PostsVirtual";

export default function Home() {
    const { data, loading, error } = useAxiosAPI<Post[]>('https://jsonplaceholder.typicode.com/posts')

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-50 h-full">
        <Nav/>
      </div>
      <div className="w-4/5 bg-gray-30 h-full overflow-y-auto no-scrollbar p-6">
        <PostsVirtual data={data ?? []} />
      </div>
    </div>
  );
}
