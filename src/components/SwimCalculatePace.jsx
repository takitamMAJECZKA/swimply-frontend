import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Waves, Clock, Ruler, ChevronDown, EllipsisVertical } from "lucide-react";
import SwimplyLogo from "/swimplyLogoCircle.png";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { DropdownMenuItem, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const fatigueLevels = {
  beginner: 0.14,   // Slower endurance swimmers
  intermediate: 0.11, // Balanced endurance
  advanced: 0.08  // Faster sprinters
};

const SwimPaceCalculator = () => {
  const [bestTime, setBestTime] = useState(""); // Best time in MM:SS
  const [bestDistance, setBestDistance] = useState(""); // Distance in meters
  const [newDistance, setNewDistance] = useState(""); // Distance to predict for
  const [fatigueFactor, setFatigueFactor] = useState(fatigueLevels.intermediate); // Default fatigue factor
  const [predictedPace, setPredictedPace] = useState(null);
  const [predictedTotalTime, setPredictedTotalTime] = useState(null);
  const [poolLength, setPoolLength] = useState(1);

  const parseTimeToSeconds = (timeStr) => {
    const [minutes, seconds] = timeStr.split(":").map(Number);
    return minutes * 60 + seconds;
  };

  const formatPace = (secondsPer100m) => {
    const minutes = Math.floor(secondsPer100m / 60);
    const seconds = Math.round(secondsPer100m % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}/100m`;
  };
  
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  };

  const calculatePace = () => {
    if (!bestTime || !bestDistance || !newDistance) return;

    const bestTimeSeconds = parseTimeToSeconds(bestTime);
    const knownPace = bestTimeSeconds / bestDistance; // Time per meter

    const predictedPacePerMeter = knownPace * Math.pow(newDistance / bestDistance, fatigueFactor);
    const predictedPacePer100m = predictedPacePerMeter * 100;
    
    // Calculate total time for the whole distance
    const totalTimeSeconds = predictedPacePerMeter * newDistance;

    setPredictedPace(formatPace(predictedPacePer100m));
    setPredictedTotalTime(formatTime(totalTimeSeconds));
  };

  return (
    <div className="flex items-center justify-center h-full bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* <Waves className="w-6 h-6 mr-3 text-(--aqua)" /> */}
              <img src={SwimplyLogo} alt="Swimply" className="h-8 w-8 rounded-full mr-3" />
              <CardTitle>Kalkulator przewidywanego tempa</CardTitle>
            </div>
          <DropdownMenu>
          <DropdownMenuTrigger>
              <EllipsisVertical className="w-6 h-6 text-(--aqua)" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <Dialog>
                    <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="w-full cursor-pointer flex items-center justify-around" onClick={()=>{}}><Ruler className="mr-3"/>Długość basenu</div>
                    </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Zmień dlugość basenu</DialogTitle>
                        <DialogDescription>
                            Wybierz czy trening odbywał sie na 25-metrowym czy 50-metrowym basenie lub na otwartej wodzie
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Select value={poolLength} onValueChange={setPoolLength}>
                                <SelectTrigger
                                className="w-auto cursor-pointer rounded-lg sm:ml-auto"
                                >
                                    Wybierz długość basenu: 
                                    <SelectValue>{poolLength != 1 ? poolLength : "Woda otwarta"}</SelectValue>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="25" className="rounded-lg cursor-pointer">25m</SelectItem>
                                    <SelectItem value="50" className="rounded-lg cursor-pointer">50m</SelectItem>
                                    <SelectItem value="1" className="rounded-lg cursor-pointer">Woda otwarta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose><div className="saveChangesBtn">Zamknij</div></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
          </DropdownMenuContent>
          </DropdownMenu>
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
              Dystans na którym uzyskałeś ten czas
              {poolLength === 25 && "(liczba basenów 25m)"}
              {poolLength === 50 && "(liczba basenów 50m)"}
              {poolLength === 1 && "(liczba metrów)"}
            </Label>
            <Input 
              type="number" 
              placeholder="np. 100" 
              value={bestDistance/poolLength == 0 ? "" : bestDistance/poolLength} 
              onChange={(e) => setBestDistance(e.target.value*poolLength)}
            />
          </div>

          <div>
            <Label className="flex items-center mb-2">
              <Ruler className="w-4 h-4 mr-2 text-(--aqua)" />
              Dystans do przewidzenia {poolLength === 25 && "(liczba basenów 25m)"}
              {poolLength === 50 && "(liczba basenów 50m)"}
              {poolLength === 1 && "(liczba metrów)"}
            </Label>
            <Input 
              type="number" 
              placeholder="np. 400" 
              value={newDistance/poolLength == 0 ? "" : newDistance/poolLength} 
              onChange={(e) => setNewDistance(e.target.value*poolLength)}
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
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="beginner">Poczatkujacy (0.14)</SelectItem>
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="intermediate">Średnio zaawansowany (0.11)</SelectItem>
                <SelectItem className='cursor-pointer hover:bg-(--aqua)! focus:bg-(--aqua)!' value="advanced">Zaawansowany (0.08)</SelectItem>
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
              
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">
                  Przewidywany czas całkowity na dystansie {newDistance} m
                </p>
                <p className="text-xl font-semibold text-foreground">{predictedTotalTime}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SwimPaceCalculator;