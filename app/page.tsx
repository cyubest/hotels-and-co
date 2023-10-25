'use client';
import Image from 'next/image';
import HomeMain from './src/pages/index';
import Categories from './src/pages/Categories';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
       <HomeMain/>
    </main>
    </QueryClientProvider>
  )
}
