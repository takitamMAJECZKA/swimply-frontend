import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';
const EquipmentSelector = (props) => {
  const [selectedEquipment, setSelectedEquipment] = useState(()=>{
    let savedData = JSON.parse(localStorage.getItem('currentWorkout'));
    savedData = savedData ? savedData.elementsIn.find((element) => element.id === props.parentId) : null;
    savedData = savedData ? savedData.equipment : null;
    return savedData ? savedData : [];
})
    useEffect(()=>{
        props.handleEquipmentChange(selectedEquipment)
    },[selectedEquipment])

  const equipmentOptions = [
    { id: 'kickboard', name: 'Deska pływacka', group: 'hands' },
    { id: 'handpaddles', name: 'Płetwy na ręce', group: 'hands' },
    { id: 'fins', name: 'Płetwy', group: 'feet' },
    { id: 'monofin', name: 'Monopłetwa', group: 'feet' },
    { id: 'pullbuoy', name: 'Pull buoy (ósemka)', group: 'feet' },
    { id: 'snorkel', name: 'Snorkel (rurka pływania)', group: 'head' },
    { id: 'noodle', name: 'Makaron pływacki', group: 'other' },
  ];

  const toggleEquipment = (equipment) => {
    // Check if the equipment is already selected
    if (selectedEquipment.includes(equipment.id)) {
      setSelectedEquipment(selectedEquipment.filter(id => id !== equipment.id));
      return;
    }

    // Logic for equipment constraints
    let newSelection = [...selectedEquipment];

    // If selecting a foot equipment, remove any other foot equipment
    if (equipment.group === 'feet') {
      newSelection = newSelection.filter(id => {
        const item = equipmentOptions.find(e => e.id === id);
        return item.group !== 'feet';
      });
    }

    // If selecting a hand equipment, remove any other hand equipment
    if (equipment.group === 'hands') {
      newSelection = newSelection.filter(id => {
        const item = equipmentOptions.find(e => e.id === id);
        return item.group !== 'hands';
      });
    }

    // Add the new equipment
    newSelection.push(equipment.id);
    setSelectedEquipment(newSelection);
  };

  const removeEquipment = (equipmentId) => {
    setSelectedEquipment(selectedEquipment.filter(id => id !== equipmentId));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <Popover>
        <div className="w-full flex justify-center items-center">
        <PopoverTrigger asChild className="cursor-pointer">
          <Button variant="outline" size="sm" className="h-8">
            Wybierz sprzęt pływacki
          </Button>
        </PopoverTrigger>
        </div>
        <PopoverContent className="w-64 p-2">
          <div className="text-sm font-medium mb-2">Sprzęt pływacki</div>
          <Separator className='mb-2'/>
          <div className="space-y-1">
            {equipmentOptions.map((equipment) => (
              <div
                key={equipment.id}
                className="flex items-center hover:text-(--dominant) justify-between p-1 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => toggleEquipment(equipment)}
              >
                <span className="text-sm">{equipment.name}</span>
                {selectedEquipment.includes(equipment.id) ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <div className="h-4 w-4 rounded-sm border" />
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Uwaga: Nie można wybrać jednocześnie sprzętu konfliktowego
          </div>
        </PopoverContent>
      </Popover>

      {selectedEquipment.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {selectedEquipment.map(id => {
            const equipment = equipmentOptions.find(e => e.id === id);
            return (
              <Badge key={id} variant="secondary" className="gap-1">
                {equipment.name}
                <div onClick={() => removeEquipment(id)}>
                    <X
                    className="h-4 w-4 cursor-pointer text-(--red)" 
                    />
                </div>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;