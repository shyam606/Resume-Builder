"use client";
import { useResume } from '@/context/ResumeContext';
import { MailOutlined, CodeOutlined, TrophyOutlined, LaptopOutlined, BookOutlined } from '@ant-design/icons';

const getSkillLevel = (skill: string) => {
    const lower = skill.toLowerCase();
    if (lower.includes('react') || lower.includes('next.js')) return 'w-full'; // Top skill
    if (lower.includes('typescript') || lower.includes('tailwind')) return 'w-4/5'; // Strong skill
    return 'w-3/5'; // Basic/Intermediate skill
};
interface Template2Props {
    previewRef: React.RefObject<HTMLDivElement | null>;
}
export default function Template2({ previewRef }: Template2Props) {
    const { resume } = useResume();

    return (
        <div ref={previewRef} className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-xl font-sans p-10 print:shadow-none print:border-none">
            {/* Header */}
            <header>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-wider dark:text-white">{resume.name}</h1>
                        <h2 className={`text-xl dark:text-indigo-200 font-light mt-1`}>{resume.title}</h2>
                    </div>
                    <div className="text-right">
                        <p className={`flex items-center justify-end text-sm text-indigo-200`}>
                            <MailOutlined className="mr-2" />
                            {resume.email}
                        </p>
                    </div>
                </div>
            </header>

            {/* Two Columns */}
            <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 min-h-[700px] mt-5">

                {/* Left side */}
                <div className="col-span-1 pr-8  bg-gray-50 dark:bg-gray-800">

                    {/* Skills Meter Section */}
                    <section className="mb-10">
                        <h3 className={`text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 pb-1 border-b-2 border-indigo-500 flex items-center`}>
                            <CodeOutlined className={`mr-2 text-indigo-600 dark:text-indigo-400`} /> Core Skills
                        </h3>
                        <div className="space-y-4">
                            {resume.skills.map(skill => (
                                <div key={skill}>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{skill}</p>
                                    {/* The Skill Meter Bar */}
                                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                                        <div
                                            className={`h-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-lg transition-all duration-700 ease-out ${getSkillLevel(skill)}`}
                                            style={{ maxWidth: '100%' }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className={`text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 pb-1 border-b-2 border-indigo-500 flex items-center`}>
                            <BookOutlined className={`mr-2 text-indigo-600 dark:text-indigo-400`} /> Education
                        </h3>
                        <div className="space-y-3">
                            {resume.education.map(edu => (
                                <div key={edu.id} className={`p-2 border-l-4 border-gray-300 dark:border-gray-600 pl-3 hover:border-indigo-500 transition duration-200`}>
                                    <div className="flex  justify-between">
                                        <p className="font-semibold mb-0 text-gray-900 dark:text-gray-50">{edu.degree}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{edu.year}</p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{edu.institute}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Side */}
                <div className="col-span-2 px-8 space-y-10">

                    {/* Summary */}
                    <section>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 border-b-2 border-gray-300 dark:border-gray-700 pb-1">Summary</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{resume.summary}</p>
                    </section>

                    {/* Projects */}
                    <section>
                        <h3 className={`text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-gray-300 dark:border-gray-700 pb-1 flex items-center`}>
                            <LaptopOutlined className={`mr-2 text-indigo-600 dark:text-indigo-400`} /> Key Projects
                        </h3>
                        <div className="space-y-4">
                            {resume?.projects?.map(project => (
                                <div key={project.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white dark:bg-gray-800">
                                    <div className="flex justify-between">
                                        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{project?.title}</h4>
                                        {project.link && <a href={project.link} target="_blank" className={`text-indigo-600 dark:text-indigo-400 font-medium text-sm mt-2 block hover:underline`}>View Project &rarr;</a>}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm italic">{project?.desc}</p>
                                    {project?.tech?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project?.tech.map(t => (
                                                <span key={t} className={`px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-400 rounded-md text-xs font-medium`}>{t}</span>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section>
                        <h3 className={`text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-gray-300 dark:border-gray-700 pb-1 flex items-center`}>
                            <TrophyOutlined className={`mr-2 text-indigo-600 dark:text-indigo-400`} /> Notable Achievements
                        </h3>
                        <div className="space-y-4">
                            {resume?.achievements?.map(a => (
                                <div key={a.id} className="p-3 border-l-4 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/40 rounded shadow-sm">
                                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base">{a?.title}</h4>
                                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{a?.description}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 font-mono">{a?.platform} | {a?.date}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}