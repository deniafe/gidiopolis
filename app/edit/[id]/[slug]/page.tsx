"use client";
import { Spinner } from "@/components/global/Loading";
import { FirebaseEvent, getDocument } from "@/firebase/firestore/get_data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import EditEventForm from "@/components/edit_event/EditEventForm";


export default function EditEvent( { params: { id } }: { params: { id: string } } ) {

  const { user } = useAuthContext()
  const router = useRouter()

  const [event, setEvent] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])


useEffect(() => {
  setLoading(true)
  const init = async () => {
    const result = await getDocument('events', id)
    const data = result?.data
    const error = data?.error

    if (error) {
      return setLoading(false)
    }

    setEvent(data)
    console.log('this is an event', data)
    return setLoading(false)
  };
  init();
}, []);


  
  return (
    <>
      <main className="bg-white pt-16 md:pt-32 md:pb-32 md:px-[2rem]">
      {loading ? 
        <div
        className="text-my-primary"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <Spinner />
        </div>
        : 
        (
        <>
          <EditEventForm 
            id={id} 
            slug={event?.slug}  
            imageUrl={event?.eventBanner} 
            name={event?.organizerName} 
            email={event?.organizerEmail} 
            number={event?.organizerNumber} 
            website={event?.organizerWebsite} 
            aboutOrganizer={event?.organizerDescription}
            title={event?.eventName} 
            date={event?.eventDate} 
            time={event?.eventTime} 
            category={event?.eventCategory}
            priceAmount={event?.eventPriceAmount}
            venue={event?.eventAddress} 
            state={event?.eventState} 
            price={event?.eventPrice} 
            isApproved={event?.isApproved} 
            description={event?.eventDescription} 
          />
        </>
        )
      }
      </main>
    </>
  )
}
