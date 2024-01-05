'use client'

import React, { ChangeEvent, useEffect } from 'react';

interface TimeInputProps {
  label: string;
  handleChange: (value: string) => void;
  value?: string;
}

export function TimeInput({ label, handleChange, value }: TimeInputProps): JSX.Element {

  useEffect(() => {
    window.addEventListener("input.te.timepicker", (event) => {
      console.log('Date change has just occurred', event);

      const inputElement = document.getElementById(label) as HTMLInputElement;;
      const inputValue = inputElement?.value;
      console.log('Yi hua', inputValue);
      handleChange(inputValue)

    });
  }, []);

  return (
    <>
      <small>{label}</small>
      <div className="relative bg-blue-50 rounded-full" data-te-timepicker-init>
      <input
        id={label}
        type="text"
        value={value}
        className="peer block min-h-[auto] w-full text-sm font-medium text-neutral-700 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        />
      </div>
    </>
  );
}
