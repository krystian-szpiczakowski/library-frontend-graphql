import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "./queries"
import { useState } from "react"

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading authors</div>
  } else if (error) {
    return <div>Ełoł! {error.message}</div>
  }

  const authors = data.allAuthors

  const onUpdateAuthor = async (event) => {
    event.preventDefault()

    console.log(`update author ${selectedAuthor}...`)
    
    updateAuthor({ variables: { name: selectedAuthor, setBornTo: Number(birthYear) } })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={onUpdateAuthor}>
        <div>
          name
          <select value={selectedAuthor} onChange={({target}) => setSelectedAuthor(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input type="number" value={birthYear} onChange={({target}) => setBirthYear(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
