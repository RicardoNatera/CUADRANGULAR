function SearchBar({setSearch}) {
  return (
    <div className="form-group">
        <input icon='search'
            placeholder='Buscar...'
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default SearchBar