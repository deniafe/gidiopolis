import "tw-elements/dist/css/tw-elements.min.css";
import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import AuthModal from "@/components/layout/AuthModal";

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
        <AuthModal />
      </body>
    </html>
  )
}
