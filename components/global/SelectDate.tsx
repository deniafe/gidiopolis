import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import { CiCalendar } from "react-icons/ci";
import { parse, format } from 'date-fns';

interface SelectDateProps {
  setDate: Dispatch<SetStateAction<any[]>>
  date: any
}

function SelectDate({ setDate, date }: SelectDateProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const dateFormat = 'MMM d, yyyy';
    const formatedStartDate = format(date[0].startDate, dateFormat);
    const formatedEndDate = format(date[0].endDate, dateFormat);
    setStartDate(formatedStartDate)
    setEndDate(formatedEndDate)
  }, [date]);

  return (
    <>
      <small>Date</small>
      <div
        className="relative text-sm font-medium bg-blue-50 text-gray-800 peer block min-h-[auto] w-full rounded-full px-3 py-[0.4rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        data-te-dropdown-ref
        data-te-autoClose="inside"
      >
        <a
          className="flex justify-between items-center text-neutral-700 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
          type="button"
          id="dropdownMenuButton2"
          data-te-dropdown-toggle-ref
          data-te-auto-close="outside"
          aria-expanded="false"
        >
          {startDate} - {endDate}
          <span className="mr-2 w-2">
            <CiCalendar />
          </span>
        </a>
        <ul
          className="absolute z-[1000] m-0 top-8 hidden w-7xl list-none rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButton2"
          data-te-dropdown-menu-ref
          style={{ marginLeft: '-10%', marginTop: '10%', maxHeight: '800px', overflowY: 'scroll' }}  
        >

          <div  className='hidden lg:flex'>
            <DateRangePicker     
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={date}
              direction="horizontal"
            />
          </div>

          <div  className='hidden md:flex lg:hidden'>
            <DateRangePicker     
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={date}
              direction="vertical"
            />

          </div>
         
          <div  className='flex md:hidden'>
            <DateRange
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
            </div>
         
        </ul>
      </div>
    </>
  )
}

export default SelectDate