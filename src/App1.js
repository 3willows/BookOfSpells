import { useState, useEffect, useCallback } from "react"
import "./App.css"

export default function App() {
  const [data, setData] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null)

  const logging = useCallback(() => console.log(data?.data[0]))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.potterdb.com/v1/characters`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
    logging()
  }, [searchTerm, logging])

  const handleChange = (e) => {
    setSearchTerm((prev) => e.target.value)
    // console.log(filteredData)
  }

  const renderedData = data?.data.map((book) => {
    return <li key={book.id}>{book?.attributes.name}</li>
  })

  const filteredBooks = data?.data.filter((book) => {
    return book?.attributes?.name.includes(searchTerm)
  })

  const filteredData = filteredBooks?.map((book) => {
    return <li key={book.id}>{book?.attributes.name}</li>
  })

  return (
    <>
      <p>Search Potter DB website</p>
      <p>{data && `Books`}</p>
      <p className="">{renderedData}</p>
      <p>Filtered Data of Books</p>
      <p className="">
        Enter search term{searchTerm && ":"} {searchTerm}
      </p>{" "}
      <input onChange={handleChange}></input>
      <p className="">{filteredData}</p>
    </>
  )
}
