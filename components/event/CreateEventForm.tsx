"use client";
import React, { useEffect, useState } from 'react'
import { Loading } from '../global/Loading';import { UploadInput } from './UploadInput';
import { catexts, states } from '@/utils/constants';
import { SelectInput } from './SelectInput';
import { Input } from './Input';
import { DateInput } from './DateInput';
import { TimeInput } from './TimeInput';
import { TextArea } from './TextArea';
import { errorMessage } from '@/firebase/error_message';
import validator from 'validator';
import addData from '@/firebase/firestore/add_data';
import { successMessage } from '@/firebase/success_message';
import { useAuthContext } from '@/context/AuthContext';
import { convertToTimestamp, createSlug } from '@/utils/func';
import { useRouter } from 'next/navigation';
import { addImage } from '@/firebase/firestore/add_image';

const CreateEventForm = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false);
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [organizerNumber, setOrganizerNumber] = useState('');
  const [organizerWebsite, setOrganizerWebsite] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventPrice, setEventPrice] = useState('');
  const [eventPriceAmount, setEventPriceAmount] = useState('');
  const [eventBanner, setEventBanner] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventState, setEventState] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');


  // Validate Twitter URL
  function isValidTwitterUrl(url: string) {
    const twitterRegex = /^https?:\/\/(?:www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}(\/)?$/;
    return twitterRegex.test(url);
  }

  // Validate Instagram URL
  function isValidInstagramUrl(url: string) {
    const instagramRegex = /^https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}(\/)?$/;
    return instagramRegex.test(url);
  }

  // Validate LinkedIn URL
  function isValidLinkedInUrl(url: string) {
    const linkedInRegex = /^https?:\/\/(?:www\.)?linkedin\.com\/(?:in|company)\/[A-Za-z0-9-]+(\/)?$/;
    return linkedInRegex.test(url);
  }


  async function handleFormSubmit(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if(loading) return
  
    // Check if any of the required fields are empty
    if (
      !organizerName ||
      !organizerEmail ||
      !organizerNumber ||
      !eventName ||
      !eventCategory ||
      !eventPrice ||
      !eventBanner ||
      !eventDate ||
      !eventTime ||
      !eventState ||
      !eventAddress ||
      !eventDescription
    ) {
      console.log("Please fill in all required fields.");
      return errorMessage('Please fill in all required fields.')
    }
  
    // Validate email using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validator.isEmail(organizerEmail)) {
      errorMessage("Invalid email format.");
      return;
    }
  
    // Validate phone number using a regular expression
    const phoneNumberRegex = /^\d{11}$/; // Change the regex according to your format
    if (!phoneNumberRegex.test(organizerNumber)) {
      errorMessage("Invalid phone number format.");
      return;
    }
  
    // Validate event price as a number
    const parsedPrice = parseFloat(eventPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setEventPrice('free')
    } else {
      setEventPriceAmount(eventPrice)
      setEventPrice('paid')
    }

    // if(!isValidTwitterUrl(twitter)) return errorMessage("Invalid twitter url.");
    // if(!isValidInstagramUrl(instagram)) return errorMessage("Invalid instagram url.");
    // if(!isValidLinkedInUrl(linkedIn)) return errorMessage("Invalid linkedin url.");


    setLoading(true)
    const data = {
      createdAt: new Date(),
      userId: user?.uid,
      organizerName,
      organizerEmail,
      organizerNumber,
      organizerWebsite,
      eventName,
      eventCategory,
      eventPrice,
      eventDate: convertToTimestamp(eventDate),
      eventPriceAmount: eventPrice,
      eventTime,
      eventState,
      eventAddress,
      eventDescription,
      slug: createSlug(eventName),
      isApproved: true
    }

    const { result, error } = await addData('events', data)

    if (error) {
      setLoading(false)
      return errorMessage(error)
    }

    if (result && eventBanner !== null) {
      const { imageResult, imageError } = await addImage({docRefId: result?.id, eventBanner})

      if (imageError) {
        setLoading(false)
        return errorMessage(error)
      }

      successMessage("Event created successfully 🎉")
      setLoading(false)
      return router.push("/");
      
    } else {
      successMessage("Event created successfully 🎉")
      setLoading(false)
      return router.push("/");
    }

  }
  
  


  useEffect(() => {
    const init = async () => {
      const {  Datepicker, Timepicker, Select, initTE } = await import("tw-elements");
      initTE({ Datepicker, Timepicker, Select});
    };
    init();

  }, []);


  return (
    <section
      className="mb-8 pt-1  md:mb-8 md:min-h-screen"
    >
      
      <div className="mt-8 md:mt-2 px-[2rem]">

        <div className="md:px-[2rem]  md:mb-0" >
          <h2 className="text-center  text-[1.75rem] text-black font-medium mb-4 md:mb-12">
            Share Your Event On Our Platform
          </h2>

          <div className="mt-4 md:px-6">

            <form className="md:mx-[4rem] md:mb-8">

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">

                {/* Organizer Name input */}
                <div className="mb-1">
                  <Input label="Organizer name" len={25} type="text" handleChange={(e) => setOrganizerName(e.target.value)} />
                </div>

                {/* Organizer Email input */}
                <div className="mb-1">
                  <Input label="Organizer Email" type="email" handleChange={(e) => setOrganizerEmail(e.target.value)} />
                </div>

                {/* Organizer Number input */}
                <div className="mb-1">
                  <Input label="Organizer Phone Number" len={13} type="text" handleChange={(e) => setOrganizerNumber(e.target.value)} />
                </div>

                {/* Organizer Website input */}
                <div className="mb-1">
                  <Input label="Organizer Website" type="text" handleChange={(e) => setOrganizerWebsite(e.target.value)} />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                {/* Event Name input */}
                <div className="mb-1">
                  <Input label="Event Name" len={25} type="text" handleChange={(e) => setEventName(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
                {/* Event Category input */}
                <div className="mb-1">
                  <SelectInput label='Event Category' items={catexts} handleChange={(value) => setEventCategory(value)} />
                </div>

                {/* Event Price input */}
                <div className="mb-1">
                  <Input label="Event Price" len={10} type="text" handleChange={(e) => setEventPrice(e.target.value)} />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                {/* Event Upload Banner */}
                <div className="mb-1">
                  <UploadInput label='Event Banner' handleChange={(e) => setEventBanner(e)} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-6 md:grid-cols-2 md:mb-2">

                {/* Event Date input */}
                <div className="mb-1">
                  <DateInput label={'Event Date'} handleChange={(value) => setEventDate(value)} />
                </div>

                {/* Time input */}
                <div className="mb-1">
                  <TimeInput label={'Event Time'} handleChange={(value) => setEventTime(value)} />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
                {/* States Select input */}
                <div className="mb-1">
                  <SelectInput label='Event State' items={states} handleChange={(value) => setEventState(value)} />
                </div>

               {/* Event Address input */}
               <div className="mb-1">
                  <Input label="Event Address" len={25} type="text" handleChange={(e) => setEventAddress(e.target.value)} />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                  {/* Event Description input */}
                <div className="mb-1">
                  <TextArea label="About Event" type="text" handleChange={(e) => setEventDescription(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 md:mb-2">

                {/* Twitter input */}
                <div className="mb-1">
                 <Input label="Twitter" type="text" handleChange={(e) => setTwitter(e.target.value)} />
                </div>

                {/* Instagram input */}
                <div className="mb-1">
                  <Input label="Instagram" type="text" handleChange={(e) => setInstagram(e.target.value)} />
                </div>

                {/* LinkedIn input */}
                <div className="mb-1">
                  <Input label="LinkedIn" type="text" handleChange={(e) => setLinkedIn(e.target.value)} />
                </div>

              </div>

              
              {/* Submit button */}
              <div
                // onClick={signUpWithEmail}
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
              </div>
             
            </form>
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}

export default CreateEventForm