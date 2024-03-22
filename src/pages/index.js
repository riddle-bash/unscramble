import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='items-center justify-center w-1/2 mx-auto'>
      <img className='h-40 w-40' src='/horse.jpg'></img>
      <p className='text-2xl'>"This is a horse"</p>
      <p className='text-2xl my-4'>Welcome to the index</p>
      <Link href={'/app'}>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-8 font-bold text-xl rounded-2xl'>
          Start Unscramble Game
        </button>
      </Link>
    </div>
  )
}
