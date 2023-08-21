'use client'
import 'tw-elements/dist/css/tw-elements.min.css'
import './globals.css'
import Footer from '../components/global/Footer'
import Navbar from '../components/global/Navbar'
import SignupModal from '@/components/global/SignupModal'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import SignInModal from '@/components/global/SignInModal'
import { AuthContextProvider } from '@/context/AuthContext'
import Head from 'next/head'
import { ResetModal } from '@/components/global/ResetPasswordModal'
import CreateEventModal from '@/components/event/CreateEventModal'

// export const metadata = {
//   title: 'Gidiopolis',
//   description: 'Search For Events In Your City',
// }

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
       <body>
          <AuthContextProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
            <SignupModal />
            <SignInModal />
            <ResetModal />
            <CreateEventModal />
            <ToastContainer />
          </AuthContextProvider>
        </body>
    </html>
  )
}


