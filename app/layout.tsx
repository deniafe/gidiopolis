'use client'
import 'tw-elements/dist/css/tw-elements.min.css'
import './globals.css'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <title>Search For Events In Your City | Gidiopolis</title>
      <meta name="description" content="Search For Events In Your City | Gidiopolis" />
       <body>
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


