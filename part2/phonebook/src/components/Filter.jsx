const Filter = (props) => {
    return (
        <form>
            <div>
            filter shown with <input value={props.searchName} onChange={props.handleSearchNameChange}/>
            </div>
        </form>
    )
}

export default Filter