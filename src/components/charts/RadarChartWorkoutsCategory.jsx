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

const chartData = [
  { category: "Wydolność", Amount: 3 },
  { category: "Siła", Amount: 8 },
  { category: "Technika", Amount: 2 },
  { category: "Wstrzymywanie oddechu", Amount: 3 },
  { category: "Inne", Amount: 4 },
]

const chartConfig = {
  amount: {
    label: "Amount",
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
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="category" />
            <PolarGrid />
            <Radar
              dataKey="Amount"
              fill="var(--color-amount)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
        W tym miesiącu<TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
