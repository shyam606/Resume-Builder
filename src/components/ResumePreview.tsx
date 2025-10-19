"use client";
import { useResume } from '@/context/ResumeContext';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import Template2 from '@/templates/Template2';
import Template1 from '@/templates/Template1';


export default function ResumePreview({ isSelectTemp }: { isSelectTemp: number }) {
    const { resume } = useResume();
    const previewRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!previewRef.current) return;
        const canvas = await html2canvas(previewRef.current, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`${resume.name.replace(/\s+/g, '_')}_Resume.pdf`);
    };


    return (
        <div className="min-h-screen max-w-4xl mx-auto">
            <div className="text-right mb-3">
                <Button
                    type="primary"
                    size="middle"
                    onClick={handleDownloadPDF}
                    className="shadow-lg bg-indigo-600 outline-none border-none hover:!bg-blue-800 border-gray-700"
                >
                    Download PDF
                </Button>
            </div>
            {
                isSelectTemp === 1 ?
                    <Template1 previewRef={previewRef} />   //single column
                    :
                    <Template2 previewRef={previewRef} />  // double column
            }
        </div>
    );
}
