"use client";
import { useEffect } from "react";
import React from 'react'
import { Search } from '../icons/Search'
import SearchModal from "./SearchModal";
import Image from 'next/image'

const Hero = () => {
  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);
  return (
    <section className="mb-20 md:mb-24">
     <div className="flex flex-row justify-around">
      <div className="md:mt-6 hidden md:block">
          <Image
            alt='Davido'
            width={120}
            height={120}
            src='/img/femi.jpg'
            className="rounded-full w-[8.5rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            style={{
              background: 'lightgray 50% / cover no-repeat'
            }}
          />
        </div>

        {/* Newsletter sign-up input field */}
        <div className="mt-40 md:mt-20">
          <h1 
          className="text-center px-[1rem] md:px-0 text-[2rem] md:text-[2.5rem] font-bold text-my-primary"
          style={{
            background: 'linear-gradient(180deg, #31859C 0%, #17375E 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          >
            Find Amazing Events Happening 
            <br />
            In Your City
          </h1>
          <div 
           data-te-toggle="modal"
           data-te-target="#exampleModalFullscreen"
           data-te-ripple-init
           data-te-ripple-color="light"
           className='flex cursor-pointer mt-8 py-3 mx-[2rem] md:mx-0 rounded-full shadow-[0_3px_8px_-4px_#31859C]'>
            <div className="grow flex justify-center text-gray-600 text-xs md:text-sm">
              Search by categories, date, and location
            </div>

            <div className="flex justify-start mr-6 ">
              <Search height={20} width={20} />
            </div>
            
          </div>
        </div>

        <div className="md:mt-32 hidden md:block">
          <Image
            alt='Davido'
            width={120}
            height={120}
            className="rounded-full w-[8.5rem] h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
            src='/img/davido.jpg'
          />
        </div>
      </div>

     <SearchModal />
    </section>
  )
}

export default Hero