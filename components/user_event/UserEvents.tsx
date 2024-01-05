import React from 'react'
import UserEventCard from './UserEventCard'
import PrimaryButton from '../global/PrimaryButton'
import { useEventContext } from '@/context/UserEventContext'

const UserEvents = () => {
  const { getEvents, userEvents, setCurrentCount } = useEventContext()

  const handleShowMore = () => { 
    setCurrentCount((prevCount: number) => prevCount + 8)
    getEvents()
  }
  

  return (
    <section
      className="mb-24 md:mb-24 md:min-h-screen"
    >
       <h1 className="flex justify-center md:justify-start text-[1.75rem] md:text-[2rem] text-black font-medium px-[2rem]">
          Your Events
        </h1>

      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-12 px-[2rem]">
        {userEvents?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <UserEventCard id={event.id} slug={event.data.slug}  imageUrl={event.data.eventBanner} title={event.data.eventName} date={event.data.eventDate} time={event.data.eventTime} venue={event.data.eventAddress} isFree={event.data.eventPrice} isApproved={event.data.isApproved} organizer={event.data.organizerName} />
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

export default UserEvents