import { useState, useEffect, useCallback } from "react"
import "./App.css"

export default function App() {
  const [data, setData] = useState(null)

  const [attribute, setAttribute] = useState("id")
  const [endpoint, setEndpoint] = useState("books")

  const [searchTerm, setSearchTerm] = useState(null)

  const fetchData = useCallback(async () => {
    const response = await fetch(`https://api.potterdb.com/v1/${endpoint}`)
    const result = await response.json()
    setData(result)
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData, endpoint])

  const handleChange = (e) => {
    setSearchTerm((prev) => e.target.value)
  }

  const renderedData = data?.data.map((book) => {
    return <li key={book.id}>{book?.id}</li>
  })

  const filteredBooks = data?.data.filter((book) => {
    if (searchTerm === "") {
      return null
    }
    return book?.id?.includes(searchTerm)
  })

  const filteredData = filteredBooks?.map((book) => {
    return <li key={book.id}>{book?.id}</li>
  })

  return (
    <>
      <p>Search Potter DB website</p>{" "}
      <p className="">
        Enter search term{searchTerm && ":"} {searchTerm}
      </p>
      <input onChange={handleChange}></input>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="">
          <p>{data && `Everything`}</p>
          <p className="">{renderedData}</p>
        </div>
        <div className="">
          <p>Filtered Data </p>
          <p className="">{filteredData}</p>
        </div>
      </div>
    </>
  )
}
