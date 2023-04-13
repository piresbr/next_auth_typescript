import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className={`${inter.className} text-4xl font-semibold`}>
        HELLO NEXT {'<3'}
      </h1>
    </main>
  )
}
