"use client";
import Hero from "@/components/event/Hero";
import SimilarEvent from "@/components/event/SimilarEvent";
import { db } from "@/firebase/config";
import { FirebaseEvent, getCategoryEvents, getDocument } from "@/firebase/firestore/get_data";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Event( { params: { id } }: { params: { id: string } } ) {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState<FirebaseEvent[]>();
  const [loading, setLoading] = useState(true);

  const getSimilarEvents = async (category: string) => {
    await getCategoryEvents(category, setEvents)
  }

  useEffect(() => {
    setLoading(true)
    const init = async () => {
      const result = await getDocument('events', id)
      const data = result?.data
      const error = data?.error

      if (error) {
        return setLoading(false)
      }
      getSimilarEvents(data.eventCategory)
      setEvent(data)
      return setLoading(true)
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
