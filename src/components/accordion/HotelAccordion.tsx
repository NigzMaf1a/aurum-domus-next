import React, { useState } from 'react';
import DynamicInput from '@/components/inputs/DynamicInput';
import DynamicDiv from '@/components/containers/DynamicDiv';

interface HotelDropdownProps {
  hotelName: string;
  hotelEmail: string;
  hotelLogo?: string; // optional base64 or image URL
  units: string[]; // array of unit names or IDs
  searchUnits: string;
  setSearchUnits: (val: string) => void;
}

export default function HotelDropdown({
  hotelName,
  hotelEmail,
  hotelLogo,
  units,
  searchUnits,
  setSearchUnits,
}: HotelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredUnits = units.filter((u) =>
    u.toLowerCase().includes(searchUnits.toLowerCase())
  );

  return (
    <div className="border rounded-md shadow-md bg-white w-full">
      {/* Collapsed Header */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {hotelLogo && (
            <img
              src={hotelLogo}
              alt={`${hotelName} logo`}
              className="w-10 h-10 rounded-full object-cover border"
            />
          )}
          <div>
            <div className="font-semibold text-lg">{hotelName}</div>
            <div className="text-sm text-gray-600">{hotelEmail}</div>
          </div>
        </div>
        <span className="text-gray-600">{isOpen ? '▲' : '▼'}</span>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-3">
          {/* Search Input */}
          <DynamicInput
            type="text"
            placeholder="Search units"
            value={searchUnits}
            onChange={(e) => setSearchUnits(e.target.value)}
            className="bg-light mb-3"
          />

          {/* Units List */}
          <div className="space-y-2">
            {filteredUnits.length > 0 ? (
              filteredUnits.map((unit, idx) => (
                <DynamicDiv key={idx} className="bg-light p-2 rounded">
                  <div className="text-dark">{unit}</div>
                </DynamicDiv>
              ))
            ) : (
              <DynamicDiv className="bg-light p-2 rounded text-dark">
                No units found
              </DynamicDiv>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
