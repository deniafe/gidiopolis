"use client";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Head from 'next/head'
import UserEvents from "@/components/user_event/UserEvents";
import { useEventContext } from '@/context/UserEventContext'
import { Spinner } from "@/components/global/Loading";

export default function UserEvent() {

  const { user } = useAuthContext()
  const { loading, getEvents, currentCount } = useEventContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
}, [user])

useEffect(() => {
   getEvents()
}, [currentCount]);
  
  return (
    <>
    <Head>
      <title>User Events | Gidiopolis</title>
    </Head>
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
          <UserEvents />
        </>
        )
      }
      </main>
    </>
  )
}
