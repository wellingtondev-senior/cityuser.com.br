const SearchComponent = () => {
    return (
        <div className="  z-[99999] fixed top-4 left-[50px] md:right-4 right-[650px]">
            <div className="input-group ">
                <input type="text" placeholder="Endereço…" className="input input-bordered w-full" />
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
    );
}

export default SearchComponent;