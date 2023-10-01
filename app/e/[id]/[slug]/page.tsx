"use client";
import Hero from "@/components/event/Hero";
import SimilarEvent from "@/components/event/SimilarEvent";
import { errorMessage } from "@/firebase/error_message";
import { FirebaseEvent, getSimilarEvents as getEvents, getDocument } from "@/firebase/firestore/get_data";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function Event( { params: { id } }: { params: { id: string } } ) {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  const getSimilarEvents = async (category: string) => {
    await getEvents(category, setEvents)
  }

  useEffect(() => {
    setLoading(true)
    const init = async () => {
      const result = await getDocument('events', id)
      const data = result?.data
      const error = data?.error

      console.log('There is an data', result)

      if (result.error) {
        console.log('There is an error', error)
        setLoading(false)
        errorMessage('Event does not exist ❌')
        return router.push("/")
      }
      getSimilarEvents(data.eventCategory)
      setEvent(result.data)
      return setLoading(false)
    };
    init();
  }, []);


  return (
    <main className="bg-white md:pt-32 md:px-[2rem]">
      <Hero event={event} />
      <SimilarEvent title={'Similar Event'} firebaseEvents={events}/>
    </main>
  )
}
