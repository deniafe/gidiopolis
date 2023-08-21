import React from 'react';

interface InputProps {
  label: string;
  len?: number
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function Input({ label, len = 200, type, handleChange, value }: InputProps) {
  return (
    <>
      <small>
        {label}
        </small>
      <input
        type={type}
        onChange={handleChange}
        maxLength={len}
        className="bg-blue-50 text-neutral-700 peer text-sm font-medium block min-h-[auto] w-full rounded-full px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      />
    </>
  );
}
