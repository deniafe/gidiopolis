'use client'
import { cutOffLongStrings, formatDate } from '@/utils/func';
import Link from 'next/link';
import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { Edit } from '../icons/Edit';
import { Delete } from '../icons/Delete';
import { useEventContext } from '@/context/UserEventContext'

interface ReusableCardProps {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  date: {startDate: Timestamp, endDate: Timestamp, key: string};
  time: string;
  venue: {state: string, region: string, street: string, zoom: number, center: [number, number]};
  isFree: string;
  isApproved: string;
  organizer: string;
}

const UserEventCard: React.FC<ReusableCardProps> = ({ id, slug, imageUrl, title, date, time, venue, isFree, isApproved, organizer }) => {

  const { setEventDelete } = useEventContext()

  function handleButtonClick(event: { stopPropagation: () => void; }) {
    // Stop event propagation to prevent parent from receiving the click event
    event.stopPropagation();
    setEventDelete({eventId: id, eventName: title})
  }

  return (
    <div
      className="block cursor-pointer rounded w-[17rem] bg-white transition-shadow hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
        <img className="rounded-t w-full h-32 object-cover" src={imageUrl} alt="" />
        <Link href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </Link>
      </div>
      <div className="px-3 py-8">
        <h5 className="mb-2 text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          {cutOffLongStrings(title)}
        </h5>
          <p className="mb-2 text-sm font-medium text-neutral-400 dark:text-neutral-200">
        {formatDate(date.startDate)} to  {formatDate(date.endDate)}
        </p>
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
          {venue.street}, {venue.region}, {venue.state}
        </p>
        <p 
        className="mb-2 w-10 rounded text-center text-white text-xs dark:text-neutral-200"
        style={{background: isFree === 'free' ? '#31859C' : '#77933C'}}
        >
          {isFree === 'free' ? "Free" : "Paid"}
        </p>
        <h6 className="mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {cutOffLongStrings(organizer)}
        </h6>
        <div className="flex justify-between my-8" >
          <div className="flex items-end" >
            <p 
            className="mb-2 p-1 rounded text-center text-white text-sm font-medium dark:text-neutral-200"
            style={{background: isApproved ? '#36d4a5' : '#d54c4c'}}
            >
              {isApproved ? "Approved" : "Not Approved"}
            </p>
          </div>
          
          <div className='flex justify-end ' >
            <Link
              href={`/edit/${id}/${slug}`}
            >
              <button
                type="button"
                className="inline-block rounded-full bg-neutral-50 px-3 py-3 mr-4 text-xs font-medium uppercase leading-normal text-my-primary shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
                <Edit />
              </button>
            </Link>
            <button
              type="button"
              data-te-toggle="modal"
              data-te-target="#confirmDelete"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleButtonClick}
              className="inline-block rounded-full bg-neutral-50 px-3 py-3 mr-4 text-xs font-medium uppercase leading-normal text-danger shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
              <Delete />
            </button>
          </div>
        </div>

        <Link
           href={`/e/${id}/${slug}`}
        >
          <button
            type="button"
            className="inline-block rounded-full w-full bg-neutral-50 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
            View Details
          </button>
        </Link>
      
      </div>
    </div>
  )
}

export default UserEventCard