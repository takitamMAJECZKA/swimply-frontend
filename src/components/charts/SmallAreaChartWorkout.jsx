"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { convertMinsToSecs } from "@/TimeCalculate"

const chartConfig = {
  time: {
    label: "Czas trwania",
    color: "var(--dark-aqua)",
  },
  distance: {
    label: "Dystans",
    color: "var(--aqua-dominant)",
  },
}

export default function SmallAreaChartWorkout({workoutContent}) {
    let chartData = workoutContent.map((exercise) => {
      if(exercise.type === 'exercise'){
        return { name: exercise.name, time: convertMinsToSecs(exercise.time), distance: exercise.distance }
      }
    })
    chartData = chartData.filter((exercise) => exercise !== undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Metry oraz czas trwania każdego ćwiczenia</CardTitle>
        <CardDescription>
          Posortowane wg. cwiczeń
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="time"
              type="natural"
              fill="var(--color-distance)"
              fillOpacity={0.4}
              stroke="var(--color-distance)"
              stackId="a"
            />
            <Area
              dataKey="distance"
              type="natural"
              fill="var(--color-time)"
              fillOpacity={0.4}
              stroke="var(--color-time)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
