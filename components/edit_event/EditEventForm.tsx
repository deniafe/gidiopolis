"use client";
import React, { useEffect, useState } from 'react'
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
  date?: Timestamp;
  time?: string;
  venue?: string;
  state?: string;
  category?: string;
  priceAmount?: string;
  price?: string;
  isApproved?: string;
  description?: string;
}


const EditEventForm: React.FC<EditEventForm> = ({ id, slug, imageUrl, name, title, email, number, website, aboutOrganizer, date, time, category, priceAmount, price, venue, state, isApproved, description }) => {
  const { user } = useAuthContext()
  const router = useRouter()
  
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
  const [eventDate, setEventDate] = useState((date && formatDateFromTimestamp(date)) || '');
  const [eventTime, setEventTime] = useState(time || '');
  const [eventState, setEventState] = useState(state || '');
  const [eventAddress, setEventAddress] = useState(venue || '');
  const [eventDescription, setEventDescription] = useState(description || '');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');



  async function handleEventEdit(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
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

    setLoading(true)

    const data = {
      organizerName,
      organizerEmail,
      organizerNumber,
      organizerWebsite,
      organizerDescription,
      eventName,
      eventCategory,
      eventPrice,
      eventDate: convertToTimestamp(eventDate),
      eventPriceAmount,
      eventTime,
      eventState,
      eventAddress,
      eventDescription,
      slug: createSlug(eventName),
      twitter,
      instagram,
      linkedIn
    }

    // setLoading(false)

    console.log('sending details for updating', id, data)

    const { result, error } = await editData('events', id, data)

    // console.log('This is the result of editing', result, error)

    // If there is an error editing the event, return an error message
    if (error) {
      setLoading(false)
      return errorMessage(error)
    }

    console.log('data to be sent to firebase', data)
    console.log('Is event image a firebase image?', isFirebaseStorageUrl(eventBanner))

    // If the data has been successfully updated and the event banner is not a firebaseStorageUrl
    if (result === 'Data successfully updated' && !isFirebaseStorageUrl(eventBanner)) {

      console.log('New image detected and we will be uplaoding it')

      // First delete the old image
      const { imageDeleteResult, imageDeleteError } = await deleteImage(id)

      // If there is an error with deleting an image, return an error message
      if (imageDeleteError) {
        setLoading(false)
        return errorMessage(error)
      }

      // If we get here, it means the image has been deleted successfully, so upload the new image
      const { imageResult, imageError } = await addImage({docRefId: id, eventBanner})

      // If there was an error uplaoding the new image, return an error message
      if (imageError) {
        setLoading(false)
        return errorMessage(error)
      }

      // If we get here, it means the image has been uploaded successfully
      successMessage("Event edited successfully 🎉")
      setLoading(false)
      return router.push("/");
      
    } else {
      successMessage("Event edited successfully 🎉")
      setLoading(false)
      return router.push("/");
    }

  }

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
    if (user == null) router.push("/")
  }, [user])


  return (
    <section
      className="mb-8 pt-1  md:mb-8 md:min-h-screen"
    >
      
      <div className="mt-8 md:mt-2 px-[2rem]">

        <div className="md:px-[2rem]  md:mb-0" >
          <h2 className="text-center  text-[1.75rem] text-black font-medium mb-4 md:mb-12">
            Edit {eventName} Event
          </h2>

          <div className="mt-4 md:px-6">

            <form 
             data-te-validation-init
             data-te-active-validation="true"
            className="md:mx-[4rem] md:mb-8"
            >

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">

                {/* Organizer Name input */}
                <div className="mb-1">
                  <Input 
                    label="Organizer name" 
                    len={25} 
                    type="text" 
                    value={organizerName}
                    rules={(val: string) => val.length < 3 }
                    errorMessage='Organizer Name cannot be less than 2 chacracters'
                    handleChange={(val) => setOrganizerName(val)} 
                  />
                  </div>

                {/* Organizer Email input */}
                <div className="mb-1">
                  <Input 
                    label="Organizer Email" 
                    type="email" 
                    value={organizerEmail}
                    rules={(val: string) => !validateEmail(val) }
                    errorMessage='Organizer Email must be valid'
                    handleChange={(val) => setOrganizerEmail(val)} 
                  />
                </div>

                {/* Organizer Number input */}
                <div className="mb-1">
                  <Input 
                    label="Organizer Phone Number" 
                    len={13} type="text" 
                    value={organizerNumber}
                    rules={(val: string) => !validatePhoneNumber(val) }
                    errorMessage='Organizer Phone Number must be valid'
                    handleChange={(val) => setOrganizerNumber(val)} 
                  />
                </div>

                {/* Organizer Website input */}
                <div className="mb-1">
                  <Input 
                    label="Organizer Website" 
                    type="text" 
                    value={organizerWebsite}
                    rules={(val: string) => !validateUrl(val) }
                    errorMessage='Organizer Website url must be valid'
                    handleChange={(val) => setOrganizerWebsite(val)} 
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                  {/* About Organizer input */}
                <div className="mb-1">
                  <TextArea 
                    label="About Organizer" 
                    type="text" 
                    rules={(val: string) => val.length < 50 }
                    errorMessage='About organizer cannot be less than 50 chacracters'
                    handleChange={(val) => setOrganizerDescription(val)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                {/* Event Name input */}
                <div className="mb-1">
                  <Input 
                    label="Event Name" 
                    len={25} type="text" 
                    value={eventName}
                    rules={(val: string) => val.length < 3 }
                    errorMessage='Event Name cannot be less than 2 chacracters'
                    handleChange={(val) => setEventName(val)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
                {/* Event Category input */}
                <div className="mb-1">
                  <SelectInput value={eventCategory} label='Event Category' items={catexts} handleChange={(value) => setEventCategory(value)} />
                </div>

                {/* Event Price input */}
                <div className="mb-1">
                  <Input 
                    label="Event Price" 
                    len={10} 
                    type="text" 
                    value={eventPriceAmount}
                    rules={(val: string) => !validatePrice(val) }
                    errorMessage="Price should either be 'free' or a number"
                    handleChange={(val) => {
                      if(makePrice(val) === 'free') {
                        setEventPrice('free')
                        setEventPriceAmount('0')
                      } else if(makePrice(val) === 'paid') {
                        setEventPrice('paid')
                        setEventPriceAmount(val)
                      }
                      
                    }} 
                    />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                {/* Event Upload Banner */}
                <div className="mb-1">
                  <UploadInput value={eventBanner} label='Event Banner' handleChange={(e) => setEventBanner(e)} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-6 md:grid-cols-2 md:mb-2">

                {/* Event Date input */}
                <div className="mb-1">
                  <DateInput value={eventDate} label={'Event Date'} handleChange={(value) => setEventDate(value)} /> 
                </div>

                {/* Time input */}
                <div className="mb-1">
                  <TimeInput value={eventTime} label={'Event Time'} handleChange={(value) => setEventTime(value)} />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
                {/* States Select input */}
                <div className="mb-1">
                  <SelectInput value={eventState} label='Event State' items={states} handleChange={(value) => setEventState(value)} />
                </div>

               {/* Event Address input */}
               <div className="mb-1">
                  <Input 
                    label="Event Address" 
                    len={25} type="text" 
                    value={eventAddress}
                    rules={(val: string) => val.length < 6 }
                    errorMessage='Event Address cannot be less than 6 chacracters'
                    handleChange={(val) => setEventAddress(val)} 
                    />
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
                  {/* Event Description input */}
                <div className="mb-1">
                  <TextArea 
                    label="About Event" 
                    type="text" 
                    value={eventDescription}
                    rules={(val: string) => val.length < 50 }
                    errorMessage='Event Description cannot be less than 50 chacracters'
                    handleChange={(val) => setEventDescription(val)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 md:mb-2">

                {/* Twitter input */}
                <div className="mb-1">
                 <Input 
                  label="Twitter" 
                  type="text"
                  value={twitter}
                  rules={(val: string) => !validateUrl(val) }
                  errorMessage='Url must be valid'
                  handleChange={(val) => setTwitter(val)} 
                  />
                </div>

                {/* Instagram input */}
                <div className="mb-1">
                  <Input 
                    label="Instagram" 
                    type="text"
                    value={instagram}
                    rules={(val: string) => !validateUrl(val) }
                    errorMessage='Url must be valid'
                    handleChange={(val) => setInstagram(val)} 
                  />
                </div>

                {/* LinkedIn input */}
                <div className="mb-1">
                  <Input 
                    label="LinkedIn" 
                    type="text"
                    value={linkedIn}
                    rules={(val: string) => !validateUrl(val) }
                    errorMessage='Url must be valid'
                    handleChange={(val) => setLinkedIn(val)} 
                  />
                </div>

              </div>
              
              {/* Submit button */}
              <div
                className="my-8 inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleEventEdit}
              >

                {
                  loading ?
                  (<Loading />) :
                  (
                    <span>
                      Edit Event
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

export default EditEventForm