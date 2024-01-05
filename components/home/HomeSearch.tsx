'use client'

import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SearchOptions from './SearchOptions';
import { SearchParameters, buildSearchURL } from '@/utils/func';

const HomeSearch = () => {
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
      id="homeSearch"
      tabIndex={-1}
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog">
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none mx-[4rem] relative flex min-h-[calc(100%-1rem)] pt-[18rem] translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[30rem]:mx-auto min-[30rem]:mt-7 min-[30rem]:min-h-[calc(100%-3.5rem)] min-[30rem]:max-w-[30rem]">
        <div
          className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div
            className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            {/* <!--Modal title--> */}
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id="exampleModalScrollableLabel">
              Modal title
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* <!--Modal body--> */}
          <div className="relative p-4">
            <p>This is a vertically centered modal.</p>
          </div>

          {/* <!--Modal footer--> */}
          <div
            className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
              data-te-ripple-init
              data-te-ripple-color="light">
              Close
            </button>
            <button
              type="button"
              className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
