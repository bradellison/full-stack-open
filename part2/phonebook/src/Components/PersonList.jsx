import PersonInfo from './PersonInfo'

const PersonList = ({persons, onRemove}) => {
    return (
        <ul>
            {persons.map(person => 
                <PersonInfo key={person.name} person={person} onRemove={onRemove}/>
            )}
        </ul>
    )
}

export default PersonList