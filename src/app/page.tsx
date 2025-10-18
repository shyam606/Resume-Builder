'use client'

import Loader from '@/components/Loader';
import ResumePreview from '@/components/ResumePreview';
import SidebarEditor from '@/components/SidebarEditor';
import ThemeToggler from '@/components/ThemeToggler';
import { Suspense, useEffect, useState } from "react";


// const SidebarEditor = dynamic(() => import('@/components/SidebarEditor'))
// const ResumePreview = dynamic(() => import('@/components/ResumePreview'))

export default function HomePage() {
  const [isShow, setIsShow] = useState<boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setIsShow(true)
    }, 1000)
  }, [])
  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {
        !isShow ? <Loader /> :
          <>
            {/* Toggler position */}
            <div className='flex justify-between items-center max-w-[80%] mx-auto'>
              <h1 className='text-2xl font-medium text-gray-900 dark:text-gray-100'>Resume Builder</h1>
              <ThemeToggler />
            </div>

            <div className="max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
              <aside className="lg:col-span-1">
                <SidebarEditor />
              </aside>
              <section className="lg:col-span-3">
                <ResumePreview />
              </section>
            </div>
          </>
      }
    </main>
  );
}