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
    // console.log(data?.data[0])
  }, [searchTerm])

  const handleChange = (e) => {
    setSearchTerm((prev) => e.target.value)
    // console.log(filteredData)
  }

  const renderedData = data?.data.map((book) => {
    return <li key={book.id}>{book?.attributes.title}</li>
  })

  const filteredBooks = data?.data.filter((book) => {
    return book?.attributes?.title.includes(searchTerm)
  })

  const filteredData = filteredBooks?.map((book) => {
    return <li key={book.id}>{book?.attributes.title}</li>
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
