const Persons = (props) => {
    return (
        <>
            {props.peopleToShow.map(person => <p>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons