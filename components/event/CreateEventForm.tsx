'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { addDays } from 'date-fns';
import { Loading } from '../global/Loading';
import { errorMessage } from '@/firebase/error_message';
import {addData} from '@/firebase/firestore/add_data';
import { successMessage } from '@/firebase/success_message';
import { useAuthContext } from '@/context/AuthContext';
import { convertToTimestamp, createSlug, makePrice, validateEmail, validatePhoneNumber, validatePrice, validateUrl } from '@/utils/func';
import { useRouter } from 'next/navigation';
import { addImage } from '@/firebase/firestore/add_image';
import OrganizerDetailsForm from './OrganizerDetailsForm';
import Steps from './Steps';
import PrimaryButton from '../global/PrimaryButton';
import EventBasicsForm from './EventBasicsForm';
import DateForm from './DateForm';
import AddressForm from './AddressForm';
import DescriptionForm from './DescriptionForm';
import SocialLinkForm from './SocialLinkForm';
import { LGA } from '@/types';
import { Timestamp } from 'firebase/firestore';

enum STEPS {
  ORGANIZER = 0,
  BASICS = 1,
  DESCRIPTION = 2,
  DATE = 3,
  ADDRESS = 4,
  LINKS = 5,
}

const CreateEventForm = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  
  const [step, setStep] = useState(STEPS.ORGANIZER);
  const [loading, setLoading] = useState(false);
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [organizerNumber, setOrganizerNumber] = useState('');
  const [organizerWebsite, setOrganizerWebsite] = useState('');
  const [organizerDescription, setOrganizerDescription] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventPriceAmount, setEventPriceAmount] = useState('');
  const [eventBanner, setEventBanner] = useState('');
  const [eventDate, setEventDate] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  const [eventTime, setEventTime] = useState<string>('12:00 am');
  const [eventState, setEventState] = useState('');
  const [eventRegion, setEventRegion] = useState('');
  const [regions, setRegions] = useState<LGA[]>([])
  const [regionNames, setRegionNames] = useState<string[]>(['']) 
  const [center, setCenter] = useState<number[]>([6.5244, 3.3792])
  const [zoom, setZoom] = useState<number>(8)
  const [eventAddress, setEventAddress] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  function validateForm() {
    if(loading) return

    if(organizerName.length < 3) {
      return errorMessage("Organizer's name must not be empty and should be more than 3 characters");
    }
    
    if (!validateEmail(organizerEmail)) {
      return errorMessage("Organizer's email is empty or invalid.");
    }
  
    if (!validatePhoneNumber(organizerNumber)) {
      return errorMessage("Organizer's phone number is empty or invalid.");
    }

    if (!validateUrl(organizerWebsite)) {
      return errorMessage("Organizer's website url is empty or invalid.");
    }

    if(organizerDescription.length < 50) {
      return errorMessage("About organizer must not be empty and should be more than 50 characters");
    }

    if(eventName.length < 3) {
      return errorMessage("Event name must not be empty and should be more than 3 characters");
    }

    if(eventCategory.length < 1) {
      return errorMessage("Event category must not be empty");
    }

    if(!validatePrice(eventPriceAmount)) {
      return errorMessage("Price should either be 'free' or a number" + eventPrice);
    }

    if(eventBanner.length < 1) {
      return errorMessage("Event banner must not be empty");
    }

    if(eventDate.length < 1) {
      return errorMessage("Event date must not be empty");
    }

    if(eventTime.length < 1) {
      return errorMessage("Event time must not be empty");
    }

    if(eventState.length < 1) {
      return errorMessage("Event state must not be empty");
    }

    if(eventAddress.length < 6) {
      return errorMessage("Event address must not be empty and should be more than 6 characters");
    }

    if(eventDescription.length < 50) {
      return errorMessage("Event description must not be empty and should be more than 50 characters");
    }

    if (twitter && !validateUrl(twitter)) {
      return errorMessage("Invalid twitter url format - Event twitter url invalid.");
    }

    if (instagram && !validateUrl(instagram)) {
      return errorMessage("Invalid instagram url format - Event instagram url invalid.");
    }

    if (linkedIn && !validateUrl(linkedIn)) {
      return errorMessage("Invalid linkedIn url format - Event linkedin url invalid.");
    }

    return true
  }

  async function handleFormSubmit(event: React.MouseEvent<HTMLDivElement>) {

    event.preventDefault();

    if (step !== STEPS.LINKS) {
      return onNext();
    }

    // If form has not been validated successfully, dont return anything
    if (!validateForm()) return 

    setLoading(true)

    const eDate = {
      startDate: Timestamp.fromDate(eventDate[0].startDate),
      endDate: Timestamp.fromDate(eventDate[0].endDate),
      key: eventDate[0].key
    }
    const eaddress = {
      state: eventState,
      region: eventRegion,
      street: eventAddress,
      center,
      zoom
    }
    const eslug = createSlug(eventName)

    const data = {
      createdAt: new Date(),
      userId: user?.uid,
      organizerName,
      organizerEmail,
      organizerNumber,
      organizerWebsite,
      organizerDescription,
      eventName,
      eventCategory,
      eventPrice,
      eventBanner,
      eventDate: eDate,
      eventPriceAmount,
      eventTime,
      eventAddress: eaddress,
      eventDescription,
      slug: eslug,
      twitter,
      instagram,
      linkedIn,
      isApproved: false
    }

    console.log('data to be sent to firebase', data)

    const { result, error } = await addData('events', data)

    if (error) {
      setLoading(false)
      return errorMessage(error)
    }

    successMessage("Event created successfully 🎉")
    setLoading(false)
    return router.push("/")


    // if (result && eventBanner !== null) {
    //   const { imageResult, imageError } = await addImage({docRefId: result?.id, eventBanner})

    //   if (imageError) {
    //     setLoading(false)
    //     return errorMessage(error)
    //   }

    //   successMessage("Event created successfully 🎉")
    //   setLoading(false)
    //   return router.push("/");
      
    // } else {
    //   successMessage("Event created successfully 🎉")
    //   setLoading(false)
    //   return router.push("/");
    // }

  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const secondaryAction = step === STEPS.ORGANIZER ? undefined : onBack

  const actionLabel = useMemo(() => {
    if (step === STEPS.LINKS) {
      return 'Create New Event'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.ORGANIZER) {
      return undefined
    }

    return 'Back'
  }, [step]);

  useEffect(() => {
    if (window.location.pathname.endsWith("/create-event")) {
      const init = async () => {
        const { Datepicker, Timepicker, Select, Animate, initTE } = await import("tw-elements");
        initTE({ Datepicker, Timepicker, Select, Animate });
        console.log('Launching date picker in create event form', 'I am still rendering')
      };
      init();
    }
  }, []);

  let bodyContent = (
    <OrganizerDetailsForm
      setOrganizerName={setOrganizerName}
      setOrganizerEmail={setOrganizerEmail}
      setOrganizerNumber={setOrganizerNumber}
      setOrganizerWebsite={setOrganizerWebsite}
      setOrganizerDescription={setOrganizerDescription}
      organizerName={organizerName}
      organizerEmail={organizerEmail}
      organizerNumber={organizerNumber}
      organizerWebsite={organizerWebsite}
      organizerDescription={organizerDescription}
    />
  )

  if (step === STEPS.BASICS) {
    bodyContent = (
      <EventBasicsForm
      setEventName={setEventName}
      setEventCategory={setEventCategory}
      setEventPrice={setEventPrice}
      setEventPriceAmount={setEventPriceAmount}
      setEventBanner={setEventBanner}
      eventName={eventName}
      eventCategory={eventCategory}
      eventPrice={eventPrice}
      eventPriceAmount={eventPriceAmount}
      eventBanner={eventBanner}
    />
    );
  }

  if (step === STEPS.DATE) {
    bodyContent = (
      <DateForm 
        setEventDate={setEventDate} 
        eventDate={eventDate} 
        setEventTime={setEventTime} 
        eventTime={eventTime}
        />
    );
  }

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <AddressForm 
        setEventState={setEventState} 
        setEventRegion={setEventRegion} 
        setEventAddress={setEventAddress} 
        setRegions={setRegions} 
        setRegionNames={setRegionNames}
        setCenter={setCenter}
        setZoom={setZoom}
        regions={regions}
        regionNames={regionNames}
        eventState={eventState}
        eventRegion={eventRegion}
        eventAddress={eventAddress}
        center={center}
        zoom={zoom}
      />
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <DescriptionForm setEventDescription={setEventDescription} eventDescription={eventDescription} />
    );
  }

  if (step === STEPS.LINKS) {
    bodyContent = (
      <SocialLinkForm 
        setTwitter={setTwitter} 
        setInstagram={setInstagram} 
        setLinkedIn={setLinkedIn}
        twitter={twitter}
        instagram={instagram}
        linkedIn={linkedIn}   
        />
    );
  }

  return (
    <section
      className="pt-1 mb-12 md:mb-16"
    >
      
      <div className="mt-8 md:mt-2 px-[2rem]">

        <div className="md:px-[2rem]  md:mb-0" >
          <h1 id="share" className="text-center text-[1.75rem] text-black font-medium mb-4 md:mb-12">
            Share Your Event On Gidiopolis
          </h1>

          <div className="mt-4 md:px-6">

            <Steps currentStep={step + 1}/>

            <form 
             data-te-validation-init
             data-te-active-validation="true"
             className="md:mx-[4rem] md:mb-8"
            >

                {bodyContent}
              
              {/* Submit button */}
              <div className="flex justify-end space-x-4 mt-[4rem]">
                {secondaryAction && secondaryActionLabel && (
                    <PrimaryButton onClick={secondaryAction}>
                      <span className="px-4">{secondaryActionLabel}</span>
                    </PrimaryButton> 
                )}

                <PrimaryButton onClick={handleFormSubmit}>
                    {
                      loading ?
                      (<Loading />) :
                      (
                        <span className="px-4">{actionLabel}</span>
                      )
                    }
                </PrimaryButton> 
              </div>
              

              {/* <div
                className="my-8 inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleFormSubmit}
              >

                {
                  loading ?
                  (<Loading />) :
                  (
                    <span>
                      Create New Event
                    </span>
                  )
                }
              </div> */}
             
            </form>
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}

export default CreateEventForm