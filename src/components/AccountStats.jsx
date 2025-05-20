
import { useEffect, useContext, useState } from 'react'

import { convertHoursToSecs, convertSecsToHours } from '@/TimeCalculate'

import { DataContext } from './DataProvider'
export default function AccountStats() {
    const {workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext)
    const [calories, setCalories] = useState(0)
    const [meters, setMeters] = useState(0)
    const [timeInWater, setTimeInWater] = useState(0)
    
    useEffect(()=>{
        setCalories(0)
        setMeters(0)
        setTimeInWater(0)
        workoutsData?.map((workout) => {
            setCalories(prev => prev + workout.caloriesBurnt)
            setMeters(prev => prev + workout.distance)
            setTimeInWater(prev => prev + convertHoursToSecs(workout.timeLong))
        })
    }, [workoutsData])
    return (
        <div className="grid grid-cols-1 mt-4">
            <div className="p-4 rounded-xl fancy-shadow bg-(--dominant) grid grid-cols-1 gap-4">
                <h2 className="text-lg font-semibold text-(--light-aqua)">Statystyki ogólne konta</h2>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-(--aqua)">Łącznie przepłyniete kilometry</p>
                    <p className="text-sm font-semibold text-(--light-aqua)">{meters/1000} km</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-(--aqua)">Łącznie spalone kalorie</p>
                    <p className="text-sm font-semibold text-(--light-aqua)">{calories} kcal</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-(--aqua)">Łącznie spędzony czas na treningach</p>
                    <p className="text-sm font-semibold text-(--light-aqua)">około {Math.round(timeInWater/3600)} godzin</p>
                </div>
            </div>
        </div>
    )
}