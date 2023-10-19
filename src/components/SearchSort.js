function SearchSort({searchHandler, sortHandler, filter}){
    return(
        <div>
            <input className="text-input search" value={filter} onChange={searchHandler} placeholder="Search My Movies"></input>
            <br></br>
            <label className= 'label' htmlFor="sort" >Sort Movies: </label>
            <select name="sort" onChange={sortHandler}>
                <option value='az'>A-Z</option>
                <option value='za'>Z-A</option>
                <option value='highLow'>High to Low</option>
                <option value='lowHigh'>Low to High</option>
            </select>
        </div>
    )
}

export default SearchSort