"use client";
import { useResume } from '@/context/ResumeContext';
import { Button, Tag } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { MailOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons';


export default function ResumePreview() {
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

    const SectionHeader = ({ title }: { title: string }) => (
        <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mt-8 mb-2 pb-1 border-b border-gray-400">
            {title}
        </h3>
    );

    return (
        <div className="bg-gray-50 min-h-screen max-w-4xl mx-auto">
            <div className="text-right mb-3">
                <Button
                    type="primary"
                    size="middle"
                    onClick={handleDownloadPDF}
                    className="shadow-lg bg-blue-900 outline-none border-none hover:!bg-blue-800 border-gray-700"
                >
                    Download PDF
                </Button>
            </div>

            <div ref={previewRef} className="bg-white shadow-xl font-sans p-10 print:shadow-none print:border-none">
                {/* Header */}
                <header className="flex justify-between items-start mb-2">
                    <div>
                        <h1 className="text-3xl mb-0 font-bold tracking-widest uppercase text-gray-900">
                            {resume.name}
                        </h1>
                        <h2 className="text-lg text-gray-700 font-normal">{resume.title}</h2>
                    </div>
                    <div className="text-right pt-1 space-y-1">
                        <div className="flex items-center justify-end text-sm text-gray-600">
                            <p className="mb-0">{resume.email}</p>
                            <MailOutlined className="ml-2 text-gray-500" />
                        </div>
                        <div className="flex items-center justify-end text-sm text-gray-600">
                            <p className="mb-0">{resume.phone}</p>
                            <PhoneOutlined className="ml-2 text-gray-500" />
                        </div>
                    </div>
                </header>

                {/* Summary */}
                <section className="mb-6">
                    <SectionHeader title="Summary" />
                    <p className="text-gray-700 leading-relaxed text-sm">{resume.summary}</p>
                </section>

                {/* Projects */}
                <section>
                    <SectionHeader title="Key Projects" />
                    <div className="space-y-4">
                        {resume.projects.map((project) => (
                            <div key={project.id}>
                                <div className="flex justify-between">
                                    <h4 className="font-semibold text-gray-900 text-base">{project.title}</h4>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            className="text-gray-500 text-sm hover:underline ml-4 whitespace-nowrap"
                                        >
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-700 mt-1 text-sm italic">{project.desc}</p>
                                {project.tech.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="text-xs text-gray-600 border border-gray-300 px-2 py-0.5 rounded-sm"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Education */}
                <section>
                    <SectionHeader title="Education" />
                    <div className="space-y-4">
                        {resume.education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-900">{edu.degree}</p>
                                    <p className="text-gray-600 text-sm font-mono">{edu.year}</p>
                                </div>
                                <p className="text-gray-700 text-sm">{edu.institute}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technical Skills */}
                <section>
                    <SectionHeader title="Technical Skills" />
                    <div className="flex flex-wrap gap-3">
                        {resume.skills.map((skill) => (
                            <span key={skill} className="text-sm text-gray-700 font-medium">
                                {skill}
                                <span className="text-gray-400 ml-3">|</span>
                            </span>
                        ))}
                    </div>
                </section>

                {/* Achievements */}
                <section>
                    <SectionHeader title="Achievements" />
                    <div className="space-y-4">
                        {resume.achievements.map((a) => (
                            <div key={a.id}>
                                <div className="flex justify-between">
                                    <h4 className="font-semibold text-gray-900 text-sm">{a.title}</h4>
                                    <p className="text-gray-500 text-xs font-mono">{a.date}</p>
                                </div>
                                <p className="text-gray-700 mt-1 text-sm">{a.description}</p>
                                <p className="text-gray-500 text-xs mt-1 italic">{a.platform}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ✅ Verified Achievements */}
                {resume.verifiedAchievements && resume.verifiedAchievements.length > 0 && (
                    <section>
                        <SectionHeader title="Verified Achievements" />
                        <div className="space-y-4">
                            {resume.verifiedAchievements.map((item, index) => (
                                <div key={index} className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                                        <p className="text-gray-600 text-xs">{item.source}</p>
                                    </div>
                                    {item.verified && (
                                        <Tag
                                            icon={<CheckCircleOutlined />}
                                            color="success"
                                            className="text-xs px-2 py-0.5 rounded-full"
                                        >
                                            Verified
                                        </Tag>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
