'use client'
import { Modal } from 'antd'
import React from 'react'
import templateImg1 from "../assets/images/Template1.png"
import templateImg2 from "../assets/images/Template2.png"
import Image from 'next/image'
import { IoCloseCircleSharp } from 'react-icons/io5'

const Images = [
    {
        title: 'Single Column',
        img: templateImg1,
        id:1
    },
    {
        title: 'Two Column',
        img: templateImg2,
        id:2
    },
]
const TemplatesModal = ({
    isModalOpen, 
    setIsModalOpen,
    isSelectTemp,
    setIsSelectTemp
}: {
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isSelectTemp:number,
    setIsSelectTemp:React.Dispatch<React.SetStateAction<number>>
}) => {
    return (
        <div>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={false}
                closeIcon={<IoCloseCircleSharp size={30} className='text-gray-300' />}
                centered
            >
                <div className="mt-5 px-10">
                    <h1 className='text-white text-lg'>Select Template</h1>
                    <div className="flex items-center gap-10">
                        {
                            Images?.map((item, index) => {
                                return (
                                    <div className="" key={index}>
                                        <div className={`cursor-pointer ${isSelectTemp===item?.id&&'border p-2'} rounded-md`}
                                        onClick={()=>{setIsSelectTemp(item?.id);setIsModalOpen(false)}}
                                        >
                                            <Image alt='template_image' src={item?.img} height={900} />
                                        </div>
                                        <p className='text-center text-white text-[1rem] mt-3'>{item?.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TemplatesModal
