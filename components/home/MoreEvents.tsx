import React from 'react'
import EventCard from './EventCard'
import PrimaryButton from '../global/PrimaryButton'
import { FirebaseEvent } from '@/firebase/firestore/get_data';

interface MoreEventProps {
  firebaseEvents: FirebaseEvent[] | undefined;
}

const MoreEvent = ({firebaseEvents}: MoreEventProps) => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!")
    // Additional logic or state changes can be performed here
  };

  return (
    <section
      className="mb-24 md:mb-24 md:min-h-screen"
    >

       <h2 className="flex justify-center md:justify-start text-[1.75rem] text-black font-medium px-[2rem]">
        More Events 
      </h2>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
        {firebaseEvents?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <EventCard id={event.id} slug={event.data.slug}  imageUrl={event.data.eventBanner} title={event.data.eventName} date={event.data.eventDate} time={event.data.eventTime} venue={event.data.eventAddress} isFree={event.data.eventPrice} organizer={event.data.organizerName} />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8" >
        <PrimaryButton onClick={handleButtonClick}>
          <div className=" px-[4rem] text-lg">See More</div>
        </PrimaryButton>
      </div>
      
    </section>
    
  )
}

export default MoreEvent