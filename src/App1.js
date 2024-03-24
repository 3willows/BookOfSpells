import { useState, useEffect } from "react"
import "./App.css"

export default function App() {
  const [data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.potterdb.com/v1/books`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
    console.log(data)
  }, [searchTerm])

  const handleChange = (e) => {
    setSearchTerm((prev) => e.target.value)
  }

  return (
    <>
      <p>Search Potter DB website</p>
      <p className="">{data?.data?.id}</p>
      <p className="">{searchTerm}</p>
      <input onChange={handleChange}></input>
    </>
  )
}
