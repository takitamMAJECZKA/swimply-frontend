import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Waves, Clock, Ruler, ChevronDown } from "lucide-react";

const fatigueLevels = {
  beginner: 0.1,   // Slower endurance swimmers
  intermediate: 0.08, // Balanced endurance
  advanced: 0.06  // Faster sprinters
};

const SwimPaceCalculator = () => {
  const [bestTime, setBestTime] = useState(""); // Best time in MM:SS
  const [bestDistance, setBestDistance] = useState(""); // Distance in meters
  const [newDistance, setNewDistance] = useState(""); // Distance to predict for
  const [fatigueFactor, setFatigueFactor] = useState(fatigueLevels.intermediate); // Default fatigue factor
  const [predictedPace, setPredictedPace] = useState(null);

  const parseTimeToSeconds = (timeStr) => {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const formatPace = (secondsPer100m) => {
    const minutes = Math.floor(secondsPer100m / 60);
    const seconds = Math.round(secondsPer100m % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}/100m`;
  };

  const calculatePace = () => {
    if (!bestTime || !bestDistance || !newDistance) return;

    const bestTimeSeconds = parseTimeToSeconds(bestTime);
    const knownPace = bestTimeSeconds / bestDistance; // Time per meter

    const predictedPacePerMeter = knownPace * Math.pow(newDistance / bestDistance, fatigueFactor);
    const predictedPacePer100m = predictedPacePerMeter * 100;

    setPredictedPace(formatPace(predictedPacePer100m));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center">
            <Waves className="w-6 h-6 mr-3 text-(--aqua)" />
            <CardTitle>Kalkulator przewidywanego tempa</CardTitle>
          </div>
          <CardDescription>Oblicz swoje maksymalne tempo na danym dystansie</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label className="flex items-center mb-2">
              <Clock className="w-4 h-4 mr-2 text-(--aqua)" />
              Najlepszy czas (mm:ss)
            </Label>
            <Input 
              type="text" 
              placeholder="np. 1:30" 
              value={bestTime} 
              onChange={(e) => setBestTime(e.target.value)}
            />
          </div>

          <div>
            <Label className="flex items-center mb-2">
              <Ruler className="w-4 h-4 mr-2 text-(--aqua)" />
              Najlepszy dystans (metry)
            </Label>
            <Input 
              type="number" 
              placeholder="np. 100" 
              value={bestDistance} 
              onChange={(e) => setBestDistance(e.target.value)}
            />
          </div>

          <div>
            <Label className="flex items-center mb-2">
              <Ruler className="w-4 h-4 mr-2 text-(--aqua)" />
              Na jaki dystans chcesz obliczyć tempo
            </Label>
            <Input 
              type="number" 
              placeholder="np. 400" 
              value={newDistance} 
              onChange={(e) => setNewDistance(e.target.value)}
            />
          </div>

          <div>
            <Label className="flex items-center mb-2">
              <ChevronDown className="w-4 h-4 mr-2 text-(--aqua)" />
              Na jakim poziomie pływasz
            </Label>
            <Select 
              onValueChange={(value) => setFatigueFactor(fatigueLevels[value])} 
              defaultValue="intermediate"
            >
              <SelectTrigger className='cursor-pointer'>
                <SelectValue placeholder="Wybierz poziom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="beginner">Poczatkujacy (0.1)</SelectItem>
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="intermediate">Średnio zaawansowany (0.08)</SelectItem>
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="advanced">Zaawansowany (0.06)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={calculatePace} 
            className="w-full cursor-pointer"
            variant='outline'
          >
            Oblicz tempo
          </Button>

          {predictedPace && (
            <div className="w-full p-3 bg-secondary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Przewidywane tempo</p>
              <p className="text-xl font-semibold text-foreground">{predictedPace}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SwimPaceCalculator;