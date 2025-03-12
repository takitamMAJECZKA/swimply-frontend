"use client"

import { TrendingUp } from "lucide-react"
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

const chartConfig = {
  amount: {
    label: "Ilość",
    color: "var(--dark-aqua)",
  },
}

export default function RadarChartExercisesCategoryWorkout(props) {
  const chartData = [...props.exercisesTypeAmount];
  return (
    <Card className='fancy-shadow'>
      <CardHeader className="items-center pb-4">
        <CardTitle>Charakter ćwiczeń</CardTitle>
        <CardDescription>
          Pokazuje co głównie wzmocniłeś w wykonanych ćwiczeniach
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
          Popraw swoje słabe strony i szlifuj mocne strony <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
