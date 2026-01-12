const SearchFilter = ({ setFilters }) => {
  return (
    <div className="filters">
      <input placeholder="Search by name"
        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
      />

      <select onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}>
        <option value="">All Genders</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default SearchFilter;
