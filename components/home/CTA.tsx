import React from 'react'
import EventCard from './EventCard'
import PrimaryButton from '../global/PrimaryButton'

const CTA = () => {

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("Button clicked from parent component!");
    // Additional logic or state changes can be performed here
  };

  return (
    <section
      className="mb-20 md:mb-8 md:min-h-screen"
    >
      
      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 mt-12 md:pt-32 px-[2rem]">

        <div className="md:px-[2rem] mt-12 mb-12 md:mb-0" >
          <h2 className="text-center md:text-left text-[1.75rem] text-black font-medium mb-4 ">
            Showcase Your Events
          </h2>
          <p className="mb-6 text-center md:text-left">
          Ready to showcase your amazing upcoming event to a diverse and engaged audience? Submit your event to our platform
          </p>
          <div className="flex justify-center md:justify-start">
            <PrimaryButton onClick={handleButtonClick}>
              <div className=" px-[2rem] md:px-[4rem] text-lg">Submit Event</div>
            </PrimaryButton>
          </div>
          
        </div>

        <div className="flex relative justify-center">
        <div className="hidden md:block absolute top-[2rem] left-[3rem] h-8 w-8 rounded-lg bg-cyan-400"></div>
          <div className="hidden md:block absolute top-[4rem] left-[5rem] h-12 w-12 rounded-xl bg-my-primary"></div>
          <img
            alt='Davido'
            className="rounded-3xl md:rounded-3xl w-[18rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/davido.jpg'
          ></img>
        </div>
        
      </div>
      
    </section>
  )
}

export default CTA