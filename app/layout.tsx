import "tw-elements/dist/css/tw-elements.min.css";
import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import Footer from '../components/global/Footer'
import Navbar from '../components/global/Navbar'
import SignupModal from "@/components/global/SignupModal";

// const Navbar = dynamic(() => import('../components/layout/Navbar'), { ssr: false })

export const metadata = {
  title: 'Gidiopolis',
  description: 'Search For Events In Your City',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <SignupModal />
      </body>
    </html>
  )
}


