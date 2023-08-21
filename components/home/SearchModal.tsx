import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SearchOptions from './SearchOptions';
import { SearchParameters, buildSearchURL } from '@/utils/func';

const SearchModal = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [when, setWhen] = useState('')
  const [where, setWhere] = useState('')
  const [price, setPrice] = useState('')
  const [searchUrl, setSearchUrl] = useState('/')

  let urlOptions: SearchParameters = {}

  const handleQuery = (query: string) => {
    setQuery(query)
    urlOptions.query = query
    urlOptions.category = category
    urlOptions.date = when
    urlOptions.venue = where
    urlOptions.price = price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const handleCategory = (category: string) => {
    setCategory(category)
    urlOptions.query = query
    urlOptions.category = category
    urlOptions.date = when
    urlOptions.venue = where
    urlOptions.price = price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const handleWhen = (when: string) => {
    setWhen(when)
    urlOptions.query = query
    urlOptions.category = category
    urlOptions.date = when
    urlOptions.venue = where
    urlOptions.price = price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const handleWhere = (where: string) => {
    setWhere(where)
    urlOptions.query = query
    urlOptions.category = category
    urlOptions.date = when
    urlOptions.venue = where
    urlOptions.price = price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const handlePrice = (price: string) => {
    setPrice(price)
    urlOptions.query = query
    urlOptions.category = category
    urlOptions.date = when
    urlOptions.venue = where
    urlOptions.price = price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const closeModal = async () => {
    const { Modal } = await import("tw-elements")
      const myModal = Modal.getInstance(document.getElementById("exampleModalFullscreen"))
      myModal.hide()
  }

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalFullscreen"
      tabIndex={-1}
      aria-labelledby="exampleModalFullscreenLabel"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none"
      >
        <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 min-[0px]:rounded-none">
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalFullscreenLabel">
              {/* Search For Any Event */}
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="relative p-4 min-[0px]:overflow-y-auto">
          <div className="mb-3 mt-8 justify-center flex">
            <SearchInput closeModal={closeModal} handleQuery={handleQuery} searchUrl={searchUrl}/>
          </div>
          <SearchOptions handleCategory={handleCategory} handleWhen={handleWhen} handleWhere={handleWhere} handlePrice={handlePrice} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
