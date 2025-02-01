const StatisticLine = ({text, value, percentage}) => {
    if (percentage == true) {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>        
        )}
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )}    



export default StatisticLine
