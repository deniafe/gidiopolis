import React, { useEffect, useRef } from "react";
import { Search } from '../icons/Search';
import Link from "next/link";
import { EventOptions, useSearchEventContext } from '@/context/SearchEventContext'

interface SearchInputProps {
  handleQuery: (e: string) => void;
  closeModal?: () => void;
  searchUrl: string;
}

const SearchInput = ({ searchUrl, handleQuery, closeModal }: SearchInputProps) => {
  const { searchOptions, setSearchOptions } = useSearchEventContext()

  const inputRef = useRef<HTMLInputElement | null>(null);

    // Function to delete a field from searchOptions
  const deleteFieldFromSearchOptions = (fieldName: keyof EventOptions): void => {
    setSearchOptions((prevSearchOptions) => {
      const { [fieldName]: deletedField, ...rest } = prevSearchOptions ?? {}; // Provide a default value
      return rest;
    });

    // Get all radio buttons
    const radioButtons = document.querySelectorAll<HTMLInputElement>(`input[type="radio"][id^=${fieldName}]`);

     // Deselect all radio buttons when any of them is clicked
     radioButtons.forEach((rb) => {
        (rb as HTMLInputElement).checked = false;
     });
        

  };

  useEffect(() => {
    // Focus the input element when the component is mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, Chip, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Chip, Ripple, Dropdown });
    };
    init();
  }, []);

  return (
    <div className="mb-3 w-[20rem] md:w-[54rem] min-w-0">
      <div className='flex cursor-pointer mt-8 py-2 w-full rounded-full shadow-[0_3px_8px_-4px_#31859C]'>

        {/* Loop through searchOptions keys and values and render chips */}
        {searchOptions && Object.entries(searchOptions).map(([key, value], index) => (
          <div
            key={index}
            id={key}
            data-te-chip-init
            data-te-ripple-init
            className="ml-4 flex h-[28px] cursor-pointer items-center justify-between rounded-[16px] border border-[#31859C] bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[11px] font-normal normal-case leading-none text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#31859C] hover:!shadow-none dark:text-neutral-200"
            data-te-ripple-color="dark"
            onClick={() => deleteFieldFromSearchOptions(key as keyof EventOptions)}
          >
            {value}
            <span
              data-te-chip-close
              className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-3 w-3"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>
        ))}

        <input
          ref={inputRef}
          type="search"
          onChange={(e) => handleQuery(e.target.value)}
          className="relative focus m-0 md:-mr-0.5 block w-[16rem] md:w-[49rem] min-w-0 flex-auto bg-transparent bg-clip-padding px-3 text-base font-normal text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-gray-700"
          placeholder="Search For Any Event"
          aria-label="Search"
          aria-describedby="button-addon1"
        />

        <a 
          href={searchUrl}
          className="flex justify-start items-center mr-6 "
          onClick={closeModal ? closeModal : () => {}}
          >
          <Search height={20} width={20} />
        </a>
        
      </div>
    </div>
  )
}

export default SearchInput;
