import { useState } from 'react'
import Header from "./Header"
import StatisticLine from "./StatisticLine"

const Statistics = ({goodCount, neutralCount, badCount}) => {
    const total = goodCount + neutralCount + badCount

    const calculateAverage = () => {
        const value = goodCount + (-1 * badCount)
        return value / total
    }
    
    const calculatePositive = () => {
        return goodCount * 100 / total
    }

    const average = calculateAverage()
    const positive = calculatePositive()
    if (total == 0) {
        return (
            <p>No feedback given</p> 
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <StatisticLine text="good" value={goodCount} percentage={false} />
                    <StatisticLine text="neutral" value={neutralCount} percentage={false} />
                    <StatisticLine text="bad" value={badCount} percentage={false} />
                    <StatisticLine text="average" value={average} percentage={false}/>
                    <StatisticLine text="positive" value={positive} percentage={true} />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics