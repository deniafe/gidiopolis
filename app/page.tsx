"use client"
import { Spinner } from '@/components/global/Loading'
import CTA from '@/components/home/CTA'
import Categories from '@/components/home/Categories'
import Hero from '@/components/home/Hero'
import LatestEvent from '@/components/home/LatestEvents'
import MoreEvent from '@/components/home/MoreEvents'
import { Empty } from '@/components/icons/Empty'
import { useEventContext } from '@/context/EventContext'
import { useEffect } from 'react'

export default function Home() {
  const { loading, getCategory, selectedCategory, firebaseEvents } = useEventContext()

  const openSignUpModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("signupModal"))
    return myModal.show()
  }

  const openSignInModal = async () => {
    console.log('Open signin modal has been called')
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("signinModal"))
    return myModal.show()
  }

  useEffect(() => {
    console.log('UseEffect signin has been called')
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Window load under useEffect signin has been called')

      const checkUrlForSignIn = () => {
        if (window.location.hash === "#signin") {
          openSignInModal();
        }
      };

      const checkUrlForSignUp = () => {
        if (window.location.hash === "#signup") {
          openSignUpModal();
        }
      };

      checkUrlForSignIn();
      checkUrlForSignUp();
    });
    
  }, []);

  useEffect(() => {
    getCategory();
  }, [selectedCategory]);

  return (
    <main className="bg-white md:pt-32 md:px-[2rem]">
      <Hero />
      <Categories/>

      {loading ? (
        <div
          className="text-my-primary h-96"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          {firebaseEvents && firebaseEvents.length === 0 ? (
            <div>
              <div
                className="text-my-primary md:mt-32 md:mb-8"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Empty />
              </div>
              <p className="text-center mb-16" >No data available</p>
            </div>
          ) : 
          (
            <>
              <LatestEvent />
            </>
          )
          }
           <CTA />
        </>
        
      )}
    </main>
  )
}
