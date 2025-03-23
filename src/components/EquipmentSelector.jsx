import React, { useState } from 'react';
import Select from 'react-select';

const equipmentOptions = [
  { value: 'deska', label: 'Deska' },
  { value: 'pull_buoy', label: 'Pull Buoy' },
  { value: 'płetwy', label: 'Płetwy' },
];

export default function EquipmentSelector(){
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedEquipment(selectedOptions || []);
  };

  const handleRemove = (item) => {
    setSelectedEquipment(selectedEquipment.filter(e => e.value !== item.value));
  };

  return (
    <div>
      <Select
        isMulti
        name="equipment"
        options={equipmentOptions}
        value={selectedEquipment}
        onChange={handleChange}
        getOptionLabel={(e) => e.label}
      />
      <div>
        {selectedEquipment.map((item) => (
          <span key={item.value} className="badge">
            {item.label} 
            <button onClick={() => handleRemove(item)}>X</button>
          </span>
        ))}
      </div>
    </div>
  );
};