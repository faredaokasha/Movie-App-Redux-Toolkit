function SearchBar({ value, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a movie..."
      />
    </div>
  );
}

export default SearchBar;