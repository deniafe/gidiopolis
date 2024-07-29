import type { Metadata } from "next";
import { Montserrat_Alternates } from 'next/font/google'
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/providers/theme-provider";
// import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
// import EventProvider from "@/providers/event-provider";
import ModalProvider from "@/providers/modal-provider";

const expletus_sans = Montserrat_Alternates({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title:{
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description, 
  icons: [
    {
      url: '/favicon.svg',
      href: '/favicon.svg'
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={expletus_sans.className}>
      {/* <ClerkProvider > */}
         <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            > */
           <ModalProvider>
            {/* <EventProvider> */}
              {children}
            {/* </EventProvider> */}
            </ModalProvider>
           <Toaster />
         </ThemeProvider>
      {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
