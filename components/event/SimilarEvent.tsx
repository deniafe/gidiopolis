import React, { useEffect, useState } from 'react'
// import EventCard from './EventCard'
import PrimaryButton from '../global/PrimaryButton'
import { FirebaseEvent, getEvents } from '@/firebase/firestore/get_data';
import EventCard from '../home/EventCard';

interface LatestEventProps {
  firebaseEvents: FirebaseEvent[] | undefined;
  title: string
}

const SimilarEvent = ({firebaseEvents, title}: LatestEventProps) => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  return (
    <section
      className="mb-20 md:mb-20 md:min-h-screen"
    >
       <h2 className="flex justify-center md:justify-start text-[1.5rem] text-black font-medium px-[2rem]">
          {title}
        </h2>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-6 md:mt-6 px-[2rem]">
        {firebaseEvents?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <EventCard id={event.id} slug={event.data.slug}  imageUrl={event.data.eventBanner} title={event.data.eventName} date={event.data.eventDate} time={event.data.eventTime} venue={event.data.eventAddress} state={event.data.eventState} isFree={event.data.eventPrice} organizer={event.data.organizerName} />
          </div>
        ))}
      </div>
      
    </section>
  )
}

export default SimilarEvent