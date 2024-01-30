import { useState, useEffect } from "react"
import "./App.css"

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://wizard-world-api.herokuapp.com/Spells`
        )
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [])

  const cleanedData = data
    ?.filter(
      (obj) =>
        !obj.name.includes(obj.incantation) && obj.name && obj.incantation
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <h1>Book of Spells</h1>
      <h2>by</h2>
      <h2>Miranda Goshawk</h2>
      <div className="spell-container ">
        {cleanedData?.map((obj) => (
          <Spell name={obj.name} incantation={obj.incantation} key={obj.id} />
        ))}
      </div>
    </>
  )
}

function Spell({ name, incantation }) {
  const [clicked, setClicked] = useState(false)
  function toggleClicked() {
    setClicked((clicked) => !clicked)
  }
  return (
    <div>
      <button onClick={toggleClicked}>
        {!clicked && name}
        {clicked && <Incantation incantation={incantation} />}{" "}
      </button>
    </div>
  )
}

function Incantation({ incantation }) {
  return <>{incantation}</>
}
