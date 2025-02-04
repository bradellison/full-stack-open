import Part from './Part'

const Content = (props) => {
    console.log("content", props.parts);
    return (
        // <div>
        //     <Part part={props.parts[0]} />
        //     <Part part={props.parts[1]} />
        //     <Part part={props.parts[2]} />
        // </div>
        <ul>
            {props.parts.map(part => 
                <Part key={part.id} part={part}/>
            )}
        </ul>
    )
}

export default Content