"use client";
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Head from 'next/head'
import UserEvents from "@/components/user_event/UserEvents";
import { useEventContext } from '@/context/UserEventContext'
import { Spinner } from "@/components/global/Loading";
import { Empty } from "@/components/icons/Empty";

export default function UserEvent() {

  const { user } = useAuthContext()
  const { loading, getEvents, userEvents } = useEventContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

  useEffect(() => {
    console.log('Calling user events')
    getEvents()
  }, []);
  
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
          {userEvents && userEvents.length === 0 ? (
            <div>
              <div
                className="text-my-primary md:mt-12 md:mb-8"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Empty />
              </div>
              <p className="text-center mb-32" >No data available</p>
            </div>
          ) : 
          (
            <>
              <UserEvents />
            </>
          )
          }
        </>
        )
      }
      </main>
    </>
  )
}
