import Header from './components/Subheader'
import Content from './components/Content'
import Total from './components/Total'

const Course = ({course}) => {

    const calculateSum = (parts) => {
        const total = parts.reduce((sum, part) => {
            return sum + part.exercises;
        }, 0); 
        return total;
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={calculateSum(course.parts)} />
        </div>
    )
}

export default Course