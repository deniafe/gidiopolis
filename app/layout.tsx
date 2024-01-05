import 'tw-elements/dist/css/tw-elements.min.css'
import './globals.css'
import { Montserrat_Alternates } from 'next/font/google'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import SignupModal from '@/components/layout/SignupModal'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SignInModal from '@/components/layout/SignInModal'
import { AuthContextProvider } from '@/context/AuthContext'
import { EventContextProvider } from '@/context/EventContext'
import { UserEventContextProvider } from '@/context/UserEventContext'
import { SearchEventContextProvider } from '@/context/SearchEventContext'
import { ResetModal } from '@/components/global/ResetPasswordModal'
import CreateEventModal from '@/components/event/CreateEventModal'
import HomeSearch from '@/components/home/HomeSearch'
import { ConfirmDelete } from '@/components/user_event/ConfirmDelete'
import { ProfileModal } from '@/components/global/ProfileModal'
import type { Metadata } from 'next'

const expletus_sans = Montserrat_Alternates({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Search For Events In Your City | Gidiopolis',
  description: 'Find amazing events happening in your city',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <body className={expletus_sans.className}>
          <AuthContextProvider>
            <EventContextProvider>
              <UserEventContextProvider>
                <SearchEventContextProvider>
                  <Navbar />
                  <main>
                    {children}
                  </main>
                  <Footer />
                  <SignupModal />
                  <SignInModal />
                  <ResetModal />
                  <ProfileModal />
                  <HomeSearch />
                  <CreateEventModal />
                  <ConfirmDelete />
                  <ToastContainer />
                </SearchEventContextProvider>
              </UserEventContextProvider>
            </EventContextProvider>
          </AuthContextProvider>
        </body>
    </html>
  )
}


