import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Footer from './components/footer'
import { SidebarProvider } from './context/sidebarContext'
import { getServerSession } from "next-auth"
import SessionProvider from './components/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en" >
      <body className={inter.className}>
        <SessionProvider>
          <SidebarProvider>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html >
  )
}
