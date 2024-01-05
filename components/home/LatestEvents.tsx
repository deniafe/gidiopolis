import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import PrimaryButton from '../global/PrimaryButton'
import { FirebaseEvent, getEvents } from '@/firebase/firestore/get_data';
import { useEventContext } from '@/context/EventContext'

interface LatestEventProps {
  firebaseEvents: FirebaseEvent[] | undefined;
}

const LatestEvent = () => {
  const { firebaseEvents, setCurrentCount, getAllEvents, getAllCategoryEvents, selectedCategory } = useEventContext()

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  const handleShowMore = async () => {
    if(selectedCategory === 'All') {
      setCurrentCount((prevCount: number) => prevCount + 8);
      await getAllEvents()
    } else {
      await getAllCategoryEvents()
    }
    
  };
  

  return (
    <section
      className="mb-24 md:mb-24 md:min-h-screen"
    >
       <h2 className="flex justify-center md:justify-start text-[1.75rem] text-black font-medium px-[2rem]">
          Latest Events
        </h2>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
        {firebaseEvents?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <EventCard id={event.id} slug={event.data.slug}  imageUrl={event.data.eventBanner} title={event.data.eventName} date={event.data.eventDate} time={event.data.eventTime} venue={event.data.eventAddress} isFree={event.data.eventPrice} organizer={event.data.organizerName} />
          </div>
        ))}
      </div>
        
      <div className="flex justify-center mt-8" >
        <PrimaryButton onClick={handleShowMore}>
          <div className=" px-[4rem] text-lg">See More</div>
        </PrimaryButton>
      </div>
      
    </section>
  )
}

export default LatestEvent