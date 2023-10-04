"use client";
import CreateEventForm from "@/components/event/CreateEventForm"
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Head from 'next/head'

export default function CreateEvent() {

  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])
  
  return (
    <>
    <Head>
      <title>Create New Event | Gidiopolis</title>
    </Head>
      <main className="bg-white pt-16 md:pt-32 md:pb-32 md:px-[2rem]">
        <CreateEventForm />
      </main>
    </>
  )
}
