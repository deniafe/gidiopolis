import { useEffect, useRef  } from "react";
import { Search } from '../icons/Search';

const SearchInput = () => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the input element when the component is mounted
    if(inputRef.current) {
      console.log('There isinput ref')
      inputRef.current.focus();
    }
    
  }, []);

  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown });
    };
    init();
  }, []);

  return (
    <div className="mb-3">
      <div className="relative mb-4 rounded-full flex w-full items-stretch shadow-[0_3px_8px_-4px_#31859C]">
        <input
          ref={inputRef}
          type="search"
          className="relative focus m-0 md:-mr-0.5 block w-[16rem] md:w-[49rem] min-w-0 flex-auto rounded-l-full border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none  transition duration-200 ease-in-out focus:z-[3] focus:border-my-primary focus:text-gray-700 focus:shadow-[inset_0_0_0_1px_#31859C] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-my-primary"
          placeholder="Search For Any Event"
          aria-label="Search"
          aria-describedby="button-addon1" />

        {/* Search button */}
        <div
          className="relative z-[2] flex items-center rounded-r-full bg-my-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-lg focus:bg-cyan-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-lg"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchInput