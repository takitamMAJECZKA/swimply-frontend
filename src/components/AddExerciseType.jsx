"use client"

import {useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AddExerciseType({setExerciseSubType, parentId}) {
    const [type, setType] = useState(()=>{
        let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
        savedData = savedData ? savedData.elementsIn.find((element) => element.id === parentId) : null;
        savedData = savedData ? savedData.subtype : null;
        return savedData ? savedData : {label: 'Różne' , value:'rozne'};
    })

    useEffect(()=>{
        setExerciseSubType(type)
    }, [type])
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{type.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Główny charakter tego ćwiczenia</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup value={type.label} onValueChange={setType}>
          <DropdownMenuRadioItem value={{label: 'Różne' , value:'rozne'}}>Różne</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={{label: 'Wydolność' , value:'wydolnosc'}}>Wydolność</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={{label: 'Siła' , value:'sila'}}>Siła</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={{label: 'Technika' , value:'technika'}}>Technika</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={{label: 'Wstrzymywanie oddechu' , value:'oddech'}}>Wstrzymywanie oddechu</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
