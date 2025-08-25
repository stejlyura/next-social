import { create } from 'zustand'
import axios from 'axios'
import type { User } from '@/interfaces/userInterface'

type UsersState = {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  addUser: (u: User) => void
  removeUser: (id: number) => void
  setUsers: (arr: User[]) => void
}

export const useUsers = create<UsersState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      set({ users: res.data, loading: false })
    } catch (e) {
      set({ error: 'Ошибка загрузки', loading: false })
    }
  },

  addUser: (u) => set((s) => ({ users: [...s.users, u] })),
  removeUser: (id) => set((s) => ({ users: s.users.filter((x) => x.id !== id) })),
  setUsers: (arr) => set({ users: arr }),
}))
