// {/* <section
// className="mb-8 pt-1  md:mb-8 md:min-h-screen"
// >

// <div className="mt-8 md:mt-2 px-[2rem]">

//   <div className="md:px-[2rem]  md:mb-0" >
//     <h2 className="text-center  text-[1.75rem] text-black font-medium mb-4 md:mb-12">
//       Edit {eventName} Event
//     </h2>

//     <div className="mt-4 md:px-6">

//       <form 
//        data-te-validation-init
//        data-te-active-validation="true"
//       className="md:mx-[4rem] md:mb-8"
//       >

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">

//           {/* Organizer Name input */}
//           <div className="mb-1">
//             <Input 
//               label="Organizer name" 
//               len={25} 
//               type="text" 
//               value={organizerName}
//               rules={(val: string) => val.length < 3 }
//               errorMessage='Organizer Name cannot be less than 2 chacracters'
//               handleChange={(val) => setOrganizerName(val)} 
//             />
//             </div>

//           {/* Organizer Email input */}
//           <div className="mb-1">
//             <Input 
//               label="Organizer Email" 
//               type="email" 
//               value={organizerEmail}
//               rules={(val: string) => !validateEmail(val) }
//               errorMessage='Organizer Email must be valid'
//               handleChange={(val) => setOrganizerEmail(val)} 
//             />
//           </div>

//           {/* Organizer Number input */}
//           <div className="mb-1">
//             <Input 
//               label="Organizer Phone Number" 
//               len={13} type="text" 
//               value={organizerNumber}
//               rules={(val: string) => !validatePhoneNumber(val) }
//               errorMessage='Organizer Phone Number must be valid'
//               handleChange={(val) => setOrganizerNumber(val)} 
//             />
//           </div>

//           {/* Organizer Website input */}
//           <div className="mb-1">
//             <Input 
//               label="Organizer Website" 
//               type="text" 
//               value={organizerWebsite}
//               rules={(val: string) => !validateUrl(val) }
//               errorMessage='Organizer Website url must be valid'
//               handleChange={(val) => setOrganizerWebsite(val)} 
//             />
//           </div>

//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
//             {/* About Organizer input */}
//           <div className="mb-1">
//             <TextArea 
//               label="About Organizer" 
//               type="text" 
//               rules={(val: string) => val.length < 50 }
//               errorMessage='About organizer cannot be less than 50 chacracters'
//               handleChange={(val) => setOrganizerDescription(val)} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
//           {/* Event Name input */}
//           <div className="mb-1">
//             <Input 
//               label="Event Name" 
//               len={25} type="text" 
//               value={eventName}
//               rules={(val: string) => val.length < 3 }
//               errorMessage='Event Name cannot be less than 2 chacracters'
//               handleChange={(val) => setEventName(val)} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
//           {/* Event Category input */}
//           <div className="mb-1">
//             <SelectInput value={eventCategory} label='Event Category' items={catexts} handleChange={(value) => setEventCategory(value)} />
//           </div>

//           {/* Event Price input */}
//           <div className="mb-1">
//             <Input 
//               label="Event Price" 
//               len={10} 
//               type="text" 
//               value={eventPriceAmount}
//               rules={(val: string) => !validatePrice(val) }
//               errorMessage="Price should either be 'free' or a number"
//               handleChange={(val) => {
//                 if(makePrice(val) === 'free') {
//                   setEventPrice('free')
//                   setEventPriceAmount('0')
//                 } else if(makePrice(val) === 'paid') {
//                   setEventPrice('paid')
//                   setEventPriceAmount(val)
//                 }
                
//               }} 
//               />
//           </div>

//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
//           {/* Event Upload Banner */}
//           <div className="mb-1">
//             <UploadInput value={eventBanner} label='Event Banner' handleChange={(e) => setEventBanner(e)} />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-6 md:grid-cols-2 md:mb-2">

//           {/* Event Date input */}
//           <div className="mb-1">
//             <DateInput value={eventDate} label={'Event Date'} handleChange={(value) => setEventDate(value)} /> 
//           </div>

//           {/* Time input */}
//           <div className="mb-1">
//             <TimeInput value={eventTime} label={'Event Time'} handleChange={(value) => setEventTime(value)} />
//           </div>

//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 md:mb-2">
//           {/* States Select input */}
//           <div className="mb-1">
//             <SelectInput value={eventState} label='Event State' items={states} handleChange={(value) => setEventState(value)} />
//           </div>

//          {/* Event Address input */}
//          <div className="mb-1">
//             <Input 
//               label="Event Address" 
//               len={25} 
//               type="text" 
//               value={eventAddress}
//               rules={(val: string) => val.length < 6 }
//               errorMessage='Event Address cannot be less than 6 chacracters'
//               handleChange={(val) => setEventAddress(val)} 
//               />
//           </div>

//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-1 md:mb-2">
//             {/* Event Description input */}
//           <div className="mb-1">
//             <TextArea 
//               label="About Event" 
//               type="text" 
//               value={eventDescription}
//               rules={(val: string) => val.length < 50 }
//               errorMessage='Event Description cannot be less than 50 chacracters'
//               handleChange={(val) => setEventDescription(val)} 
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-3 md:mb-2">

//           {/* Twitter input */}
//           <div className="mb-1">
//            <Input 
//             label="Twitter" 
//             type="text"
//             value={twitter}
//             rules={(val: string) => !validateUrl(val) }
//             errorMessage='Url must be valid'
//             handleChange={(val) => setTwitter(val)} 
//             />
//           </div>

//           {/* Instagram input */}
//           <div className="mb-1">
//             <Input 
//               label="Instagram" 
//               type="text"
//               value={instagram}
//               rules={(val: string) => !validateUrl(val) }
//               errorMessage='Url must be valid'
//               handleChange={(val) => setInstagram(val)} 
//             />
//           </div>

//           {/* LinkedIn input */}
//           <div className="mb-1">
//             <Input 
//               label="LinkedIn" 
//               type="text"
//               value={linkedIn}
//               rules={(val: string) => !validateUrl(val) }
//               errorMessage='Url must be valid'
//               handleChange={(val) => setLinkedIn(val)} 
//             />
//           </div>

//         </div>
        
//         {/* Submit button */}
//         <div
//           className="my-8 inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//           data-te-ripple-init
//           data-te-ripple-color="light"
//           onClick={handleEventEdit}
//         >

//           {
//             loading ?
//             (<Loading />) :
//             (
//               <span>
//                 Update Event
//               </span>
//             )
//           }
//         </div>
       
//       </form>
//     </div>
    
//   </div>
  
// </div>

// </section> */}
