import { useState, useEffect, useCallback } from "react"
import "./App.css"

export default function App() {
  const [input, setInput] = useState(null)

  // const [attribute, setAttribute] = useState("id")
  const [endpoint, setEndpoint] = useState("books")

  const [searchTerm, setSearchTerm] = useState(null)

  const fetchData = useCallback(async () => {
    const response = await fetch(`https://api.potterdb.com/v1/${endpoint}`)
    const result = await response.json()
    setInput(result)
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData, endpoint])

  // search

  const handleSearchChange = (e) => {
    setSearchTerm((prev) => e.target.value)
  }

  const handleEndpointChange = (e) => {
    setEndpoint((prev) => e.target.value)
  }
  // Display

  const renderData = input?.data?.map((data) => {
    if (endpoint === "books") {
      return <li key={data.id}>{data?.attributes?.title}</li>
    }
    if (endpoint === "characters") {
      return <li key={data.id}>{data?.attributes?.name}</li>
    }
    return <li key={data.id}>{data?.id}</li>
  })

  const renderSearchResults = input?.data?.map((data) => {
    if (searchTerm === "") {
      return null
    }
    if (endpoint === "books" && data?.attributes?.title?.includes(searchTerm)) {
      return <li key={data.id}>{data?.attributes?.title}</li>
    }
    if (
      endpoint === "characters" &&
      data?.attributes?.name?.includes(searchTerm)
    ) {
      return <li key={data.id}>{data?.attributes?.name}</li>
    }
    return null
  })

  return (
    <>
      <h3>Search Potter DB website</h3>

      <form onChange={handleEndpointChange}>
        <select>
          <option value="books">Books</option>
          <option value="characters">Characters</option>
        </select>
      </form>

      <p>
        Available attributes:{" "}
        {input?.data[0].attributes &&
          Object.getOwnPropertyNames(input?.data[0].attributes).toString()}
      </p>

      <p className="">
        Search Term{searchTerm && ":"} {searchTerm}
      </p>
      <input onChange={handleSearchChange}></input>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div className="">
          <p>{input && `Everything`}</p>
          <p className="">{renderData}</p>
        </div>
        <div className="">
          <p>Filtered Data </p>
          <p className="">{renderSearchResults}</p>
        </div>
      </div>
    </>
  )
}
