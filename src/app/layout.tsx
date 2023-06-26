import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import { Loading } from '@/components/loading/Loading'
import { StoreProvider } from '@/redux/services/StoreProvider'


export const roboto = Roboto({ 
  subsets: ['cyrillic'],
  weight:['400','500','700'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
    <html lang="en">
      <body className={roboto.className}>
      <Suspense fallback={ <Loading /> }>
        <Header/>
        <main className='main'>
        {children}
        </main>
        <Footer/>
        </Suspense>
        </body>
    </html>
    </StoreProvider>
  )
}
