import Image from 'next/image'
import { ParticlesBg } from '../particles'

export default function Home () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ParticlesBg />
    </main>
  )
}
