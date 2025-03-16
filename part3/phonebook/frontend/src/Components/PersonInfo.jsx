const PersonInfo = ({person, onRemove}) => {
    return (
        <li>{person.name} {person.number} 
            <button onClick={() => onRemove(person)}>delete</button>
        </li>
    )
}

export default PersonInfo