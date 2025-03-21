"use client"

import { TrendingUp } from "lucide-react"
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
const chartData = [{ caloriesBurnt: 1260, caloriesLeft: 240, caloriesGoal: 1500 }]

const chartConfig = {
  caloriesBurnt: {
    label: "Spalone kalorie",
    color: "var(--dark-aqua)",
  },
  caloriesLeft: {
    label: "Pozostałe kalorie",
    color: "#666666",
  },
}

export default function RadialProgressChart() {
  const totalVisitors = chartData[0].caloriesGoal

  return (
    <Card className="flex flex-col fancy-shadow">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cel</CardTitle>
        <CardDescription>Na ten tydzień</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Cel kalorii
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
            <RadialBar
              dataKey="caloriesLeft"
              fill="var(--color-caloriesLeft)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-center">
        Możesz ustawić cel spalania kalorii co trening lub poprostu zobaczyć ile ich spaliłeś
        </div>
      </CardFooter>
    </Card>
  )
}
