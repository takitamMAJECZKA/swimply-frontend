"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useContext, useEffect, useState } from "react"
import { DataContext } from "../DataProvider"

const chartConfig = {
  amount: {
    label: "Ilość",
    color: "var(--dark-aqua)",
  },
}

export default function RadarChartWorkoutsCategory() {
  const { workoutsData, workoutsLoading, accountData, accountLoading } = useContext(DataContext)
  const [chartData, setChartData] = useState([
    { category: "Wydolność", amount: 0 },
    { category: "Siła", amount: 0 },
    { category: "Technika", amount: 0 },
    { category: "Wstrzymywanie oddechu", amount: 0 },
    { category: "Różne", amount: 0 },
  ])
  useEffect(() => {
    let data = [{ category: "Wydolność", amount: 0 },{ category: "Siła", amount: 0 },{ category: "Technika", amount: 0 },{ category: "Wstrzymywanie oddechu", amount: 0 },{ category: "Różne", amount: 0 }];
    workoutsData.map((workout) =>{
        if(new Date(workout.workoutDate) >= new Date(new Date().getFullYear(), new Date().getMonth(), 1)){
            switch (workout.mainType[0]) {
                case 'Wydolność':
                    data[0].amount ++;
                    break;
                case 'Siła':
                    data[1].amount ++;
                    break;
                case 'Technika':
                    data[2].amount ++;
                    break;
                case 'Wstrzymywanie oddechu':
                    data[3].amount ++;
                    break;
                case 'Różne':
                    data[4].amount ++;
                    break;
            }
        }
    })
    setChartData(data)
  }, [])
  return (
    <Card className='fancy-shadow'>
      <CardHeader className="items-center pb-4">
        <CardTitle>Treningi</CardTitle>
        <CardDescription>
          Pokazuje co targetowales na treningach w tym miesiącu
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] cursor-pointer"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="amount"
              fill="var(--color-amount)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        W tym miesiącu
        </div>
      </CardFooter>
    </Card>
  )
}
