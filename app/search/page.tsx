"use client";
import SearchResultBar from "@/components/event/SearchResultBar";
import SimilarEvent from "@/components/event/SimilarEvent";
import { Spinner } from "@/components/global/Loading";
import { Empty } from "@/components/icons/Empty";
import { FirebaseEvent, getCategoryEvents, SearchOptions as ISearchOptions, searchEvents } from "@/firebase/firestore/get_data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event() {
  const [events, setEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams()
  const query = searchParams.get("query")
  const category = searchParams.get("category")
  const venue = searchParams.get("venue")
  const price = searchParams.get("price")
  const date = searchParams.get("date")

  useEffect(() => {
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

  useEffect(() => {
    // Function to scroll to the element with id "scroll"
    const scrollToScrollDiv = () => {
      const scrollDiv = document.getElementById("scroll");
      if (scrollDiv) {
        // Use the scrollTo method to scroll to the element's top position
        scrollDiv.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Call the scrollToScrollDiv function when the component mounts
    scrollToScrollDiv();
  }, []); 

  return (
    <main className="bg-white pt-16 md:pt-32 md:px-[2rem]">
      <SearchResultBar />
      <div id="scroll" className="h-40" ></div>
      {loading ? (
      <div
          className="text-my-primary h-96"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {events && events.length === 0 ? (
            <div>
              <div
                className="text-my-primary md:mt-12 md:mb-8"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Empty />
              </div>
              <p className="text-center mt-4 mb-32" >No data available</p>
            </div>
          ) : 
          (
            <>
              <SimilarEvent title={'Search Result'} firebaseEvents={events}/>
            </>
          )
          }
        </>
        
      )}
          
    </main>
  )
}
