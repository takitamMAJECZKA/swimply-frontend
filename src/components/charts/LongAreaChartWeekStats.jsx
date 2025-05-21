"use client"

import * as React from "react"
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { convertHoursToSecs } from "../../TimeCalculate"; // dodaj import na górze pliku

import { useContext } from "react"
import { DataContext } from "../DataProvider"

const chartConfig = {
  kms: {
    label: "KM przepłynięte",
    color: "var(--aqua-dominant)",
  },
  hours: {
    label: "Godziny w wodzie",
    color: "var(--aqua)",
  },
}

// Helper: get Monday of the week for a given date
function getMonday(d) {
  d = new Date(d)
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

// Helper: format week label
function formatWeekLabel(start, end) {
  const opts = { day: "2-digit", month: "2-digit" }
  return `${start.toLocaleDateString("pl-PL", opts)}–${end.toLocaleDateString("pl-PL", opts)}`
}

// Group workouts by week
function groupByWeeks(workouts, referenceDate, weeksCount) {
  const weeks = []
  let currentMonday = getMonday(referenceDate)
  for (let i = 0; i < weeksCount; i++) {
    const weekStart = new Date(currentMonday)
    const weekEnd = new Date(currentMonday)
    weekEnd.setDate(weekEnd.getDate() + 6)
    weeks.unshift({
      label: formatWeekLabel(weekStart, weekEnd),
      start: new Date(weekStart.setHours(0, 0, 0, 0)),
      end: new Date(weekEnd.setHours(23, 59, 59, 999)),
      kms: 0,
      hours: 0,
    })
    currentMonday.setDate(currentMonday.getDate() - 7)
  }

  workouts.forEach((w) => {
    const workoutDate = new Date(w.workoutDate)
    for (const week of weeks) {
      if (workoutDate >= week.start && workoutDate <= week.end) {
        week.kms += (typeof w.distance === "number" ? w.distance : 0) / 1000
        // obsługa timeLong jako stringa "hh:mm:ss"
        let timeLongSeconds = 0;
        if (typeof w.timeLong === "string") {
          timeLongSeconds = convertHoursToSecs(w.timeLong);
        } else if (typeof w.timeLong === "number") {
          timeLongSeconds = w.timeLong;
        }
        week.hours += timeLongSeconds / 3600
        break
      }
    }
  })

  return weeks.map((w) => ({
    week: w.label,
    kms: Number(w.kms.toFixed(2)),
    hours: Number(w.hours.toFixed(2)),
  }))
}

export default function LongAreaChartWeekStats() {
  const { workoutsData } = useContext(DataContext)
  const [timeRange, setTimeRange] = React.useState("6w") // domyślnie 6 tygodni

  const weeksCount =
    timeRange === "3w" ? 3 :
    timeRange === "6w" ? 6 :
    12 // zamiast 9 jest 12
  const referenceDate = new Date()

  const chartData = React.useMemo(() => {
    if (!workoutsData || !Array.isArray(workoutsData)) return []
    return groupByWeeks(workoutsData, referenceDate, weeksCount)
  }, [workoutsData, referenceDate, weeksCount])

  return (
    <Card className='fancy-shadow'>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Podsumowanie ostatnich treningów</CardTitle>
          <CardDescription>
            Pokazuje statystyki z ostatnich tygodni
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-auto cursor-pointer rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Ostatnie 6 tygodni" /> {/* domyślny placeholder */}
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="3w" className="rounded-lg cursor-pointer">
              Ostatnie 3 tygodnie
            </SelectItem>
            <SelectItem value="6w" className="rounded-lg cursor-pointer">
              Ostatnie 6 tygodni
            </SelectItem>
            <SelectItem value="12w" className="rounded-lg cursor-pointer">
              Ostatnie 12 tygodni
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="kms"
              type="natural"
              fill="var(--color-kms)"
              stroke="var(--color-kms)"
              stackId="a"
            />
            <Area
              dataKey="hours"
              type="natural"
              fill="var(--color-hours)"
              stroke="var(--color-hours)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
