'use client'

import SimilarEvent from "@/components/event/SimilarEvent";
import SearchInput2 from "@/components/home/SearchInput2";
import SearchOptions from "@/components/home/SearchOptions";
import { SearchParameters, buildSearchURL } from "@/utils/func";
import { useSearchEventContext } from '@/context/SearchEventContext'
import { useEffect, useState } from "react";

export default function SearchResultBar() {
  const { searchUrl, setSearchUrl, searchOptions, setSearchOptions } = useSearchEventContext()
  const [query, setQuery] = useState('')
  
  let urlOptions: SearchParameters = {}

  const handleQuery = (query: string) => {
    setQuery(query)
    urlOptions.query = query
    urlOptions.category = searchOptions?.category
    urlOptions.date = searchOptions?.when
    urlOptions.venue = searchOptions?.where
    urlOptions.price = searchOptions?.price
    setSearchUrl(buildSearchURL(urlOptions))
  }

  const handleCategory = (category: string) => {
    setSearchOptions((prevSearchOptions) => ({
      ...prevSearchOptions,
      category
    }))
  }

  const handleWhen = (when: string) => {
    setSearchOptions((prevSearchOptions) => ({
      ...prevSearchOptions,
      when
    }))
  }

  const handleWhere = (where: string) => {
    setSearchOptions((prevSearchOptions) => ({
      ...prevSearchOptions,
      where
    }))
  }

  const handlePrice = (price: string) => {
   setSearchOptions((prevSearchOptions) => ({
      ...prevSearchOptions,
      price
    }))
  }


  useEffect(() => {

    urlOptions.query = query
    urlOptions.category = searchOptions?.category
    urlOptions.date = searchOptions?.when
    urlOptions.venue = searchOptions?.where
    urlOptions.price = searchOptions?.price
    setSearchUrl(buildSearchURL(urlOptions))

  }, [searchOptions]);


  return (
    <>
      <div className="mb-3 mt-8 justify-center flex">

      <SearchInput2 handleQuery={handleQuery} searchUrl={searchUrl} />

      </div>

      <div className="mb-12" >
        <SearchOptions handleCategory={handleCategory} handleWhen={handleWhen} handleWhere={handleWhere} handlePrice={handlePrice} />
      </div>
          
    </>
  )
}
