'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateInput } from '../global/DateInput';
import { TimeInput } from '../global/TimeInput';

import { DateRangePicker } from 'react-date-range';
import TimeKeeper, { TimeOutput } from 'react-timekeeper';
import * as dateFns from 'date-fns'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SelectDate from '../global/SelectDate';
import SelectTime from '../global/SelectTime';

interface DateFormProps {
  setEventDate: Dispatch<SetStateAction<any[]>>
  setEventTime: Dispatch<SetStateAction<string>>
  eventDate: any
  eventTime: string
}

function DateForm({ setEventDate, eventDate, setEventTime, eventTime }: DateFormProps) {
  const { addDays } = dateFns

  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  useEffect(() => {
    console.log('Time has changed', eventTime)
  }, [eventDate, eventTime]);

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
        Enter Event Date And Time
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mt-[2rem] md:mb-2">
        <div className="lg:col-span-2" >
          <SelectDate setDate={setEventDate} date={eventDate} />
        </div>

        <div className="lg:col-span-1" >
          <SelectTime setTime={setEventTime} time={eventTime} />
        </div>
       
      </div>
    </div>
  );
}

export default DateForm;
