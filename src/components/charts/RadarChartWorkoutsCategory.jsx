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

const chartData = [
  { category: "Wydolność", amount: 3 },
  { category: "Siła", amount: 8 },
  { category: "Technika", amount: 2 },
  { category: "Wstrzymywanie oddechu", amount: 3 },
  { category: "Różne", amount: 4 },
]

const chartConfig = {
  amount: {
    label: "Ilość",
    color: "var(--dark-aqua)",
  },
}

export default function RadarChartWorkoutsCategory() {
  return (
    <Card className='fancy-shadow'>
      <CardHeader className="items-center pb-4">
        <CardTitle>Treningi</CardTitle>
        <CardDescription>
          Pokazuje co targetowales na ostatnich treningach
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
