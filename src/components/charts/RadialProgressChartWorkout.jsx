"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

import { DataContext } from "../DataProvider";
import { useContext, useEffect, useState } from "react"

const chartConfig = {
  caloriesBurnt: {
    label: "Spalone kalorie",
    color: "var(--dark-aqua)",
  }
}

export default function RadialProgressChartWorkout(props) {
    const { workoutsData, workoutsLoading , accountData, accountLoading } = useContext(DataContext);
    const [totalCalories, setTotalCalories] = useState(0)
    const [chartData, setChartData] = useState([{ caloriesBurnt: 0}])
    useEffect(() => {
      if(workoutsData){
        const thisWorkout = workoutsData.find((workout) => {
          return workout.id === props.workoutId
        })
        setChartData([{ caloriesBurnt: thisWorkout.caloriesBurnt}])
      
      }else{
        setChartData([{ caloriesBurnt: 0}])
      }
      setTotalCalories(chartData[0].caloriesGoal)
    }, [ workoutsData, accountData])


  return (
    <Card className="flex flex-col fancy-shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spalone kalorie</CardTitle>
        <CardDescription>Kalorie spalone na tym treningu</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalCalories.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Spalone kalorie
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="caloriesBurnt"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-caloriesBurnt)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-center">
         Jak bedzie wiecej to wtedy bedzie to podzielone wedlug stylu a teraz sa wszystkie kalorie at once
        </div>
      </CardFooter>
    </Card>
  )
}
