"use client";
import { useEffect } from "react";
import React from 'react'
import { Search } from '../icons/Search'

const Hero = () => {
  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);
  return (
    <section className="mb-32 md:mb-0 md:min-h-screen">
     <div className="flex justify-center">
        <img
          alt='Davido'
          src='/img/femi.jpg'
          className="rounded-full w-full h-[20rem] object-cover bg-center bg-cover bg-lightgray-500"
          style={{
            background: 'lightgray 50% / cover no-repeat'
          }}
        ></img>
      </div>

  
    </section>
  )
}

export default Hero