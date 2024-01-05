'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Loading } from '../global/Loading';import { UploadInput } from '../global/UploadInput';
import { catexts, states } from '@/utils/constants';
import { SelectInput } from '../global/SelectInput';
import { Input } from '../global/Input';
import { DateInput } from '../global/DateInput';
import { TimeInput } from '../global/TimeInput';
import { TextArea } from '../global/TextArea';
import { errorMessage } from '@/firebase/error_message';
import { editData } from '@/firebase/firestore/add_data';
import { successMessage } from '@/firebase/success_message';
import { useAuthContext } from '@/context/AuthContext';
import { convertToTimestamp, createSlug, formatDate, formatDateFromTimestamp, isFirebaseStorageUrl, makePrice, validateEmail, validatePhoneNumber, validatePrice, validateUrl } from '@/utils/func';
import { useRouter } from 'next/navigation';
import { addImage, deleteImage } from '@/firebase/firestore/add_image';
import { FirebaseEvent } from '@/firebase/firestore/get_data';
import { Timestamp } from 'firebase/firestore';
import { LGA } from '@/types';
import SocialLinkForm from '../event/SocialLinkForm';
import DescriptionForm from '../event/DescriptionForm';
import AddressForm from '../event/AddressForm';
import DateForm from '../event/DateForm';
import EventBasicsForm from '../event/EventBasicsForm';
import OrganizerDetailsForm from '../event/OrganizerDetailsForm';
import PrimaryButton from '../global/PrimaryButton';
import { addDays } from 'date-fns';
import Steps from '../event/Steps';

enum STEPS {
  ORGANIZER = 0,
  BASICS = 1,
  DESCRIPTION = 2,
  DATE = 3,
  ADDRESS = 4,
  LINKS = 5,
}

interface EditEventForm {
  id: string;
  slug?: string;
  imageUrl?: string;
  name?: string;
  title?: string;
  email?: string;
  number?: string;
  website?: string
  aboutOrganizer?: string
  // date?: Timestamp;
  date?: {startDate: Timestamp, endDate: Timestamp, key: string};
  time?: string;
  venue?: {state: string, region: string, street: string, zoom: number, center: [number, number]};
  category?: string;
  priceAmount?: string;
  price?: string;
  isApproved?: string;
  description?: string;
  eventTwitter?: string;
  eventLinkedin?: string;
  eventInstagram?: string;
}


const EditEventForm: React.FC<EditEventForm> = ({ id, slug, imageUrl, name, title, email, number, website, aboutOrganizer, date, time, category, priceAmount, price, venue, isApproved, description, eventTwitter, eventLinkedin, eventInstagram }) => {
  const { user } = useAuthContext()
  const router = useRouter()
  
  const [step, setStep] = useState(STEPS.ORGANIZER);
  const [loading, setLoading] = useState(false);
  const [organizerName, setOrganizerName] = useState(name || '');
  const [organizerEmail, setOrganizerEmail] = useState(email || '');
  const [organizerNumber, setOrganizerNumber] = useState(number || '');
  const [organizerWebsite, setOrganizerWebsite] = useState(website || '');
  const [organizerDescription, setOrganizerDescription] = useState(aboutOrganizer || '');
  const [eventName, setEventName] = useState(title || '');
  const [eventCategory, setEventCategory] = useState(category || '');
  const [eventPrice, setEventPrice] = useState(price || '');
  const [eventPriceAmount, setEventPriceAmount] = useState(priceAmount || '0');
  const [eventBanner, setEventBanner] = useState(imageUrl || '');
  const [eventDate, setEventDate] = useState<any[]>(
    [
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]
  );
  const [eventTime, setEventTime] = useState(time || '');
  const [eventState, setEventState] = useState('');
  const [eventRegion, setEventRegion] = useState('');
  const [regions, setRegions] = useState<LGA[]>([])
  const [regionNames, setRegionNames] = useState<string[]>(['']) 
  const [center, setCenter] = useState<number[]>([6.5244, 3.3792])
  const [zoom, setZoom] = useState<number>(8)
  const [eventAddress, setEventAddress] = useState('');
  const [eventDescription, setEventDescription] = useState(description || '');
  const [twitter, setTwitter] = useState(eventTwitter || '');
  const [instagram, setInstagram] = useState(eventInstagram || '');
  const [linkedIn, setLinkedIn] = useState(eventLinkedin || '');


  function validateForm() {
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


  async function handleEventEdit(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if(loading) return

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
      slug: createSlug(eventName),
      twitter,
      instagram,
      linkedIn
    }

    console.log('sending details for updating', id, data)

    const { result, error } = await editData('events', id, data)


    // If there is an error editing the event, return an error message
    if (error) {
      setLoading(false)
      return errorMessage(error)
    }

    successMessage("Event edited successfully 🎉")
    setLoading(false)
    return router.push("/");

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
      return 'Update Event'
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
    // Check if the URL does not end with "/create-event"
    if (!window.location.pathname.endsWith("/create-event")) {
      const init = async () => {
        const { Datepicker, Timepicker, Select, initTE } = await import("tw-elements");
        initTE({ Datepicker, Timepicker, Select });
        console.log('Launching date picker in edit event form', price, priceAmount)
      };
      init();
    }
  }, []);

  useEffect(() => {

    const eDate = {
      startDate: date && date.startDate.toDate(),
      endDate:  date && date.endDate.toDate(),
      key: date?.key
    }

    setEventDate([eDate])
    setEventState(venue?.state || '')
    setEventRegion(venue?.region || '')
    setEventAddress(venue?.street || '')
    setCenter(venue?.center || [0, 0])
    setZoom(venue?.zoom || 8)
  }, [date,venue ])

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

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
            Edit {eventName} Event
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

                <PrimaryButton onClick={handleEventEdit}>
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

export default EditEventForm