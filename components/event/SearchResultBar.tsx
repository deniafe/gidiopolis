"use client";
import SimilarEvent from "@/components/event/SimilarEvent";
import SearchInput from "@/components/home/SearchInput";
import SearchOptions from "@/components/home/SearchOptions";
import { SearchParameters, buildSearchURL } from "@/utils/func";
import { useState } from "react";

export default function SearchResultBar() {
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

  return (
    <>
      <div className="mb-3 mt-8 justify-center flex">

      <SearchInput handleQuery={handleQuery} searchUrl={searchUrl} />

      </div>

      <div className="mb-12" >
        <SearchOptions handleCategory={handleCategory} handleWhen={handleWhen} handleWhere={handleWhere} handlePrice={handlePrice} />
      </div>
          
    </>
  )
}
