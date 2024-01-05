import React, { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { SelectInput } from '../global/SelectInput';
import { Input } from '../global/Input';
import { states, states_and_location } from '@/utils/constants';
import dynamic from 'next/dynamic'
import { LGA } from '@/types';

interface AddressFormProps {
  setEventState: Dispatch<SetStateAction<string>>;
  setEventRegion: Dispatch<SetStateAction<string>>;
  setEventAddress: Dispatch<SetStateAction<string>>;
  setRegions: Dispatch<SetStateAction<LGA[]>>
  setRegionNames: Dispatch<SetStateAction<string[]>>
  setCenter: Dispatch<SetStateAction<number[]>>
  setZoom: Dispatch<SetStateAction<number>>
  regions: LGA[]
  regionNames: string[]
  eventState: string
  eventRegion: string
  eventAddress: string
  center: number[]
  zoom: number
}

function AddressForm({ 
  setEventState, 
  setEventRegion, 
  setEventAddress, 
  setRegions, 
  setRegionNames, 
  setCenter, 
  setZoom,
  regions,
  regionNames,
  eventState,
  eventRegion,
  eventAddress,
  center,
  zoom
}: AddressFormProps) {
  const [mounted, setMounted] = useState(false);
  

  const Map = useMemo(() => dynamic(() => import('./Map'), { 
    ssr: false 
  }), [location])

  function logLGAsByName(locationName: string): void {
    const location = states_and_location.find((loc) => loc.name === locationName);
  
    if (location) {
      setRegions(location.LGAs)
      const lgaNames = location.LGAs.map((loc) => loc.name)
      setRegionNames(lgaNames)
    } 
  }

  function getStateLatLng(locationName: string): number[] | null {
    const location = states_and_location.find((loc) => loc.name === locationName);
  
    if (location) {
      return [location.latitude, location.longitude];
    } else {
      return null;
    }
  }

  function getRegionLatLng(locationName: string): number[] | null {
    const location = regions?.find((loc) => loc.name === locationName);
  
    if (location) {
      return [location.latitude, location.longitude];
    } else {
      return null;
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const scrollToScrollDiv = () => {
      const scrollDiv = document.getElementById("share");
      if (scrollDiv) {
        scrollDiv.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToScrollDiv();
  }, []); 

  return (
    <div className={`transition-all transform ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <h2 className="text-center text-[1.3rem] text-gray-500 font-medium mb-4 md:mb-6">
        Enter Event Address
      </h2>
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
        {/* States Select input */}
        <div className="mb-1 col-span-2 md:col-span-1">
          <SelectInput label='State' value={eventState} items={states} handleChange={(value) => {
            setEventState(value)
            logLGAsByName(value)
            setCenter(getStateLatLng(value) || [6.5244, 3.3792])
            setZoom(8)
          }} />
        </div>

        {/* States Select input */}
        <div className="mb-1 col-span-2 md:col-span-1">
          <SelectInput label='Region' value={eventRegion} items={regionNames} handleChange={(value) => {
            setEventRegion(value)
            setCenter(getRegionLatLng(value) || [6.5244, 3.3792])
            setZoom(10)
          }} />
        </div>

         {/* Event Address input */}
      <div className="mb-1 col-span-2">
          <Input 
            label="Street Address" 
            len={25} 
            type="text" 
            rules={(val: string) => val.length < 6}
            errorMessage='Event Address cannot be less than 6 characters'
            value={eventAddress}
            handleChange={(val) => setEventAddress(val)} 
          />
        </div>
      </div>
     

      <div className="mt-[2rem]" >
       <Map center={center} zoom={zoom} />
      </div>
      
    </div>
  );
}

export default AddressForm;
