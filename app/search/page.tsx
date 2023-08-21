"use client";
import SearchResultBar from "@/components/event/SearchResultBar";
import SimilarEvent from "@/components/event/SimilarEvent";
import SearchInput from "@/components/home/SearchInput";
import SearchOptions from "@/components/home/SearchOptions";
import { FirebaseEvent, getCategoryEvents, SearchOptions as ISearchOptions, searchEvents } from "@/firebase/firestore/get_data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event() {
  const [events, setEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);

  const [searchUrl, setSearchUrl] = useState('/')


  const handleQuery = (query: string) => {
    // setQuery(query)
  }

  const handleCategory = (category: string) => {
    // setCategory(category)
  }

  const handleWhen = (when: string) => {
    // setWhen(when)
  }

  const handleWhere = (where: string) => {
    // setWhere(where)
  }

  const handlePrice = (price: string) => {
    // setPrice(price)
  }


  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const category = searchParams.get("category")
  const venue = searchParams.get("venue")
  const price = searchParams.get("price")
  const date = searchParams.get("date")

  useEffect(() => {
    console.log('There is use effecttttttttttttttttttttttttttttttttttttttttttttt', category)
    setLoading(true)
    const init = async () => {
      const options: ISearchOptions = {}
      if (query) {
        options.searchTerm = query
      }
      if (category) {
        options.category = category
      }
      if (venue) {
        options.venue = venue
      }
      if (price) {
        options.price = price
      }
      if (date) {
        options.date = date
      }
      await searchEvents(options , setEvents);
      return setLoading(false)
      // await searchEvents({category: s}, setEvents)
      
    };
    init();
  }, []);

  return (
    <main className="bg-white md:pt-32 md:px-[2rem]">
         <SearchResultBar />
          

          <SimilarEvent title={'Search Result'} firebaseEvents={events}/>
    </main>
  )
}
