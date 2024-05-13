const Persons = (props) => {

    return (
        <>
            {props.peopleToShow.map(person => 
                <p>
                    {person.name} {person.number} <button onClick={() => props.delete(person.id, person.name)}>delete</button>
                </p>
            )}
        </>
    )
}

export default Persons