import React from 'react'
import { useEffect } from "react";
import { Arts } from '../icons/Arts';
import { NightLife } from '../icons/NightLife';
import { BusinessEconomy } from '../icons/BusinessEconomy';
import { PublicSector } from '../icons/PublicSector';
import { Religious } from '../icons/Religious';
import { Tech } from '../icons/Tech';
// import { Others } from '../icons/Others';


const Categories = () => {

  useEffect(() => {
    const init = async () => {
      const { Animate, initTE } = await import("tw-elements");
      initTE({ Animate });
    };
    init();
  }, []);

  return (
    <section className="mb-24 md:mb-24">
      <h2 className="flex justify-center md:justify-start text-[1.75rem] text-black font-medium px-[2rem]">
        Categories
      </h2>
      <div className='flex flex-col items-center md:flex-row md:justify-around text-black px-[2rem] text-sm mt-8'>
        <div className='flex py-2'>
          <Arts />
          <span className='ml-2 mt-2'>
            Arts & Culture
          </span>
        </div>

        <div className='flex py-2'>
          <NightLife />
          <span className='ml-2 mt-2'>
            Night Life
          </span>
        </div>

        <div className='flex py-2'>
         <PublicSector />
          <span className='ml-2 mt-2'>
            Pubic Sector & Policy
          </span>
        </div>
       
        <div className='flex py-2'>
          <BusinessEconomy />
          <span className='ml-2 mt-2'>
            Business & Economy
          </span>
        </div>

        <div className='flex py-2'>
          <Religious />
          <span className='ml-2 mt-2'>
            Religious
          </span>
        </div>

        <div className='flex py-2'>
          <Tech />
          <span className='ml-2 mt-2'>
           IT/Tech
          </span>
        </div>

        {/* <div className='flex justify-between py-2'>
          <Others />
          <span className='ml-2 mt-2'>
           IT/Tech
          </span>
        </div> */}
      </div>
    </section>
  )
}

export default Categories