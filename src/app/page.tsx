'use client'

import Loader from '@/components/Loader';
import ResumePreview from '@/components/ResumePreview';
import SidebarEditor from '@/components/SidebarEditor';
import TemplatesModal from '@/components/TemplatesModal';
import ThemeToggler from '@/components/ThemeToggler';
import { Button, Tooltip } from 'antd';
import {  useEffect, useState } from "react";
import { GrTemplate } from 'react-icons/gr';


// const SidebarEditor = dynamic(() => import('@/components/SidebarEditor'))
// const ResumePreview = dynamic(() => import('@/components/ResumePreview'))

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [isSelectTemp, setIsSelectTemp] = useState<number>(1)

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
              <div className="">
                <Tooltip title='Templates'>
                  <Button
                    type="text"
                    icon={<GrTemplate size={20} className='dark:text-white text-white' />}
                    className="text-gray-900 bg-slate-500 mr-3"
                    onClick={() => setIsModalOpen(true)}
                    style={{ width: 40, height: 40 }}
                  />
                </Tooltip>
                <ThemeToggler />
              </div>
            </div>

            <div className="max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
              <aside className="lg:col-span-1">
                <SidebarEditor />
              </aside>
              <section className="lg:col-span-3">
                <ResumePreview isSelectTemp={isSelectTemp} />
              </section>
            </div>
          </>
      }
      {
        isModalOpen &&
        <TemplatesModal 
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        isSelectTemp={isSelectTemp}
        setIsSelectTemp={setIsSelectTemp}
        />
      }
    </main>
  );
}