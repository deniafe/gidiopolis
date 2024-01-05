'use client'

import React, { ChangeEvent, useEffect } from 'react';

interface DateInputProps {
  label: string;
  handleChange: (value: string) => void;
  value?: string;
}

export function DateInput({ label, handleChange, value }: DateInputProps): JSX.Element {

  useEffect(() => {
    window.addEventListener("dateChange.te.datepicker", (event) => {
      console.log('Date change has just occurred', event);

      const inputElement = document.getElementById(label) as HTMLInputElement;;
      const inputValue = inputElement?.value;
      console.log('Ye hua', inputValue);
      handleChange(inputValue)

    });
  }, []);

  return (
    <>
      <small>{label}</small>
      <div
        className="relative"
        data-te-datepicker-init
        data-te-inline="true"
        >
        <input
          id={label}
          type="text"
          value={value}
          className="peer block min-h-[auto] w-full text-sm font-medium text-neutral-700 rounded-full border-0 bg-blue-50 px-3 py-[0.32rem] transition-all duration-200 ease-linear data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
       </div>
    </>
  );
}
