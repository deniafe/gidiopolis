"use client";
import { Spinner } from '@/components/global/Loading';
import CTA from '@/components/home/CTA';
import Categories from '@/components/home/Categories';
import Hero from '@/components/home/Hero';
import LatestEvent from '@/components/home/LatestEvents';
import MoreEvent from '@/components/home/MoreEvents';
import { useEventContext } from '@/context/EventContext'
import { useEffect } from 'react';

export default function Home() {
  const { loading, getCategory } = useEventContext()

  const openSignUpModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("signupModal"))
    return myModal.show()
  }
 

  return (
    <main className="bg-white md:pt-32 md:px-[2rem]">
      <Hero />
      <Categories getCategory={getCategory}/>

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
          <LatestEvent />
          {/* <MoreEvent firebaseEvents={firebaseEvents} /> */}
          <CTA />
        </>
        )
      }
    </main>
  )
}
