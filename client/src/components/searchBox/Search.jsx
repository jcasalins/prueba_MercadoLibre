import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './search.scss'

function Search() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubimit = (e) => {
    e.preventDefault()
    if (search === '') return
    navigate(`/items?search=${search}`)
  }
  return (
    <div>
      <form onSubmit={handleSubimit}>
        <div className="grid form-search">
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            className="input-search p-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-search py-5">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default Search
