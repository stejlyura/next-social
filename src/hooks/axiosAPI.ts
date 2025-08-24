import { useEffect, useState } from "react"
import axios from "axios"

export function useAxiosAPI<T = any>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    axios
      .get<T>(url)
      .then((response) => {
        if (!cancelled) setData(response.data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}


//  const { data: users, loading, error } = useAxiosAPI<User[]>(
//     "https://jsonplaceholder.typicode.com/users"
//   )